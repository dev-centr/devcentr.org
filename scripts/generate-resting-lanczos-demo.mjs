/**
 * Build comparison assets for /resting-lanczos:
 * - master-2400.webp  (huge master for naive browser downscale)
 * - demo-400.webp / demo-800.webp  (Lanczos3 tiers)
 */
import sharp from "sharp";
import { mkdirSync, promises as fs } from "fs";
import { join } from "path";

const outDir = "public/resting-lanczos";
const rlDir = "Z:/code/github.com/dev-centr/resting-lanczos/demo/sample-tiers";
mkdirSync(outDir, { recursive: true });
mkdirSync(rlDir, { recursive: true });

const W = 2400;
const H = 1800;

function rings(cx, cy, count, startR, step, stroke, sw) {
  let s = "";
  for (let i = 0; i < count; i++) {
    const opacity = 0.25 + (i % 4) * 0.12;
    s += `<circle cx="${cx}" cy="${cy}" r="${startR + i * step}" fill="none" stroke="${stroke}" stroke-width="${sw}" opacity="${opacity}"/>`;
  }
  return s;
}

function checkers(y, count, size) {
  let s = "";
  for (let i = 0; i < count; i++) {
    const fill = i % 2 === 0 ? "#2DD4BF" : "#0B1520";
    s += `<rect x="${200 + i * size}" y="${y}" width="${size}" height="${size}" fill="${fill}"/>`;
  }
  return s;
}

function panelRows() {
  const labels = [
    "Ingress",
    "Adapters",
    "Equivalence DAG",
    "Toolchain graph",
    "Release sign",
    "Status probes",
  ];
  return labels
    .map((label, i) => {
      const y = 80 + i * 68;
      return `
      <rect x="28" y="${y}" width="744" height="52" rx="8" fill="#152433" stroke="#243444"/>
      <text x="52" y="${y + 32}" font-family="IBM Plex Mono, monospace" font-size="20" fill="#2DD4BF">${label}</text>
      <text x="520" y="${y + 32}" font-family="IBM Plex Mono, monospace" font-size="16" fill="#8FA3B5">ready · 12ms</text>`;
    })
    .join("");
}

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0B1520"/>
      <stop offset="100%" stop-color="#152433"/>
    </linearGradient>
    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#2a3a4a" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <rect width="100%" height="100%" fill="url(#grid)" opacity="0.55"/>
  <g transform="translate(200,160)">
    <rect x="0" y="0" width="2000" height="120" rx="12" fill="#178F80" opacity="0.18"/>
    <text x="40" y="78" font-family="IBM Plex Mono, Consolas, monospace" font-size="56" fill="#2DD4BF" letter-spacing="4">resting-lanczos · comparison chart</text>
  </g>
  <g transform="translate(200,360)" font-family="IBM Plex Mono, Consolas, monospace" fill="#E8EEF4">
    <text x="0" y="0" font-size="28" fill="#8FA3B5">Fine mono at display size (should stay crisp with Lanczos tiers)</text>
    <text x="0" y="48" font-size="18">ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789 ··· the quick brown fox</text>
    <text x="0" y="80" font-size="14">abcdefghijklmnopqrstuvwxyz · 1px hairlines · dense UI chrome</text>
    <text x="0" y="108" font-size="11">settings · build · deploy · observe · equivalence · pathman · msi · toolchain</text>
  </g>
  ${rings(700, 1100, 28, 40, 18, "#2DD4BF", 2)}
  ${rings(1700, 1100, 36, 24, 14, "#E8EEF4", 1)}
  ${checkers(1480, 60, 32)}
  <text x="200" y="1560" font-family="Space Grotesk, sans-serif" font-size="22" fill="#8FA3B5">1px / 2px edges · checker · rings — hover zoom uses transform:scale only</text>
  <g transform="translate(1400,360)">
    <rect width="800" height="520" rx="16" fill="#101820" stroke="#2a3a4a" stroke-width="2"/>
    <text x="28" y="48" font-family="Space Grotesk, sans-serif" font-size="32" font-weight="600" fill="#F0F4F8">Control plane</text>
    ${panelRows()}
  </g>
</svg>`;

const masterPng = await sharp(Buffer.from(svg)).png().toBuffer();

async function writeSet(dir) {
  await sharp(masterPng).webp({ quality: 92 }).toFile(join(dir, "master-2400.webp"));
  for (const w of [400, 800]) {
    const h = Math.round((w * 3) / 4);
    await sharp(masterPng)
      .resize(w, h, { fit: "cover", position: "top", kernel: sharp.kernel.lanczos3 })
      .webp({ quality: 90 })
      .toFile(join(dir, `demo-${w}.webp`));
  }
}

await writeSet(outDir);
await writeSet(rlDir);

for (const f of ["master-2400.webp", "demo-400.webp", "demo-800.webp"]) {
  const st = await fs.stat(join(outDir, f));
  console.log(f, st.size);
}
console.log("done");
