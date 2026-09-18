import {
  createEffect,
  createMemo,
  createSignal,
  For,
  onCleanup,
  onMount,
  Show,
  type Component,
} from "solid-js";
import { CopyInstallSnippet } from "~/components/CopyInstallSnippet";
import { BootstrapProfiles } from "~/components/BootstrapProfiles";
import {
  SKILL_CATEGORIES,
  parseSkillCategory,
  skillAgentPrompt,
  skillsInCategory,
  type SkillCategoryId,
  type SkillEntry,
} from "~/lib/agent-skills";
import "../toolchain-advisor.css";

function readCatFromUrl(): SkillCategoryId {
  if (typeof window === "undefined") return "all";
  return parseSkillCategory(new URL(window.location.href).searchParams.get("cat") ?? undefined);
}

function writeCatToUrl(id: SkillCategoryId) {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  if (id === "all") url.searchParams.delete("cat");
  else url.searchParams.set("cat", id);
  const next = `${url.pathname}${url.search}${url.hash}`;
  const cur = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  if (next !== cur) window.history.replaceState(window.history.state, "", next);
}

const SkillList: Component<{ entries: SkillEntry[] }> = (props) => {
  const [selectedId, setSelectedId] = createSignal(props.entries[0]?.id ?? "");

  createEffect(() => {
    const ids = props.entries.map((s) => s.id);
    if (!ids.includes(selectedId())) setSelectedId(ids[0] ?? "");
  });
  const selected = createMemo(
    () => props.entries.find((s) => s.id === selectedId()) ?? props.entries[0] ?? null,
  );

  return (
    <>
      <div class="advisor-flow tpl-flow" role="listbox" aria-label="Skills">
        <div class="advisor-step advisor-step-focused tpl-list">
          <h3>Skills</h3>
          <p class="advisor-hint">
            Select a skill to inspect the harness inventory record. Copy the agent prompt when you
            want setup steps dropped into a coding agent.
          </p>
          <ul class="advisor-options tpl-options">
            <For each={props.entries}>
              {(s) => (
                <li>
                  <button
                    type="button"
                    class="advisor-option"
                    classList={{ selected: selected()?.id === s.id }}
                    role="option"
                    aria-selected={selected()?.id === s.id}
                    onClick={() => setSelectedId(s.id)}
                  >
                    <span class="tpl-id">{s.id}</span>
                    <span class="advisor-era">{s.category}</span>
                  </button>
                </li>
              )}
            </For>
          </ul>
        </div>
      </div>
      <aside class="advisor-context">
        <Show when={selected()} fallback={<p class="advisor-status">Select a skill.</p>}>
          {(s) => (
            <>
              <h2>
                <code class="tpl-name">{s().id}</code>
              </h2>
              <h3>Overview</h3>
              <p class="advisor-overview">{s().summary}</p>
              <CopyInstallSnippet
                label="Agent prompt"
                text={skillAgentPrompt(s().id, s().sourceUrl)}
              />
              <Show when={s().id === "bootstrap-org"}>
                <p class="advisor-meta tpl-prompt">
                  Open the{" "}
                  <button
                    type="button"
                    class="skill-inline-link"
                    onClick={() => {
                      writeCatToUrl("bootstrap");
                      window.dispatchEvent(
                        new CustomEvent("devcentr:skills-cat", { detail: "bootstrap" }),
                      );
                    }}
                  >
                    Bootstrap skills
                  </button>{" "}
                  selector for a profile-specific agent prompt.
                </p>
              </Show>
            </>
          )}
        </Show>
      </aside>
    </>
  );
};

const EmptyCategory: Component<{ message: string }> = (props) => (
  <>
    <div class="advisor-flow tpl-flow">
      <div class="advisor-step tpl-list">
        <h3>Skills</h3>
        <p class="advisor-hint">This category has no published skills yet.</p>
        <ul class="advisor-options tpl-options skill-empty-list" aria-hidden="true">
          <li>
            <span class="advisor-option skill-option-ghost">&nbsp;</span>
          </li>
          <li>
            <span class="advisor-option skill-option-ghost">&nbsp;</span>
          </li>
          <li>
            <span class="advisor-option skill-option-ghost">&nbsp;</span>
          </li>
        </ul>
      </div>
    </div>
    <aside class="advisor-context">
      <p class="skill-empty-label">No published skills</p>
      <p class="skill-empty">{props.message}</p>
    </aside>
  </>
);

export function AgentSkills() {
  const [category, setCategory] = createSignal<SkillCategoryId>("all");

  onMount(() => {
    setCategory(readCatFromUrl());
    const onPop = () => setCategory(readCatFromUrl());
    const onCustom = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      setCategory(parseSkillCategory(id));
      writeCatToUrl(parseSkillCategory(id));
    };
    window.addEventListener("popstate", onPop);
    window.addEventListener("devcentr:skills-cat", onCustom);
    onCleanup(() => {
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("devcentr:skills-cat", onCustom);
    });
  });

  const selectCategory = (id: SkillCategoryId) => {
    setCategory(id);
    writeCatToUrl(id);
  };

  const catMeta = createMemo(
    () => SKILL_CATEGORIES.find((c) => c.id === category()) ?? SKILL_CATEGORIES[0],
  );
  const entries = createMemo(() => skillsInCategory(category()));
  const isBootstrap = createMemo(() => category() === "bootstrap");

  return (
    <div class="advisor-root skills-cage">
      <div class="skill-cats" role="tablist" aria-label="Skill categories">
        <For each={SKILL_CATEGORIES}>
          {(c) => (
            <button
              type="button"
              role="tab"
              aria-selected={category() === c.id}
              class="skill-cat"
              classList={{ "is-active": category() === c.id }}
              onClick={() => selectCategory(c.id)}
            >
              {c.label}
            </button>
          )}
        </For>
      </div>

      <div class="skill-stage" aria-live="polite">
        <div
          class="advisor-split skill-stage-frame"
          hidden={isBootstrap()}
          aria-hidden={isBootstrap()}
        >
          <Show
            when={entries().length > 0}
            fallback={
              <EmptyCategory
                message={catMeta().empty ?? "Nothing published in this category yet."}
              />
            }
          >
            <SkillList entries={entries()} />
          </Show>
        </div>
        <div
          class="skill-stage-frame bootstrap-host"
          hidden={!isBootstrap()}
          aria-hidden={!isBootstrap()}
        >
          <BootstrapProfiles />
        </div>
      </div>

      <p class="skill-source">
        Source ·{" "}
        <a href={catMeta().sourceUrl} target="_blank" rel="noopener noreferrer">
          {category() === "all" ? "agent-rules / skills" : catMeta().label}
        </a>
      </p>
    </div>
  );
}
