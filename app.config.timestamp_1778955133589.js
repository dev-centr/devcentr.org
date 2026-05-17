// app.config.ts
import { defineConfig } from "@solidjs/start/config";
import { resolve } from "node:path";
var advisorCore = resolve(__dirname, "../toolchain-advisor/lib/src/index.ts");
var app_config_default = defineConfig({
  ssr: false,
  server: {
    preset: "static",
    static: true
  },
  vite: {
    resolve: {
      alias: {
        "@dev-centr/toolchain-advisor-core": advisorCore
      }
    }
  }
});
export {
  app_config_default as default
};
