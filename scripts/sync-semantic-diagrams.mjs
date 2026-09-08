import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const output = join(root, "public", "media", "diagrams");
const provenancePath = join(output, "canonical.provenance.json");
const sourceRepository = "https://github.com/openshellorg/shell-architecture";
const sourceCommit = "f93e6b1835d013f3b909c1502ada175a65565ca6";
const files = [
  "toolchain-architecture.svg",
  "toolchain-architecture.host.svg",
  "sibling-ownership.svg",
  "sibling-ownership.host.svg",
];
const sync = process.argv.includes("--sync");

function digest(value) {
  return createHash("sha256").update(value).digest("hex");
}

function git(repository, ...args) {
  return execFileSync("git", ["-C", repository, ...args], { encoding: args[0] === "show" ? "buffer" : "utf8" });
}

function findSource() {
  const candidates = [
    process.env.SHELL_ARCHITECTURE_REPO,
    join(root, "..", "..", "openshellorg", "shell-architecture"),
  ];
  try {
    const common = String(git(root, "rev-parse", "--path-format=absolute", "--git-common-dir")).trim();
    candidates.push(join(dirname(dirname(dirname(common))), "openshellorg", "shell-architecture"));
  } catch {
    // Committed checksums are sufficient for ordinary CI.
  }
  return candidates.filter(Boolean).map((candidate) => resolve(candidate)).find((candidate) => {
    if (!existsSync(candidate)) return false;
    try {
      git(candidate, "cat-file", "-e", `${sourceCommit}^{commit}`);
      return true;
    } catch {
      return false;
    }
  });
}

const source = findSource();
if (sync && !source) {
  throw new Error("Set SHELL_ARCHITECTURE_REPO to a checkout containing the pinned commit.");
}

if (sync) {
  const artifacts = files.map((file) => {
    const sourcePath = `docs/modules/ROOT/images/${file}`;
    const value = git(source, "show", `${sourceCommit}:${sourcePath}`);
    writeFileSync(join(output, file), value);
    return { path: `public/media/diagrams/${file}`, sourcePath, sha256: digest(value) };
  });
  writeFileSync(
    provenancePath,
    `${JSON.stringify({ schemaVersion: 1, sourceRepository, sourceCommit, artifacts }, null, 2)}\n`,
  );
}

const provenance = JSON.parse(readFileSync(provenancePath, "utf8"));
if (provenance.sourceRepository !== sourceRepository || provenance.sourceCommit !== sourceCommit) {
  throw new Error("Semantic diagram provenance does not match the pinned source.");
}
for (const artifact of provenance.artifacts) {
  const local = readFileSync(join(root, artifact.path));
  if (digest(local) !== artifact.sha256) throw new Error(`Stale copied artifact: ${artifact.path}`);
  if (source && !local.equals(git(source, "show", `${sourceCommit}:${artifact.sourcePath}`))) {
    throw new Error(`Copied artifact differs from ${sourceCommit}: ${artifact.path}`);
  }
}
if (provenance.artifacts.length !== files.length) throw new Error("Expected four semantic diagram artifacts.");
console.log(`Validated ${files.length} semantic diagram artifacts from shell-architecture ${sourceCommit}.`);
