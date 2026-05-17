import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "@solidjs/start/config";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = dirname(fileURLToPath(import.meta.url));
const advisorCandidates = [
  resolve(rootDir, "toolchain-advisor/lib/src/index.ts"),
  resolve(rootDir, "../toolchain-advisor/lib/src/index.ts"),
];
const advisorCore = advisorCandidates.find((p) => existsSync(p)) ?? advisorCandidates[1];

export default defineConfig({
  ssr: false,
  server: {
    preset: "static",
    static: true,
  },
  router: {
    prerender: {
      routes: ["/", "/toolchain-advisor"],
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
