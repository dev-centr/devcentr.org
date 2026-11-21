import { createSignal, For, onMount, Show } from "solid-js";
import { useSearchParams } from "@solidjs/router";
import { filterEntries, installPointer, typeOptions, type ExtensionEntry } from "~/lib/extensions-catalog";
import { publishedEntries, readOrSeed, writeStored } from "~/lib/local-extensions";

const kindLabel: Record<string, string> = {
  all: "All kinds",
  "rules-template": "Rules templates",
};

export function ExtensionsStore() {
  const [params, setParams] = useSearchParams();
  const catalog = publishedEntries();
  const [query, setQuery] = createSignal("");
  const [installed, setInstalled] = createSignal<ExtensionEntry[]>([]);
  const [message, setMessage] = createSignal("");

  onMount(() => setInstalled(readOrSeed()));

  const kind = () => {
    const value = params.type;
    const raw = Array.isArray(value) ? value[0] : value;
    return raw && raw.length ? raw : "all";
  };

  const shown = () => filterEntries(catalog, kind(), query());

  function install(entry: ExtensionEntry) {
    const current = installed().length ? installed() : readOrSeed();
    const result = installPointer(current, entry);
    setInstalled(result.entries);
    writeStored(result.entries);
    setMessage(result.message);
  }

  return (
    <div>
      <h1 class="font-display text-4xl font-semibold tracking-tight">Extensions store</h1>
      <p class="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
        Browse extensions for DevCentr. Rules templates are one kind. Search by name or tag, then install.
        Install saves a link in this browser. The template text stays in its repository. The desktop app is
        where the list of templates on this computer lives.
      </p>

      <form class="mt-8 flex flex-col gap-3 sm:flex-row" onSubmit={(event) => event.preventDefault()}>
        <label class="flex min-w-0 flex-1 flex-col gap-1 text-sm">
          <span class="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Search</span>
          <input
            type="search"
            value={query()}
            placeholder="Search extensions"
            class="rounded-md border border-border bg-background px-3 py-2"
            onInput={(event) => setQuery(event.currentTarget.value)}
          />
        </label>
        <label class="flex flex-col gap-1 text-sm">
          <span class="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Kind</span>
          <select
            class="rounded-md border border-border bg-background px-3 py-2"
            value={kind()}
            onChange={(event) => setParams({ type: event.currentTarget.value })}
          >
            <For each={typeOptions(catalog)}>
              {(type) => <option value={type}>{kindLabel[type] ?? type}</option>}
            </For>
          </select>
        </label>
      </form>

      <p class="mt-4 text-sm text-muted-foreground" role="status">
        {message() || `${shown().length} shown.`}
      </p>

      <Show
        when={shown().length > 0}
        fallback={<p class="mt-8 text-sm">No extensions match that search. Try a different word, or set the kind to All kinds.</p>}
      >
        <ul class="mt-6 divide-y divide-border/70 border-y border-border/70">
          <For each={shown()}>
            {(entry) => (
              <li class="flex flex-col gap-3 py-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 class="font-display text-xl font-semibold">{entry.name}</h2>
                  <p class="mt-2 max-w-xl text-sm text-muted-foreground">{entry.description}</p>
                  <p class="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    {kindLabel[entry.type] ?? entry.type} · {entry.version} · {entry.tags.join(", ")}
                  </p>
                  <a class="mt-2 inline-block text-sm text-primary underline-offset-4 hover:underline" href={entry.repository}>
                    Source repository
                  </a>
                </div>
                <button
                  type="button"
                  class="shrink-0 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
                  onClick={() => install(entry)}
                >
                  Install template
                </button>
              </li>
            )}
          </For>
        </ul>
      </Show>
      <p class="mt-6 text-sm text-muted-foreground">
        The rules editor is the Rules page in the DevCentr desktop app. This store does not edit rules.
      </p>
    </div>
  );
}
