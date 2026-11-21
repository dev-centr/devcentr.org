import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  filterEntries,
  installPointer,
  pointerOnly,
  seedCatalog,
} from "../src/lib/extensions-catalog.ts";

const root = dirname(fileURLToPath(import.meta.url));
const catalog = JSON.parse(readFileSync(join(root, "..", "src", "data", "extensions-catalog.json"), "utf8"));
const docs = pointerOnly(catalog.entries[0]);

const seeded = seedCatalog(null, [docs]);
assert.equal(seeded.length, 1);
assert.equal(seeded[0].install.pointer, docs.install.pointer);
assert.equal(seeded[0].content, undefined);

const again = installPointer(seeded, docs);
assert.equal(again.added, false);
assert.match(again.message, /already/);

const extra = pointerOnly({
  ...docs,
  id: "other",
  catalogId: "dev-centr/agent-rules/other",
  name: "Other template",
  install: { pointer: "https://example.com/other.md" },
});
const added = installPointer(seeded, extra);
assert.equal(added.added, true);
assert.equal(added.entries[1].install.pointer, "https://example.com/other.md");
assert.equal(JSON.stringify(added.entries).includes("Diátaxis"), false);
assert.equal(Object.hasOwn(added.entries[1], "content"), false);

assert.equal(filterEntries(added.entries, "rules-template", "other").length, 1);
assert.equal(filterEntries(added.entries, "ui-module", "").length, 0);
assert.equal(filterEntries(added.entries, "all", "no-such-template").length, 0);

console.log("extensions catalog tests passed");
