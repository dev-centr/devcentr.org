import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const destDir = join(root, "public", "catalog");
const destJson = join(destDir, "bootstrap-profiles.json");

const profileDirs = [
  join(root, "agent-rules", "skills", "bootstrap-org", "profiles"),
  join(root, "..", "agent-rules", "skills", "bootstrap-org", "profiles"),
];

const profilesDir = profileDirs.find((p) => existsSync(join(p, "catalog.sdl")));

mkdirSync(destDir, { recursive: true });

if (!profilesDir) {
  console.warn("sync-bootstrap-profiles: agent-rules profiles/ not found (checkout sibling or CI path)");
  process.exit(0);
}

const compile = join(profilesDir, "..", "scripts", "compile-profiles.mjs");
const catalogSdl = join(profilesDir, "catalog.sdl");

if (existsSync(compile)) {
  const run = spawnSync(process.execPath, [compile, catalogSdl, destJson], { stdio: "inherit" });
  if (run.status === 0) {
    console.log(`sync-bootstrap-profiles: compiled ${catalogSdl} → ${destJson}`);
    process.exit(0);
  }
  console.warn("sync-bootstrap-profiles: compile failed; trying committed catalog.json");
}

const committed = join(profilesDir, "catalog.json");
if (existsSync(committed)) {
  copyFileSync(committed, destJson);
  console.warn(`sync-bootstrap-profiles: copied ${committed}`);
  process.exit(0);
}

console.warn("sync-bootstrap-profiles: no catalog produced");
process.exit(0);
