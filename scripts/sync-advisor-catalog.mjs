import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const sdlCandidates = [
  join(root, "toolchain-advisor", "catalog", "advisor.sdl"),
  join(root, "..", "toolchain-advisor", "catalog", "advisor.sdl"),
];

const sdlSrc = sdlCandidates.find((p) => existsSync(p));
const destDir = join(root, "public", "catalog");
const destJson = join(destDir, "advisor.json");
const destSdl = join(destDir, "advisor.sdl");

if (!sdlSrc) {
  console.warn("sync-advisor-catalog: no toolchain-advisor SDL found");
  process.exit(0);
}

mkdirSync(destDir, { recursive: true });
copyFileSync(sdlSrc, destSdl);

const appDir = join(root, "..", "devcentr", "app");
const compile = spawnSync(
  "dub",
  ["run", "--config=compile-catalog", "--", sdlSrc, destJson],
  { cwd: appDir, stdio: "inherit", shell: true },
);

if (compile.status !== 0) {
  const committed = join(dirname(sdlSrc), "advisor.json");
  if (existsSync(committed)) {
    copyFileSync(committed, destJson);
    console.warn("sync-advisor-catalog: dub unavailable; using committed advisor.json");
  } else {
    console.error("sync-advisor-catalog: dub compile-catalog failed and no advisor.json");
    process.exit(compile.status ?? 1);
  }
}

console.log(`sync-advisor-catalog: ${sdlSrc} -> ${destJson}`);
