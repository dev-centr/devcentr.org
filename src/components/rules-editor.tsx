import { createResource, createSignal, For, onMount, Show } from "solid-js";
import { rawFromPointer, type ExtensionEntry } from "~/lib/extensions-catalog";
import { publishedEntries, readOrSeed } from "~/lib/local-extensions";

const initial = publishedEntries().filter((entry) => entry.id === "docs-default");

export function RulesEditor() {
  const [entries, setEntries] = createSignal<ExtensionEntry[]>(initial);
  const [selectedId, setSelectedId] = createSignal(initial[0]?.catalogId ?? "");

  onMount(() => {
    const stored = readOrSeed();
    setEntries(stored);
    if (!stored.some((entry) => entry.catalogId === selectedId())) {
      setSelectedId(stored[0]?.catalogId ?? "");
    }
  });

  const selected = () => entries().find((entry) => entry.catalogId === selectedId()) ?? entries()[0];

  const [source] = createResource(selected, async (entry) => {
    if (!entry) return "";
    const raw = rawFromPointer(entry.install.pointer);
    if (!raw) return "";
    const response = await fetch(raw);
    if (!response.ok) return "";
    return response.text();
  });

  return (
    <div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <section aria-label="Template source">
        <h2 class="font-display text-2xl font-semibold tracking-tight">Rules editor</h2>
        <p class="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          This list is the rules templates on this computer. Each one is a link to a file in its repository.
          Select a name to read the source. This page does not save edits.
        </p>
        <Show
          when={selected()}
          fallback={<p class="mt-6 text-sm text-muted-foreground">No templates yet. Install more templates to add a link.</p>}
        >
          {(entry) => (
            <>
              <p class="mt-4 text-sm">
                <a class="text-primary underline-offset-4 hover:underline" href={entry().install.pointer}>
                  Open the template file
                </a>
              </p>
              <pre class="mt-4 max-h-[36rem] overflow-auto rounded-md border border-border/70 bg-muted/30 p-4 text-xs leading-relaxed whitespace-pre-wrap">
                {source.loading
                  ? "Loading the template source…"
                  : source() ||
                    `The catalog stores a link, not a copy of this template.\n\n${entry().install.pointer}`}
              </pre>
            </>
          )}
        </Show>
      </section>

      <aside class="rounded-md border border-border/70 bg-muted/20 p-4" aria-label="Templates on this computer">
        <h2 class="font-display text-lg font-semibold">Templates on this computer</h2>
        <ul class="mt-3 divide-y divide-border/70">
          <For each={entries()}>
            {(entry) => (
              <li>
                <button
                  type="button"
                  class="w-full py-3 text-left text-sm hover:text-primary"
                  aria-current={entry.catalogId === selected()?.catalogId ? "true" : undefined}
                  onClick={() => setSelectedId(entry.catalogId)}
                >
                  {entry.name}
                </button>
              </li>
            )}
          </For>
        </ul>
        <Show when={selected()}>
          {(entry) => (
            <p class="mt-3 text-xs leading-relaxed text-muted-foreground">
              {entry().description}
              <span class="mt-2 block break-all">Link: {entry().install.pointer}</span>
            </p>
          )}
        </Show>
        <a
          href="/extensions?type=rules-template"
          class="mt-4 inline-flex rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground no-underline"
        >
          Install more templates
        </a>
      </aside>
    </div>
  );
}
