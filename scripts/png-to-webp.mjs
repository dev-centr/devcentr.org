import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const inDir = process.argv[2];
const outDir = process.argv[3] || inDir;
if (!inDir) {
  console.error("Usage: node png-to-webp.mjs <inDir> [outDir]");
  process.exit(1);
}
fs.mkdirSync(outDir, { recursive: true });
const files = fs.readdirSync(inDir).filter((f) => f.toLowerCase().endsWith(".png"));
for (const f of files) {
  const src = path.join(inDir, f);
  const dest = path.join(outDir, f.replace(/\.png$/i, ".webp"));
  await sharp(src).webp({ quality: 82 }).toFile(dest);
  console.log(`wrote ${dest}`);
}
