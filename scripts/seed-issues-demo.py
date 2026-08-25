import os
import sqlite3
from pathlib import Path

demo_root = Path(r"C:\code\github.com\dev-centr\devcentr.org\.screenshot-demo\issues-browser")
folder_of_repos = demo_root / "repos"
archive_root = demo_root / "archive"
repo_path = folder_of_repos / "sample-tool"
db_dir = archive_root / "archives" / "github.com" / "dev-centr" / "sample-tool"
db_path = db_dir / "database.sqlite"

repo_path.mkdir(parents=True, exist_ok=True)
db_dir.mkdir(parents=True, exist_ok=True)
git_dir = repo_path / ".git"
if not git_dir.exists():
    git_dir.mkdir()
    (git_dir / "config").write_text(
        "[core]\n\trepositoryformatversion = 0\n"
        "[remote \"origin\"]\n"
        "\turl = https://github.com/dev-centr/sample-tool.git\n"
        "\tfetch = +refs/heads/*:refs/remotes/origin/*\n",
        encoding="utf-8",
    )

db = sqlite3.connect(str(db_path))
c = db.cursor()
c.executescript(
    """
CREATE TABLE IF NOT EXISTS repos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  path TEXT, remote TEXT, owner TEXT, name TEXT NOT NULL, host TEXT, updated_at TEXT,
  UNIQUE(host, owner, name)
);
CREATE TABLE IF NOT EXISTS issues (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  repo_id INTEGER NOT NULL REFERENCES repos(id),
  number INTEGER NOT NULL, title TEXT NOT NULL, state TEXT NOT NULL, body TEXT, url TEXT,
  created_at TEXT, closed_at TEXT, updated_at TEXT, author TEXT,
  pr_accepted INTEGER DEFAULT 0, state_reason TEXT, is_pr INTEGER DEFAULT 0,
  UNIQUE(repo_id, number)
);
CREATE TABLE IF NOT EXISTS comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  issue_id INTEGER NOT NULL REFERENCES issues(id),
  body TEXT, author TEXT, created_at TEXT
);
CREATE TABLE IF NOT EXISTS discussions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  repo_id INTEGER NOT NULL REFERENCES repos(id),
  number INTEGER NOT NULL, title TEXT NOT NULL, category TEXT, body TEXT, url TEXT,
  created_at TEXT, author TEXT, UNIQUE(repo_id, number)
);
CREATE TABLE IF NOT EXISTS discussion_comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  discussion_id INTEGER NOT NULL REFERENCES discussions(id),
  body TEXT, author TEXT, created_at TEXT
);
CREATE TABLE IF NOT EXISTS pull_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  repo_id INTEGER NOT NULL REFERENCES repos(id),
  number INTEGER NOT NULL, title TEXT NOT NULL, state TEXT NOT NULL, body TEXT, url TEXT,
  created_at TEXT, closed_at TEXT, merged_at TEXT, updated_at TEXT, author TEXT,
  merged INTEGER DEFAULT 0, UNIQUE(repo_id, number)
);
"""
)
for table in (
    "comments",
    "discussion_comments",
    "issues",
    "pull_requests",
    "discussions",
    "repos",
):
    c.execute(f"DELETE FROM {table}")

c.execute(
    "INSERT INTO repos(path, remote, owner, name, host, updated_at) VALUES (?,?,?,?,?,?)",
    (
        str(repo_path),
        "https://github.com/dev-centr/sample-tool.git",
        "dev-centr",
        "sample-tool",
        "github.com",
        "2026-08-08T12:00:00Z",
    ),
)
rid = c.lastrowid
c.execute(
    "INSERT INTO issues(repo_id, number, title, state, body, url, created_at, updated_at, author, is_pr) VALUES (?,?,?,?,?,?,?,?,?,0)",
    (
        rid,
        42,
        "Virtual FS mounts feel empty until catalog is seeded",
        "open",
        "When a fresh mount comes up, Catalog should show example repos so first-run screenshots are meaningful.\n\n## Acceptance\n- Seed 2-3 demo repos\n- Mark cached vs backed up",
        "https://github.com/dev-centr/sample-tool/issues/42",
        "2026-08-01T10:00:00Z",
        "2026-08-07T15:00:00Z",
        "amelia",
    ),
)
iid = c.lastrowid
c.execute(
    "INSERT INTO comments(issue_id, body, author, created_at) VALUES (?,?,?,?)",
    (iid, "Agreed — demo fixtures help marketing shots and onboarding.", "noah", "2026-08-02T11:00:00Z"),
)
c.execute(
    "INSERT INTO issues(repo_id, number, title, state, body, url, created_at, closed_at, updated_at, author, state_reason, is_pr) VALUES (?,?,?,?,?,?,?,?,?,?,?,0)",
    (
        rid,
        17,
        "Tray status should mention last sync age",
        "closed",
        "Closed after shipping relative timestamps in the tray tooltip.",
        "https://github.com/dev-centr/sample-tool/issues/17",
        "2026-07-10T09:00:00Z",
        "2026-07-20T09:00:00Z",
        "2026-07-20T09:00:00Z",
        "kai",
        "completed",
    ),
)
c.execute(
    "INSERT INTO pull_requests(repo_id, number, title, state, body, url, created_at, merged_at, updated_at, author, merged) VALUES (?,?,?,?,?,?,?,?,?,?,1)",
    (
        rid,
        88,
        "Add schema facet toggles for issues/PRs",
        "closed",
        "Introduces facet checkboxes so mounts can hide discussion facets.",
        "https://github.com/dev-centr/sample-tool/pull/88",
        "2026-07-28T08:00:00Z",
        "2026-08-03T16:00:00Z",
        "2026-08-03T16:00:00Z",
        "riley",
    ),
)
c.execute(
    "INSERT INTO discussions(repo_id, number, title, category, body, url, created_at, author) VALUES (?,?,?,?,?,?,?,?)",
    (
        rid,
        5,
        "Should analytics live in-repo or sidecar?",
        "Ideas",
        "Polling the room: keep analytics reports next to the mount root, or under a toolbox sidecar?",
        "https://github.com/dev-centr/sample-tool/discussions/5",
        "2026-08-04T13:00:00Z",
        "morgan",
    ),
)
did = c.lastrowid
c.execute(
    "INSERT INTO discussion_comments(discussion_id, body, author, created_at) VALUES (?,?,?,?)",
    (did, "Sidecar keeps the mount quieter for IDE indexing.", "sam", "2026-08-05T09:30:00Z"),
)
db.commit()
db.close()
print(f"seeded {db_path}")
print(f"demoFolder={folder_of_repos}")
print(f"archiveRoot={archive_root}")
