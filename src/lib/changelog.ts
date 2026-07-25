import catalog from "~/lib/changelog-entries.generated.json";

export type ChangelogEntry = {
  id: string;
  date: string;
  title: string;
  bullets: string[];
  sourceId: string;
  sourceLabel: string;
  docsUrl: string;
  kind: "changelog" | "activity-log" | string;
};

export function getChangelogEntries(): ChangelogEntry[] {
  return catalog.entries as ChangelogEntry[];
}

export function getChangelogSources(): { id: string; label: string; docsUrl: string }[] {
  const seen = new Map<string, { id: string; label: string; docsUrl: string }>();
  for (const e of getChangelogEntries()) {
    if (!seen.has(e.sourceId)) {
      seen.set(e.sourceId, { id: e.sourceId, label: e.sourceLabel, docsUrl: e.docsUrl });
    }
  }
  return [...seen.values()];
}
