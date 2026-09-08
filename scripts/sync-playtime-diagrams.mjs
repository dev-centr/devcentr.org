import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { execFileSync } from "node:child_process";

const root = resolve(import.meta.dirname, "..");
const mediaDirectory = join(root, "public", "news", "media");
const provenancePath = join(mediaDirectory, "playtime-diagrams.provenance.json");
const sourceCommit = "137492ea980910d1286663654948bd82d2d5ac4b";
const sourceRepository = "https://github.com/dev-centr/general-knowledge";
const names = [
  "playtime-argv",
  "playtime-attic-basement",
  "playtime-bind-flow",
  "playtime-bootstrap",
  "playtime-facets-not-lattice",
  "playtime-growth-ratchet",
  "playtime-layers",
  "playtime-overlays",
  "playtime-sibling-home",
  "playtime-venn",
];
const variants = [
  { kind: "standalone-adaptive", suffix: ".svg" },
  { kind: "host", suffix: ".host.svg" },
  { kind: "fixed", suffix: ".fixed.svg" },
];
const sync = process.argv.includes("--sync");
const requireSource = process.argv.includes("--require-source");

function sha256(content) {
  return createHash("sha256").update(content).digest("hex");
}

function git(args, cwd) {
  return execFileSync("git", ["-C", cwd, ...args], {
    encoding: args[0] === "show" ? "buffer" : "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
}

function sourceCandidates() {
  const candidates = [
    process.env.GENERAL_KNOWLEDGE_REPO,
    join(root, "general-knowledge"),
    join(root, "..", "general-knowledge"),
  ];
  try {
    const commonDirectory = String(git(["rev-parse", "--path-format=absolute", "--git-common-dir"], root)).trim();
    candidates.push(join(dirname(dirname(commonDirectory)), "general-knowledge"));
  } catch {
    // Hash-only checks still work outside a Git checkout.
  }
  return [...new Set(candidates.filter(Boolean).map((candidate) => resolve(candidate)))];
}

function findSourceRepository() {
  for (const candidate of sourceCandidates()) {
    if (!existsSync(candidate)) continue;
    try {
      git(["cat-file", "-e", `${sourceCommit}^{commit}`], candidate);
      return candidate;
    } catch {
      // Try the next candidate.
    }
  }
  return undefined;
}

function canonicalPath(name, suffix) {
  return `docs/modules/ROOT/images/${name}${suffix}`;
}

function targetPath(name, suffix) {
  return join(mediaDirectory, `${name}${suffix}`);
}

function canonicalArtifact(source, name, variant) {
  return git(["show", `${sourceCommit}:${canonicalPath(name, variant.suffix)}`], source);
}

const source = findSourceRepository();
if (sync && !source) {
  throw new Error(
    "Cannot sync PlayTime diagrams: set GENERAL_KNOWLEDGE_REPO to a clone containing the pinned commit.",
  );
}
if (requireSource && !source) {
  throw new Error("The pinned General Knowledge source commit is required but was not found.");
}

if (sync) {
  const artifacts = [];
  for (const name of names) {
    for (const variant of variants) {
      const content = canonicalArtifact(source, name, variant);
      const target = targetPath(name, variant.suffix);
      writeFileSync(target, content);
      artifacts.push({
        name,
        variant: variant.kind,
        sourcePath: canonicalPath(name, variant.suffix),
        publicPath: relative(root, target).replaceAll("\\", "/"),
        sha256: sha256(content),
      });
    }
  }
  const provenance = {
    schemaVersion: 1,
    sourceRepository,
    sourceCommit,
    canonicalOwnership: [
      "docs/modules/ROOT/images/playtime-*.mmd",
      "docs/modules/ROOT/images/playtime-*.theme.json",
    ],
    artifacts,
  };
  writeFileSync(provenancePath, `${JSON.stringify(provenance, null, 2)}\n`, "utf8");
  console.log(`Synced ${artifacts.length} pinned PlayTime artifacts from ${sourceCommit}.`);
  process.exit(0);
}

const provenance = JSON.parse(readFileSync(provenancePath, "utf8"));
if (
  provenance.schemaVersion !== 1 ||
  provenance.sourceRepository !== sourceRepository ||
  provenance.sourceCommit !== sourceCommit
) {
  throw new Error("PlayTime diagram provenance does not match the pinned canonical source.");
}

const expected = names.length * variants.length;
if (provenance.artifacts.length !== expected) {
  throw new Error(`Expected ${expected} provenance records, found ${provenance.artifacts.length}.`);
}

for (const artifact of provenance.artifacts) {
  const local = readFileSync(join(root, artifact.publicPath));
  if (sha256(local) !== artifact.sha256) {
    throw new Error(`Stale or modified artifact: ${artifact.publicPath}`);
  }
  if (source) {
    const canonical = git(["show", `${sourceCommit}:${artifact.sourcePath}`], source);
    if (!local.equals(canonical)) {
      throw new Error(`Artifact differs from ${sourceCommit}: ${artifact.publicPath}`);
    }
  }
}

console.log(
  `Checked ${expected} PlayTime artifacts against pinned provenance${source ? " and canonical Git bytes" : ""}.`,
);
