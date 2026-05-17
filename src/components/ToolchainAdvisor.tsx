import {
  createMemo,
  createSignal,
  For,
  onMount,
  Show,
  type Component,
} from "solid-js";
import {
  fetchBundledAdvisorCatalog,
  findOption,
  initialSelections,
  pickBestRecommendation,
  rankRecommendations,
  type AdvisorCatalog,
  type AdvisorStep,
} from "@dev-centr/toolchain-advisor-core";
import "../toolchain-advisor.css";

function filterOptions(step: AdvisorStep, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return step.options;
  return step.options.filter(
    (o) => o.label.toLowerCase().includes(q) || o.id.toLowerCase().includes(q),
  );
}

const StepCard: Component<{
  step: AdvisorStep;
  selection: string;
  focused: boolean;
  onSelect: (optionId: string) => void;
  onFocus: () => void;
}> = (props) => {
  const [query, setQuery] = createSignal("");
  const visible = createMemo(() => filterOptions(props.step, query()));

  return (
    <div class={`advisor-step${props.focused ? " advisor-step-focused" : ""}`}>
      <h3>{props.step.title}</h3>
      <Show when={props.step.hint}>
        <p class="advisor-hint">{props.step.hint}</p>
      </Show>
      <input
        type="search"
        class="advisor-search"
        placeholder="Search…"
        value={query()}
        onFocus={() => props.onFocus()}
        onInput={(e) => setQuery(e.currentTarget.value)}
      />
      <ul class="advisor-options">
        <For each={visible()}>
          {(opt) => (
            <li>
              <button
                type="button"
                class="advisor-option"
                classList={{ selected: props.selection === opt.id }}
                onClick={() => {
                  props.onFocus();
                  props.onSelect(opt.id);
                }}
              >
                {opt.label}
                <Show when={opt.era}>
                  <span class="advisor-era">{opt.era}</span>
                </Show>
              </button>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
};

const ContextPanel: Component<{
  catalog: AdvisorCatalog;
  focusStepId: string;
  selections: Record<string, string>;
}> = (props) => {
  const opt = createMemo(() =>
    findOption(props.catalog, props.focusStepId, props.selections[props.focusStepId] ?? ""),
  );
  const best = createMemo(() =>
    pickBestRecommendation(rankRecommendations(props.catalog.recommendations, props.selections)),
  );

  return (
    <aside class="advisor-context">
      <Show
        when={opt()}
        fallback={
          <p class="advisor-status">
            Select an option to see overview, timeline, and how it compares to alternates.
          </p>
        }
      >
        {(o) => (
          <>
            <h2>{o().label}</h2>
            <Show when={o().era}>
              <p class="advisor-era-line">Era: {o().era}</p>
            </Show>
            <Show when={o().overview}>
              <h3>Overview</h3>
              <p class="advisor-overview">{o().overview}</p>
            </Show>
            <Show when={o().timeline && o().timeline!.length > 0}>
              <h3>Timeline</h3>
              <ol class="advisor-timeline">
                <For each={o().timeline!}>
                  {(m) => (
                    <li>
                      <strong>
                        {m.period} — {m.title}
                      </strong>
                      <p>{m.summary}</p>
                    </li>
                  )}
                </For>
              </ol>
            </Show>
            <Show when={o().alternates && o().alternates!.length > 0}>
              <h3>Compare alternates</h3>
              <For each={o().alternates!}>
                {(alt) => (
                  <div class="advisor-compare-card">
                    <h4>{alt.title || `vs ${alt.versus}`}</h4>
                    <Show when={alt.summary}>
                      <p>{alt.summary}</p>
                    </Show>
                    <Show when={alt.preferWhen}>
                      <p class="advisor-meta">Prefer when: {alt.preferWhen}</p>
                    </Show>
                    <Show when={alt.problemsSolved}>
                      <p class="advisor-meta">Addresses: {alt.problemsSolved}</p>
                    </Show>
                  </div>
                )}
              </For>
            </Show>
          </>
        )}
      </Show>

      <section class="advisor-guidance">
        <h3>Guidance for full selection</h3>
        <p class="advisor-guidance-title">{best().title}</p>
        <p>{best().summary}</p>
      </section>
    </aside>
  );
};

export const ToolchainAdvisor: Component = () => {
  const [catalog, setCatalog] = createSignal<AdvisorCatalog | null>(null);
  const [selections, setSelections] = createSignal<Record<string, string>>({});
  const [focusStepId, setFocusStepId] = createSignal("");
  const [error, setError] = createSignal<string | null>(null);
  const [loading, setLoading] = createSignal(true);

  const reload = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchBundledAdvisorCatalog();
      setCatalog(data);
      setSelections(initialSelections(data));
      setFocusStepId(data.steps[0]?.id ?? "");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load catalog");
    } finally {
      setLoading(false);
    }
  };

  onMount(() => {
    void reload();
  });

  return (
    <div class="advisor-root">
      <Show when={loading()}>
        <p class="advisor-status">Loading definitions…</p>
      </Show>
      <Show when={error()}>
        <p class="advisor-error">{error()}</p>
        <button type="button" class="btn btn-secondary" onClick={() => void reload()}>
          Retry
        </button>
      </Show>
      <Show when={catalog() && !loading() && !error()}>
        <div class="advisor-split">
          <div class="advisor-flow" role="group" aria-label="Decision steps">
            <For each={catalog()!.steps}>
              {(step, i) => (
                <>
                  <Show when={i() > 0}>
                    <div class="advisor-connector" aria-hidden="true" />
                  </Show>
                  <StepCard
                    step={step}
                    selection={selections()[step.id] ?? ""}
                    focused={focusStepId() === step.id}
                    onFocus={() => setFocusStepId(step.id)}
                    onSelect={(id) =>
                      setSelections((prev) => ({ ...prev, [step.id]: id }))
                    }
                  />
                </>
              )}
            </For>
          </div>
          <ContextPanel
            catalog={catalog()!}
            focusStepId={focusStepId()}
            selections={selections()}
          />
        </div>
        <p class="advisor-source">
          Definitions from{" "}
          <a
            href="https://github.com/dev-centr/toolchain-advisor"
            target="_blank"
            rel="noopener noreferrer"
          >
            dev-centr/toolchain-advisor
          </a>{" "}
          (SDL → JSON at site build). Desktop syncs the same repo via git.
        </p>
      </Show>
    </div>
  );
};
