import { copyFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dest = join(root, "src", "data", "extensions-catalog.json");
const src = join(root, "..", "devcentr", "catalog", "extensions.json");

if (existsSync(src)) {
  copyFileSync(src, dest);
  console.log(`sync-extensions-catalog: ${src} -> ${dest}`);
} else if (existsSync(dest)) {
  console.log("sync-extensions-catalog: sibling catalog missing; keeping the committed copy");
} else {
  console.error("sync-extensions-catalog: no catalog file");
  process.exit(1);
}
