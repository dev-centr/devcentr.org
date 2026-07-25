import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pub = join(root, ".output", "public");
const indexHtml = join(pub, "index.html");
const html = readFileSync(indexHtml, "utf8");

function ensureSpa(dir) {
  mkdirSync(dir, { recursive: true });
  const target = join(dir, "index.html");
  if (!existsSync(target)) {
    writeFileSync(target, html);
  }
}

ensureSpa(join(pub, "toolchain-advisor"));
ensureSpa(join(pub, "blog"));

const blogContent = join(root, "content", "blog");
if (existsSync(blogContent)) {
  for (const file of readdirSync(blogContent).filter((f) => f.endsWith(".adoc"))) {
    const slug = file.replace(/\.adoc$/i, "");
    ensureSpa(join(pub, "blog", slug));
  }
}

writeFileSync(join(pub, "404.html"), html);
void copyFileSync;
