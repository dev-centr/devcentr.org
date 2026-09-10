/**
 * Canonical indexable routes for prerender + sitemap.
 * Keep this the single route list — do not duplicate elsewhere.
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const SITE_ORIGIN = "https://devcentr.org";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");

const STATIC_ROUTES = [
  "/",
  "/stack-advisor",
  "/toolchain-browser",
  "/toolchain-advisor",
  "/skills",
  "/templates",
  "/news",
  "/blog",
  "/changelog",
  "/help",
  "/support",
  "/status",
  "/health",
  "/apps",
  "/apps/products",
  "/apps/services",
  "/apps/standards",
  "/ideas/equivalence-engine",
  "/ideas/uniconfig",
];

function collectNewsSlugs() {
  const generated = join(rootDir, "src", "lib", "news-posts.generated.json");
  if (existsSync(generated)) {
    try {
      const data = JSON.parse(readFileSync(generated, "utf8"));
      if (Array.isArray(data.posts)) {
        return data.posts.map((p) => p.slug).filter(Boolean);
      }
    } catch {
      /* fall through */
    }
  }
  const newsDir = join(rootDir, "content", "news");
  if (!existsSync(newsDir)) return [];
  return readdirSync(newsDir)
    .filter((f) => f.endsWith(".adoc") && f !== "README.adoc")
    .map((f) => f.replace(/\.adoc$/i, ""));
}

function collectIdeaSlugs() {
  const catalog = join(rootDir, "src", "lib", "apps-catalog.ts");
  if (!existsSync(catalog)) return [];
  const text = readFileSync(catalog, "utf8");
  return [...text.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
}

/** @returns {string[]} */
export function getPrerenderRoutes() {
  const newsSlugs = collectNewsSlugs();
  const newsRoutes = newsSlugs.flatMap((slug) => [`/news/${slug}`, `/blog/${slug}`]);
  const ideaRoutes = collectIdeaSlugs().map((slug) => `/ideas/${slug}`);
  return [...new Set([...STATIC_ROUTES, ...newsRoutes, ...ideaRoutes])];
}

export const HTML_FALLBACK = {
  title: "DevCentr — Developer Ecosystem and Support",
  description:
    "Tools, resources, and support so developers can go from 0 to pro: learn and manage workflows with the Development Orchestration Suite.",
  heading: "DevCentr",
  purpose:
    "Developer Ecosystem and Support. Tools, resources, and support so developers can go from 0 to pro with the Development Orchestration Suite.",
};
