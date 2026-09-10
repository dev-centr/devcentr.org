import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { getPrerenderRoutes } from "./site-routes.mjs";
import { injectHtmlFallback, writeCrawlability } from "./write-crawlability.mjs";

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

for (const route of getPrerenderRoutes()) {
  if (route === "/") continue;
  const parts = route.replace(/^\//, "").split("/").filter(Boolean);
  ensureSpa(join(pub, ...parts));
}

writeFileSync(join(pub, "404.html"), html);
writeCrawlability(pub);
injectHtmlFallback(indexHtml);
// Re-copy fallback-enhanced index into SPA shells that were copied earlier
const enhanced = readFileSync(indexHtml, "utf8");
for (const route of getPrerenderRoutes()) {
  if (route === "/") continue;
  const parts = route.replace(/^\//, "").split("/").filter(Boolean);
  const target = join(pub, ...parts, "index.html");
  if (existsSync(target)) writeFileSync(target, enhanced);
}
writeFileSync(join(pub, "404.html"), enhanced);
