import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "@solidjs/start/config";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = dirname(fileURLToPath(import.meta.url));
const advisorCandidates = [
  resolve(rootDir, "toolchain-advisor/lib/src/index.ts"),
  resolve(rootDir, "../toolchain-advisor/lib/src/index.ts"),
];
const advisorCore = advisorCandidates.find((p) => existsSync(p)) ?? advisorCandidates[1];

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

const newsSlugs = collectNewsSlugs();
const newsRoutes = newsSlugs.flatMap((slug) => [`/news/${slug}`, `/blog/${slug}`]);

export default defineConfig({
  ssr: false,
  server: {
    preset: "static",
    static: true,
  },
  router: {
    prerender: {
      routes: [
        "/",
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
        ...newsRoutes,
      ],
    },
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@dev-centr/toolchain-advisor-core": advisorCore,
      },
    },
  },
});
