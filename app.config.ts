import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "@solidjs/start/config";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { getPrerenderRoutes } from "./scripts/site-routes.mjs";

const rootDir = dirname(fileURLToPath(import.meta.url));
const advisorCandidates = [
  resolve(rootDir, "stack-advisor/lib/src/index.ts"),
  resolve(rootDir, "../stack-advisor/lib/src/index.ts"),
  // legacy CI/sibling folder names during transition
  resolve(rootDir, "toolchain-advisor/lib/src/index.ts"),
  resolve(rootDir, "../toolchain-advisor/lib/src/index.ts"),
];
const advisorCore = advisorCandidates.find((p) => existsSync(p)) ?? advisorCandidates[1];
const browserCandidates = [
  resolve(rootDir, "stack-advisor/web/src/Browser.tsx"),
  resolve(rootDir, "../stack-advisor/web/src/Browser.tsx"),
  resolve(rootDir, "toolchain-advisor/web/src/Browser.tsx"),
  resolve(rootDir, "../toolchain-advisor/web/src/Browser.tsx"),
];
const browserUi =
  browserCandidates.find((p) => existsSync(p)) ?? browserCandidates[1];
const browserCssCandidates = [
  resolve(rootDir, "stack-advisor/web/src/browser.css"),
  resolve(rootDir, "../stack-advisor/web/src/browser.css"),
  resolve(rootDir, "toolchain-advisor/web/src/browser.css"),
  resolve(rootDir, "../toolchain-advisor/web/src/browser.css"),
];
const browserCss =
  browserCssCandidates.find((p) => existsSync(p)) ?? browserCssCandidates[1];

export default defineConfig({
  ssr: false,
  server: {
    preset: "static",
    static: true,
  },
  router: {
    prerender: {
      routes: getPrerenderRoutes(),
    },
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      // Exact finds: string aliases are prefix-matched, so `@dev-centr/stack-advisor`
      // would otherwise swallow `@dev-centr/stack-advisor/styles.css` as Browser.tsx/styles.css.
      alias: [
        {
          find: "@dev-centr/stack-advisor/styles.css",
          replacement: browserCss,
        },
        {
          find: "@dev-centr/stack-advisor-core",
          replacement: advisorCore,
        },
        {
          find: /^@dev-centr\/stack-advisor$/,
          replacement: browserUi,
        },
      ],
    },
  },
});
