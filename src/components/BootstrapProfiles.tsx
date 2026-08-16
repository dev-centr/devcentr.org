import {
  createMemo,
  createSignal,
  For,
  onMount,
  Show,
  type Component,
} from "solid-js";
import { Button } from "~/components/ui/button";
import "../toolchain-advisor.css";

export type BootstrapProfile = {
  id: string;
  kind: string;
  summary: string;
  useWhen: string[];
  sessionScope: string[];
  skip: string[];
  file: string;
  merged: Record<string, unknown>;
};

export type BootstrapProfileCatalog = {
  sourceRepo: string;
  sourcePath: string;
  skill: string;
  defaults: Record<string, unknown>;
  profiles: BootstrapProfile[];
};

async function loadCatalog(): Promise<BootstrapProfileCatalog> {
  const res = await fetch("/catalog/bootstrap-profiles.json");
  if (!res.ok) {
    throw new Error(`Failed to load bootstrap profiles (${res.status})`);
  }
  const data = (await res.json()) as BootstrapProfileCatalog;
  if (!Array.isArray(data.profiles)) {
    throw new Error("Invalid catalog: missing profiles[]");
  }
  return data;
}

function scalar(v: unknown): string {
  if (v == null || v === true) return "";
  if (typeof v === "object") return "";
  return String(v);
}

const BootstrapProfiles: Component = () => {
  const [catalog, setCatalog] = createSignal<BootstrapProfileCatalog | null>(null);
  const [selectedId, setSelectedId] = createSignal("");
  const [query, setQuery] = createSignal("");
  const [error, setError] = createSignal<string | null>(null);
  const [loading, setLoading] = createSignal(true);
  const [copied, setCopied] = createSignal(false);

  const reload = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await loadCatalog();
      setCatalog(data);
      setSelectedId((prev) => prev || data.profiles[0]?.id || "");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load catalog");
    } finally {
      setLoading(false);
    }
  };

  onMount(() => {
    void reload();
  });

  const visible = createMemo(() => {
    const q = query().trim().toLowerCase();
    const list = catalog()?.profiles ?? [];
    if (!q) return list;
    return list.filter((p) => {
      const hay = [p.id, p.kind, p.summary, ...p.useWhen].join(" ").toLowerCase();
      return hay.includes(q);
    });
  });

  const selected = createMemo(
    () => catalog()?.profiles.find((p) => p.id === selectedId()) ?? visible()[0] ?? null,
  );

  const copyName = async (id: string) => {
    try {
      await navigator.clipboard.writeText(id);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div class="advisor-root">
      <Show when={loading()}>
        <p class="advisor-status">Loading skills from agent-rules…</p>
      </Show>
      <Show when={error()}>
        <p class="advisor-error">{error()}</p>
        <Button variant="outline" class="mt-2 rounded-sm" onClick={() => void reload()}>
          Retry
        </Button>
      </Show>
      <Show when={catalog() && !loading() && !error()}>
        <div class="advisor-split">
          <div class="advisor-flow tpl-flow" role="listbox" aria-label="Bootstrap skills">
            <div class="advisor-step advisor-step-focused tpl-list">
              <h3>Skills</h3>
              <p class="advisor-hint">Click a name to inspect it. Copy pastes the id into a Cursor prompt.</p>
              <input
                type="search"
                class="advisor-search"
                placeholder="Search…"
                value={query()}
                onInput={(e) => setQuery(e.currentTarget.value)}
              />
              <ul class="advisor-options tpl-options">
                <For each={visible()}>
                  {(p) => (
                    <li>
                      <button
                        type="button"
                        class="advisor-option"
                        classList={{ selected: selected()?.id === p.id }}
                        role="option"
                        aria-selected={selected()?.id === p.id}
                        onClick={() => setSelectedId(p.id)}
                      >
                        <span class="tpl-id">{p.id}</span>
                        <span class="advisor-era">{p.kind}</span>
                      </button>
                    </li>
                  )}
                </For>
              </ul>
            </div>
          </div>
          <aside class="advisor-context">
            <Show
              when={selected()}
              fallback={<p class="advisor-status">Select a skill.</p>}
            >
              {(p) => (
                <>
                  <h2>
                    <code class="tpl-name">{p().id}</code>
                  </h2>
                  <p class="advisor-era-line">
                    {p().kind}
                    <Show when={p().merged.site && typeof p().merged.site === "object"}>
                      {" · "}
                      {scalar((p().merged.site as Record<string, unknown>).framework)}{" "}
                      {scalar((p().merged.site as Record<string, unknown>).preset)}
                      {" + "}
                      {scalar((p().merged.site as Record<string, unknown>).ui)}
                    </Show>
                  </p>
                  <div class="tpl-copy-row">
                    <Button
                      variant="outline"
                      class="rounded-md font-mono text-xs uppercase tracking-[0.16em]"
                      onClick={() => void copyName(p().id)}
                    >
                      {copied() ? "Copied" : "Copy name"}
                    </Button>
                  </div>
                  <h3>Overview</h3>
                  <p class="advisor-overview">{p().summary}</p>
                  <Show when={p().useWhen.length > 0}>
                    <h3>Use when</h3>
                    <ul class="tpl-chips">
                      <For each={p().useWhen}>{(w) => <li>{w}</li>}</For>
                    </ul>
                  </Show>
                  <Show when={p().sessionScope.length > 0}>
                    <h3>Session scope</h3>
                    <p class="advisor-meta">{p().sessionScope.join(" · ")}</p>
                  </Show>
                  <Show when={p().skip.length > 0}>
                    <h3>Skip unless asked</h3>
                    <p class="advisor-meta">{p().skip.join(" · ")}</p>
                  </Show>
                  <p class="advisor-meta tpl-prompt">
                    Prompt:{" "}
                    <code>
                      bootstrap with the {p().id} profile
                    </code>
                  </p>
                </>
              )}
            </Show>
          </aside>
        </div>
      </Show>
    </div>
  );
};

export { BootstrapProfiles };
