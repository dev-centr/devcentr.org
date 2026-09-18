/**
 * Write robots.txt + sitemap.xml from the shared route list.
 * Optionally inject no-JS fallback into prerendered index HTML.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { getPrerenderRoutes, HTML_FALLBACK, SITE_ORIGIN } from "./site-routes.mjs";

function escapeXml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function toLoc(origin, route) {
  if (route === "/") return `${origin}/`;
  return `${origin}${route}`;
}

/** Exclude ops probes from the public sitemap. */
function sitemapRoutes(routes) {
  return routes.filter((path) => {
    if (path === "/health" || path === "/status") return false;
    return true;
  });
}

/** @param {string} dir */
export function writeCrawlability(dir, { origin = SITE_ORIGIN, routes = getPrerenderRoutes() } = {}) {
  const locs = [...new Set(sitemapRoutes(routes).map((r) => toLoc(origin, r)))];
  const body = locs.map((loc) => `  <url><loc>${escapeXml(loc)}</loc></url>`).join("\n");
  writeFileSync(
    join(dir, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`,
  );
  writeFileSync(
    join(dir, "robots.txt"),
    `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`,
  );
}

/**
 * Ensure title/description/heading exist for crawlers when the app shell is empty.
 * @param {string} indexHtmlPath
 */
export function injectHtmlFallback(indexHtmlPath, fallback = HTML_FALLBACK) {
  if (!existsSync(indexHtmlPath)) return;
  let html = readFileSync(indexHtmlPath, "utf8");
  if (!/<title[\s>]/i.test(html)) {
    html = html.replace(
      /<head([^>]*)>/i,
      `<head$1><title>${escapeXml(fallback.title)}</title>`,
    );
  }
  if (!/name=["']description["']/i.test(html)) {
    html = html.replace(
      /<head([^>]*)>/i,
      `<head$1><meta name="description" content="${escapeXml(fallback.description)}" />`,
    );
  }
  if (!/id=["']crawl-fallback["']/.test(html)) {
    const block = `<noscript id="crawl-fallback"><main><h1>${escapeXml(fallback.heading)}</h1><p>${escapeXml(fallback.purpose)}</p></main></noscript>`;
    if (/<div id="app"><\/div>/.test(html)) {
      html = html.replace(`<div id="app"></div>`, `<div id="app"></div>${block}`);
    } else if (/<\/body>/i.test(html)) {
      html = html.replace(/<\/body>/i, `${block}</body>`);
    }
  }
  writeFileSync(indexHtmlPath, html);
}
