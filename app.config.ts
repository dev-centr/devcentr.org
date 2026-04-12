import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  ssr: false,
  server: {
    preset: "static",
    static: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
