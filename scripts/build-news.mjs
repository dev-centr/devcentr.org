/**
 * Build News catalog from:
 * - content/news/*.adoc (hand-authored)
 * - Antora changelog.adoc timelines in sibling / CI checkout repos
 *
 * Emits:
 * - src/lib/news-posts.generated.json
 * - public/news/rss.xml
 * - public/news/atom.xml
 */
import { load } from "@asciidoctor/core";
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const contentDir = join(root, "content", "news");
const outJson = join(root, "src", "lib", "news-posts.generated.json");
const feedDir = join(root, "public", "news");
const siteUrl = "https://devcentr.org";

const changelogSources = [
  {
    id: "general-knowledge",
    label: "General Knowledge",
    paths: [
      join(root, "general-knowledge", "docs", "modules", "ROOT", "pages", "changelog.adoc"),
      join(root, "..", "general-knowledge", "docs", "modules", "ROOT", "pages", "changelog.adoc"),
    ],
    docsUrl: "https://docs.devcentr.org/general-knowledge/latest/changelog.html",
  },
  {
    id: "docs-portal",
    label: "Docs portal",
    paths: [
      join(root, "docs", "docs", "modules", "ROOT", "pages", "activity-log.adoc"),
      join(root, "..", "docs", "docs", "modules", "ROOT", "pages", "activity-log.adoc"),
    ],
    docsUrl: "https://docs.devcentr.org/home/activity-log.html",
    kind: "activity-log",
  },
];

function escapeXml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function stripTags(html) {
  return String(html)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(input) {
  return String(input)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function firstExisting(paths) {
  return paths.find((p) => existsSync(p));
}

function parseChangelogTimeline(text, source) {
  const posts = [];
  const re = /^==\s+(\d{4}-\d{2}-\d{2})\s+[—–-]\s+(.+)\s*$/gm;
  const matches = [...text.matchAll(re)];
  for (let i = 0; i < matches.length; i++) {
    const m = matches[i];
    const date = m[1];
    const title = m[2].trim();
    const start = m.index + m[0].length;
    const end = i + 1 < matches.length ? matches[i + 1].index : text.length;
    const body = text.slice(start, end).trim();
    const bullets = body
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.startsWith("* "))
      .map((l) => l.replace(/^\*\s+/, "").replace(/xref:[^\[]+\[([^\]]+)\]/g, "$1").replace(/link:[^\[]+\[([^\]]+)\]/g, "$1"));

    const htmlParts = [
      `<p>From the <strong>${escapeXml(source.label)}</strong> Antora changelog.</p>`,
      "<ul>",
      ...bullets.slice(0, 12).map((b) => `<li><p>${escapeXml(b)}</p></li>`),
      "</ul>",
      `<p><a href="${escapeXml(source.docsUrl)}">Read on docs.devcentr.org</a></p>`,
    ];

    posts.push({
      slug: `changelog-${source.id}-${date}-${slugify(title)}`,
      title: `${title} (${source.label})`,
      description: bullets[0] ? stripTags(bullets[0]).slice(0, 220) : `${source.label} changelog entry`,
      date,
      tags: ["news", "blog", "changelog", source.id],
      html: htmlParts.join("\n"),
      source: "antora-changelog",
      sourceId: source.id,
    });
  }
  return posts;
}

function parseActivityLog(text, source) {
  // Coarse monthly highlights → one post per month heading under a year
  const posts = [];
  const yearBlocks = text.split(/^==\s+(\d{4})\s*$/m).slice(1);
  for (let i = 0; i < yearBlocks.length; i += 2) {
    const year = yearBlocks[i];
    const body = yearBlocks[i + 1] || "";
    const months = [...body.matchAll(/^===\s+([A-Za-z]+)\s*$/gm)];
    for (let j = 0; j < months.length; j++) {
      const month = months[j][1];
      const start = months[j].index + months[j][0].length;
      const end = j + 1 < months.length ? months[j + 1].index : body.length;
      const section = body.slice(start, end).trim();
      const bullets = section
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l.startsWith("* "))
        .map((l) => l.replace(/^\*\s+/, "").replace(/\*\*/g, "").replace(/xref:[^\[]+\[([^\]]+)\]/g, "$1"));
      if (!bullets.length) continue;
      const monthNum =
        {
          January: "01",
          February: "02",
          March: "03",
          April: "04",
          May: "05",
          June: "06",
          July: "07",
          August: "08",
          September: "09",
          October: "10",
          November: "11",
          December: "12",
        }[month] || "01";
      const date = `${year}-${monthNum}-01`;
      posts.push({
        slug: `activity-${source.id}-${year}-${monthNum}`,
        title: `Docs activity — ${month} ${year}`,
        description: bullets[0].slice(0, 220),
        date,
        tags: ["news", "blog", "changelog", "activity-log"],
        html: [
          `<p>Highlights from the org <strong>Activity Log</strong>.</p>`,
          "<ul>",
          ...bullets.slice(0, 12).map((b) => `<li><p>${escapeXml(b)}</p></li>`),
          "</ul>",
          `<p><a href="${escapeXml(source.docsUrl)}">Read on docs.devcentr.org</a></p>`,
        ].join("\n"),
        source: "antora-activity-log",
        sourceId: source.id,
      });
    }
  }
  return posts;
}

