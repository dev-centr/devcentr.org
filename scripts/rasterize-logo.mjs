/**
 * Rasterize brand SVGs to PNG (1024 + 256 for each mark).
 * Uses sharp when available; falls back to @resvg/resvg-js.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __dirname = dirname(fileURLToPath(import.meta.url));
const brandDir = join(__dirname, "../public/brand");
mkdirSync(brandDir, { recursive: true });

const require = createRequire(import.meta.url);

async function loadRasterizer() {
  try {
    const sharp = (await import("sharp")).default;
    return {
      name: "sharp",
      async png(svgPath, outPath, size) {
        await sharp(svgPath).resize(size, size).png().toFile(outPath);
      },
    };
  } catch {
    /* try @resvg/resvg-js */
  }
  try {
    const { Resvg } = await import("@resvg/resvg-js");
    return {
      name: "resvg",
      async png(svgPath, outPath, size) {
        const svg = readFileSync(svgPath);
        const resvg = new Resvg(svg, {
          fitTo: { mode: "width", value: size },
        });
        const png = resvg.render().asPng();
        writeFileSync(outPath, png);
      },
    };
  } catch {
    /* last resort: dynamic install hint */
  }
  throw new Error(
    "Install sharp or @resvg/resvg-js to rasterize logos (pnpm add -D sharp).",
  );
}

const raster = await loadRasterizer();
const targets = [
  { source: "logo.svg", file: "logo.png", size: 1024 },
  { source: "logo.svg", file: "logo-256.png", size: 256 },
  { source: "logo-on-dark.svg", file: "logo-on-dark.png", size: 1024 },
  { source: "logo-on-dark.svg", file: "logo-on-dark-256.png", size: 256 },
];

for (const t of targets) {
  const src = join(brandDir, t.source);
  const out = join(brandDir, t.file);
  await raster.png(src, out, t.size);
  console.log(`Wrote ${t.file} from ${t.source} (${t.size}px) via ${raster.name}`);
}

void require;
