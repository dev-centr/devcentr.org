import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { execFileSync } from "node:child_process";

const root = resolve(import.meta.dirname, "..");
const mediaDirectory = join(root, "public", "news", "media");
const provenancePath = join(mediaDirectory, "playtime-diagrams.provenance.json");
const sourceCommit = "97534371f0da8d81e495cb4cc069704902dbdd69";
const sourceRepository = "https://github.com/dev-centr/scriptbook";
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
  "playtime-two-doors",
  "playtime-venn",
  "playtime-wrong-translator",
];
const variants = [
  { kind: "standalone-adaptive", suffix: ".svg", source: (name) => `spec/images/${name}.svg` },
  { kind: "host", suffix: ".host.svg", source: (name) => `spec/images/${name}.host.svg` },
  { kind: "fixed", suffix: ".fixed.svg", source: (name) => `spec/images/fixed/${name}.svg` },
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
    process.env.SCRIPTBOOK_REPO,
    join(root, "scriptbook"),
    join(root, "..", "scriptbook"),
  ];
  try {
    const commonDirectory = String(git(["rev-parse", "--path-format=absolute", "--git-common-dir"], root)).trim();
    candidates.push(join(dirname(dirname(commonDirectory)), "scriptbook"));
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

function targetPath(name, suffix) {
  return join(mediaDirectory, `${name}${suffix}`);
}

function canonicalArtifact(source, name, variant) {
  return git(["show", `${sourceCommit}:${variant.source(name)}`], source);
}

const source = findSourceRepository();
if (sync && !source) {
  throw new Error(
    "Cannot sync PlayTime diagrams: set SCRIPTBOOK_REPO to a clone containing the pinned commit.",
  );
}
if (requireSource && !source) {
  throw new Error("The pinned Scriptbook source commit is required but was not found.");
}

if (sync) {
  const artifacts = [];
  for (const name of names) {
    for (const variant of variants) {
      const target = targetPath(name, variant.suffix);
      const content = canonicalArtifact(source, name, variant);
      writeFileSync(target, content);
      artifacts.push({
        name,
        variant: variant.kind,
        sourcePath: variant.source(name),
        publicPath: relative(root, target).replaceAll("\\", "/"),
        sha256: sha256(content),
      });
    }
  }
  const provenance = {
    schemaVersion: 1,
    sourceRepository,
    sourceCommit,
    canonicalOwnership: ["spec/diagrams/playtime-*.mmd", "spec/diagrams/playtime-*.theme.json"],
    fixedAssetPolicy: "Original fixed artwork is pinned from Scriptbook's fixed delivery directory.",
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
