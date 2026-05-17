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

const compileScript = join(
  sdlSrc.includes("toolchain-advisor")
    ? dirname(dirname(sdlSrc))
    : join(root, "..", "toolchain-advisor"),
  "scripts",
  "compile-sdl.mjs",
);

const compile = spawnSync(process.execPath, [compileScript, sdlSrc, destJson], {
  stdio: "inherit",
});

if (compile.status !== 0) {
  const committed = join(dirname(sdlSrc), "advisor.json");
  if (existsSync(committed)) {
    copyFileSync(committed, destJson);
    console.warn("sync-advisor-catalog: compile failed; using committed advisor.json");
  } else {
    process.exit(compile.status ?? 1);
  }
} else {
  console.log(`sync-advisor-catalog: ${sdlSrc} -> ${destJson}`);
}
