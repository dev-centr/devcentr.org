/**
 * Rasterize brand SVGs to PNG (1024 + 256) and pack a square favicon from the mark.
 * Uses sharp when available; falls back to @resvg/resvg-js for the PNG sizes.
 */
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __dirname = dirname(fileURLToPath(import.meta.url));
const brandDir = join(__dirname, "../public/brand");
const publicDir = join(__dirname, "../public");
const profileDir = join(__dirname, "../../.github/profile");
mkdirSync(brandDir, { recursive: true });

const SIZE = 128;
const FAVICON_INSET = 8;
const TILE_RX = 24;
const TILE_FILL = "#0A0E14";
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };

const require = createRequire(import.meta.url);

async function loadRasterizer() {
  try {
    const sharp = (await import("sharp")).default;
    return {
      name: "sharp",
      sharp,
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
      sharp: null,
      async png(svgPath, outPath, size) {
        const svg = readFileSync(svgPath);
        const resvg = new Resvg(svg, {
          fitTo: { mode: "width", value: size },
        });
        writeFileSync(outPath, resvg.render().asPng());
      },
    };
  } catch {
    /* last resort */
  }
  throw new Error("Install sharp or @resvg/resvg-js to rasterize logos (pnpm add -D sharp).");
}

function innerMarkup(svgText) {
  return svgText.slice(svgText.indexOf(">") + 1, svgText.lastIndexOf("</svg>")).trim();
}

function fmt(n) {
  return Number.parseFloat(n.toFixed(3));
}

function pngToIco(pngBuf, dim = 32) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);
  const entry = Buffer.alloc(16);
  entry[0] = dim === 256 ? 0 : dim;
  entry[1] = dim === 256 ? 0 : dim;
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(pngBuf.length, 8);
  entry.writeUInt32LE(22, 12);
  return Buffer.concat([header, entry, pngBuf]);
}

async function packFavicon(sharp, sourceSvg) {
  const svg = readFileSync(sourceSvg, "utf8").replace(
    /\s*<rect width="512" height="512"[^/]*\/>\s*/m,
    "\n  ",
  );
  const px = 4;
  const raster = await sharp(Buffer.from(svg))
    .resize(512 * px, 512 * px)
    .ensureAlpha()
    .png()
    .toBuffer();
  const { info } = await sharp(raster)
    .trim({ background: TRANSPARENT, threshold: 0 })
    .toBuffer({ resolveWithObject: true });
  const bbox = {
    x: -info.trimOffsetLeft / px,
    y: -info.trimOffsetTop / px,
    w: info.width / px,
    h: info.height / px,
  };
  const avail = SIZE - 2 * FAVICON_INSET;
  const s = Math.min(avail / bbox.w, avail / bbox.h);
  const tx = (SIZE - bbox.w * s) / 2;
  const ty = (SIZE - bbox.h * s) / 2;
  const tf = `translate(${fmt(tx)} ${fmt(ty)}) scale(${fmt(s)}) translate(${fmt(-bbox.x)} ${fmt(-bbox.y)})`;
  const inner = innerMarkup(svg)
    .split(/\r?\n/)
    .map((line) => (line ? `    ${line}` : line))
    .join("\n");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}" role="img" aria-label="DevCentr">
  <title>DevCentr</title>
  <rect width="${SIZE}" height="${SIZE}" rx="${TILE_RX}" fill="${TILE_FILL}"/>
  <g transform="${tf}">
${inner}
  </g>
</svg>
`;
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

if (!raster.sharp) {
  throw new Error("sharp is required to pack the favicon from the orbital mark");
}

const faviconSvg = await packFavicon(raster.sharp, join(brandDir, "logo-on-dark.svg"));
const faviconSvgPath = join(brandDir, "favicon.svg");
writeFileSync(faviconSvgPath, faviconSvg);
copyFileSync(faviconSvgPath, join(publicDir, "favicon.svg"));

await raster.sharp(Buffer.from(faviconSvg)).resize(SIZE, SIZE).png().toFile(join(brandDir, "favicon.png"));
await raster.sharp(Buffer.from(faviconSvg)).resize(32, 32).png().toFile(join(publicDir, "favicon-32.png"));
const icoPng = await raster.sharp(Buffer.from(faviconSvg)).resize(32, 32).png().toBuffer();
writeFileSync(join(publicDir, "favicon.ico"), pngToIco(icoPng, 32));
console.log(`Wrote favicon.svg / favicon.ico (mark packed into ${SIZE}px tile, inset ${FAVICON_INSET})`);

if (existsSync(profileDir)) {
  copyFileSync(faviconSvgPath, join(profileDir, "favicon.svg"));
  copyFileSync(join(brandDir, "favicon.png"), join(profileDir, "favicon.png"));
  console.log("Mirrored favicon into ../.github/profile/");
}

void require;