async function loadAuthoredPosts() {
  if (!existsSync(contentDir)) return [];
  const files = readdirSync(contentDir)
    .filter((f) => f.endsWith(".adoc") && f !== "README.adoc")
    .sort()
    .reverse();

  const posts = [];
  for (const file of files) {
    const slug = file.replace(/\.adoc$/i, "");
    const source = readFileSync(join(contentDir, file), "utf8");
    const doc = await load(source, {
      safe: "safe",
      attributes: { showtitle: false },
    });
    const keywords = String(doc.getAttribute("keywords") || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    // Ensure SEO blog keyword is always present for hand-authored news
    const tags = [...new Set([...keywords, "news", "blog"])];
    posts.push({
      slug,
      title: doc.getTitle() || slug,
      description: doc.getAttribute("description") || "",
      date: doc.getAttribute("revdate") || "",
      tags,
      html: await doc.convert(),
      source: "authored",
    });
  }
  return posts;
}

function loadChangelogPosts() {
  const posts = [];
  for (const source of changelogSources) {
    const path = firstExisting(source.paths);
    if (!path) {
      console.log(`changelog skip (missing): ${source.id}`);
      continue;
    }
    const text = readFileSync(path, "utf8");
    const parsed =
      source.kind === "activity-log" ? parseActivityLog(text, source) : parseChangelogTimeline(text, source);
    console.log(`changelog ingest ${source.id}: ${parsed.length} entr(y/ies) from ${path}`);
    posts.push(...parsed);
  }
  return posts;
}

function writeFeeds(posts) {
  mkdirSync(feedDir, { recursive: true });
  const updated = posts[0]?.date || new Date().toISOString().slice(0, 10);
  const itemsRss = posts
    .map((p) => {
      const link = `${siteUrl}/news/${p.slug}`;
      const desc = escapeXml(p.description || stripTags(p.html).slice(0, 280));
      return `  <item>
    <title>${escapeXml(p.title)}</title>
    <link>${link}</link>
    <guid isPermaLink="true">${link}</guid>
    <pubDate>${new Date(p.date + "T12:00:00Z").toUTCString()}</pubDate>
    <description>${desc}</description>
    <category>blog</category>
    <category>news</category>
  </item>`;
    })
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>DevCentr News</title>
  <link>${siteUrl}/news</link>
  <description>News, engineering blog posts, and changelog highlights from Dev-Centr.</description>
  <language>en-us</language>
  <lastBuildDate>${new Date(updated + "T12:00:00Z").toUTCString()}</lastBuildDate>
${itemsRss}
</channel>
</rss>
`;

  const entriesAtom = posts
    .map((p) => {
      const link = `${siteUrl}/news/${p.slug}`;
      const summary = escapeXml(p.description || stripTags(p.html).slice(0, 280));
      return `  <entry>
    <title>${escapeXml(p.title)}</title>
    <link href="${link}" rel="alternate"/>
    <id>${link}</id>
    <updated>${p.date}T12:00:00Z</updated>
    <summary>${summary}</summary>
    <category term="blog"/>
    <category term="news"/>
  </entry>`;
    })
    .join("\n");

  const atom = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>DevCentr News</title>
  <link href="${siteUrl}/news" rel="alternate"/>
  <link href="${siteUrl}/news/atom.xml" rel="self"/>
  <id>${siteUrl}/news</id>
  <updated>${updated}T12:00:00Z</updated>
  <subtitle>News, engineering blog posts, and changelog highlights from Dev-Centr.</subtitle>
${entriesAtom}
</feed>
`;

  writeFileSync(join(feedDir, "rss.xml"), rss, "utf8");
  writeFileSync(join(feedDir, "atom.xml"), atom, "utf8");
}

const authored = await loadAuthoredPosts();
const fromDocs = loadChangelogPosts();
const bySlug = new Map();
for (const p of [...authored, ...fromDocs]) {
  if (!bySlug.has(p.slug)) bySlug.set(p.slug, p);
}
const posts = [...bySlug.values()].sort(
  (a, b) => String(b.date).localeCompare(String(a.date)) || String(b.slug).localeCompare(String(a.slug)),
);

mkdirSync(dirname(outJson), { recursive: true });
writeFileSync(outJson, `${JSON.stringify({ posts }, null, 2)}\n`, "utf8");
writeFeeds(posts);
console.log(`Wrote ${posts.length} news post(s) → ${outJson}`);
console.log(`Wrote feeds → ${feedDir}/rss.xml , atom.xml`);
