export type ExtensionInstall = {
  /** URL or repo path. Same idea as DOCS_TEMPLATE. Not a copy of the rule body. */
  pointer: string;
};

/** Same field names as antora-supplemental ExtensionCatalogEntry. */
export type ExtensionEntry = {
  catalogId: string;
  id: string;
  name: string;
  description: string;
  repository: string;
  repositoryOwner?: string;
  repositoryName?: string;
  manifestPath?: string;
  version: string;
  type: string;
  tags: string[];
  install: ExtensionInstall;
};

export type ExtensionCatalogFile = {
  schema: string;
  borrowedFrom?: string;
  entries: ExtensionEntry[];
};

export const RULES_TEMPLATE_TYPE = "rules-template";
export const LOCAL_CATALOG_KEY = "devcentr.extensions.catalog";

export function pointerOnly(entry: ExtensionEntry): ExtensionEntry {
  return {
    catalogId: entry.catalogId || entry.id,
    id: entry.id,
    name: entry.name,
    description: entry.description,
    repository: entry.repository,
    repositoryOwner: entry.repositoryOwner,
    repositoryName: entry.repositoryName,
    manifestPath: entry.manifestPath,
    version: entry.version,
    type: entry.type,
    tags: [...(entry.tags ?? [])],
    install: { pointer: entry.install.pointer },
  };
}

export function seedCatalog(stored: ExtensionEntry[] | null, fallback: ExtensionEntry[]): ExtensionEntry[] {
  if (stored == null) return fallback.map(pointerOnly);
  return stored.map(pointerOnly);
}

export function installPointer(
  entries: ExtensionEntry[],
  entry: ExtensionEntry,
): { entries: ExtensionEntry[]; added: boolean; message: string } {
  if (!entry.install?.pointer) {
    return { entries, added: false, message: "This template has no install link." };
  }
  const id = entry.catalogId || entry.id;
  if (entries.some((e) => e.catalogId === id || e.id === entry.id)) {
    return { entries, added: false, message: "This template is already on this computer." };
  }
  return {
    entries: [...entries, pointerOnly(entry)],
    added: true,
    message: "Saved the link. The template text stays in the repository.",
  };
}

export function filterEntries(entries: ExtensionEntry[], typeFilter: string, query: string): ExtensionEntry[] {
  const kind = typeFilter.trim().toLowerCase();
  const q = query.trim().toLowerCase();
  return entries.filter((entry) => {
    if (kind && kind !== "all" && entry.type.toLowerCase() !== kind) return false;
    if (!q) return true;
    const hay = [entry.name, entry.description, entry.id, entry.repository, entry.catalogId, ...(entry.tags ?? [])]
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  });
}

/** GitHub blob URL to the raw file, for the viewer. Other pointers stay as links. */
export function rawFromPointer(pointer: string): string | null {
  const match = pointer.match(/^https:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\/([^/]+)\/(.+)$/);
  if (!match) return null;
  const [, owner, repo, ref, path] = match;
  return `https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${path}`;
}

export function typeOptions(entries: ExtensionEntry[]): string[] {
  const kinds = new Set(entries.map((e) => e.type).filter(Boolean));
  return ["all", ...kinds];
}
