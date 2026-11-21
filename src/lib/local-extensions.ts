import catalogFile from "~/data/extensions-catalog.json";
import {
  LOCAL_CATALOG_KEY,
  pointerOnly,
  seedCatalog,
  type ExtensionCatalogFile,
  type ExtensionEntry,
} from "~/lib/extensions-catalog";

const file = catalogFile as ExtensionCatalogFile;

export function publishedEntries(): ExtensionEntry[] {
  return file.entries.map(pointerOnly);
}

export function readStored(): ExtensionEntry[] | null {
  if (typeof localStorage === "undefined") return null;
  const raw = localStorage.getItem(LOCAL_CATALOG_KEY);
  if (raw == null) return null;
  try {
    const parsed = JSON.parse(raw) as { entries?: ExtensionEntry[] };
    if (!Array.isArray(parsed.entries)) return [];
    return parsed.entries.map(pointerOnly);
  } catch {
    return [];
  }
}

export function writeStored(entries: ExtensionEntry[]) {
  const body = JSON.stringify({ entries: entries.map(pointerOnly) });
  localStorage.setItem(LOCAL_CATALOG_KEY, body);
}

/** First visit records the default docs template as a pointer. */
export function readOrSeed(): ExtensionEntry[] {
  const stored = readStored();
  const entries = seedCatalog(stored, publishedEntries().filter((e) => e.id === "docs-default"));
  if (stored == null) writeStored(entries);
  return entries;
}
