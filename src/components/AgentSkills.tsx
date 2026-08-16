import { A, useSearchParams } from "@solidjs/router";
import { createEffect, createMemo, createSignal, For, Show, type Component } from "solid-js";
import { Button } from "~/components/ui/button";
import { BootstrapProfiles } from "~/components/BootstrapProfiles";
import {
  SKILL_CATEGORIES,
  parseSkillCategory,
  skillsInCategory,
  type SkillEntry,
} from "~/lib/agent-skills";
import "../toolchain-advisor.css";

const SkillList: Component<{ entries: SkillEntry[] }> = (props) => {
  const [selectedId, setSelectedId] = createSignal(props.entries[0]?.id ?? "");
  const [copied, setCopied] = createSignal(false);

  createEffect(() => {
    const ids = props.entries.map((s) => s.id);
    if (!ids.includes(selectedId())) setSelectedId(ids[0] ?? "");
  });
  const selected = createMemo(
    () => props.entries.find((s) => s.id === selectedId()) ?? props.entries[0] ?? null,
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
    <div class="advisor-split">
      <div class="advisor-flow tpl-flow" role="listbox" aria-label="Skills">
        <div class="advisor-step advisor-step-focused tpl-list">
          <h3>Skills</h3>
          <p class="advisor-hint">Click a name to inspect it. Copy pastes the id into a Cursor prompt.</p>
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
              <div class="tpl-copy-row">
                <Button
                  variant="outline"
                  class="rounded-md font-mono text-xs uppercase tracking-[0.16em]"
                  onClick={() => void copyName(s().id)}
                >
                  {copied() ? "Copied" : "Copy name"}
                </Button>
              </div>
              <h3>Overview</h3>
              <p class="advisor-overview">{s().summary}</p>
              <Show when={s().id === "bootstrap-org"}>
                <p class="advisor-meta tpl-prompt">
                  Open the{" "}
                  <A href="/skills?cat=bootstrap">Bootstrap skills</A> selector to copy a profile name.
                </p>
              </Show>
            </>
          )}
        </Show>
      </aside>
    </div>
  );
};

export function AgentSkills() {
  const [params, setParams] = useSearchParams();
  const category = createMemo(() => parseSkillCategory(params.cat));
  const catMeta = createMemo(
    () => SKILL_CATEGORIES.find((c) => c.id === category()) ?? SKILL_CATEGORIES[0],
  );
  const entries = createMemo(() => skillsInCategory(category()));

  return (
    <div class="advisor-root">
      <div class="skill-cats" role="tablist" aria-label="Skill categories">
                <For each={SKILL_CATEGORIES}>
          {(c) => (
            <button
              type="button"
              role="tab"
              aria-selected={category() === c.id}
              class="skill-cat"
              classList={{ "is-active": category() === c.id }}
              onClick={() => setParams({ cat: c.id === "all" ? "" : c.id })}
            >
              {c.label}
            </button>
          )}
        </For>
      </div>

      <Show when={category() === "bootstrap"}>
        <BootstrapProfiles />
      </Show>
      <Show when={category() !== "bootstrap" && entries().length > 0}>
        <SkillList entries={entries()} />
      </Show>
      <Show when={category() !== "bootstrap" && entries().length === 0}>
        <p class="skill-empty">{catMeta().empty ?? "Nothing published in this category yet."}</p>
      </Show>

      <p class="skill-source">
        Source SDL ·{" "}
        <a href={catMeta().sourceUrl} target="_blank" rel="noopener noreferrer">
          {category() === "all" ? "agent-rules / skills" : catMeta().label}
        </a>
      </p>
    </div>
  );
}
