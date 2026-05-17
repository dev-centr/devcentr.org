import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pub = join(root, ".output", "public");
const indexHtml = join(pub, "index.html");
const html = readFileSync(indexHtml, "utf8");

mkdirSync(join(pub, "toolchain-advisor"), { recursive: true });
writeFileSync(join(pub, "toolchain-advisor", "index.html"), html);
writeFileSync(join(pub, "404.html"), html);
