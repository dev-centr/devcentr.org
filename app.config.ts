import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "@solidjs/start/config";
import { existsSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = dirname(fileURLToPath(import.meta.url));
const advisorCandidates = [
  resolve(rootDir, "toolchain-advisor/lib/src/index.ts"),
  resolve(rootDir, "../toolchain-advisor/lib/src/index.ts"),
];
const advisorCore = advisorCandidates.find((p) => existsSync(p)) ?? advisorCandidates[1];

const blogDir = join(rootDir, "content", "blog");
const blogRoutes = existsSync(blogDir)
  ? readdirSync(blogDir)
      .filter((f) => f.endsWith(".adoc"))
      .map((f) => `/blog/${f.replace(/\.adoc$/i, "")}`)
  : [];

export default defineConfig({
  ssr: false,
  server: {
    preset: "static",
    static: true,
  },
  router: {
    prerender: {
      routes: ["/", "/toolchain-advisor", "/blog", ...blogRoutes],
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
