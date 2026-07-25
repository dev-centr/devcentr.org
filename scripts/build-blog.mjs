/**
 * Build AsciiDoc blog posts into src/lib/blog-posts.generated.json
 */
import { load } from "@asciidoctor/core";
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const contentDir = join(root, "content", "blog");
const outFile = join(root, "src", "lib", "blog-posts.generated.json");

const files = readdirSync(contentDir)
  .filter((f) => f.endsWith(".adoc"))
  .sort()
  .reverse();

const posts = [];

for (const file of files) {
  const slug = file.replace(/\.adoc$/i, "");
  const source = readFileSync(join(contentDir, file), "utf8");
  const doc = await load(source, {
    safe: "safe",
    attributes: {
      showtitle: false,
    },
  });
  const title = doc.getTitle() || slug;
  const description = doc.getAttribute("description") || "";
  const revdate = doc.getAttribute("revdate") || "";
  const keywords = String(doc.getAttribute("keywords") || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const html = await doc.convert();

  posts.push({
    slug,
    title,
    description,
    date: revdate,
    tags: keywords,
    html,
  });
}

posts.sort(
  (a, b) => String(b.date).localeCompare(String(a.date)) || String(b.slug).localeCompare(String(a.slug)),
);

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, `${JSON.stringify({ posts }, null, 2)}\n`, "utf8");
console.log(`Wrote ${posts.length} blog post(s) → ${outFile}`);
