import { For, Show } from "solid-js";
import { Meta, Title } from "@solidjs/meta";

import { SiteFooter } from "~/components/site-footer";
import { getChangelogEntries, getChangelogSources } from "~/lib/changelog";

export default function ChangelogIndex() {
  const entries = getChangelogEntries();
  const sources = getChangelogSources();

  return (
    <>
      <Title>Changelog · DevCentr</Title>
      <Meta
        name="description"
        content="DevCentr changelog — shipping notes mirrored from Antora docs changelogs for DevCentr, General Knowledge, and the docs portal."
      />
      <Meta name="keywords" content="DevCentr, changelog, release notes, docs, shipping" />
      <main class="mx-auto max-w-6xl px-6 pb-24 pt-6 md:px-10 md:pt-10">
        <p class="eyebrow text-primary">Shipping notes</p>
        <h1 class="mt-3 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          Changelog
        </h1>
        <p class="mt-4 max-w-2xl text-muted-foreground">
          Day-to-day product and docs changes, sourced from the Antora changelogs. For narrative updates, see{" "}
          <a class="text-primary underline-offset-4 hover:underline" href="/news">
            News
          </a>
          .
        </p>

        <Show when={sources.length > 0}>
          <ul class="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            <For each={sources}>
              {(s) => (
                <li>
                  <a class="text-primary underline-offset-4 hover:underline" href={s.docsUrl}>
                    {s.label} on docs
                  </a>
                </li>
              )}
            </For>
          </ul>
        </Show>

        <Show
          when={entries.length > 0}
          fallback={
            <p class="mt-14 text-muted-foreground">
              No changelog entries yet. CI ingests Antora timelines at build time.
            </p>
          }
        >
          <ol class="mt-14 divide-y divide-border/70 border-y border-border/70">
            <For each={entries}>
              {(entry) => (
                <li class="grid gap-4 py-8 md:grid-cols-[7.5rem_1fr] md:gap-10">
                  <div class="flex flex-col gap-2">
                    <time
                      datetime={entry.date}
                      class="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground"
                    >
                      {entry.date}
                    </time>
                    <span class="font-mono text-[10px] uppercase tracking-[0.18em] text-primary/80">
                      {entry.sourceLabel}
                    </span>
                  </div>
                  <div class="min-w-0">
                    <h2 class="font-display text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                      {entry.title}
                    </h2>
                    <Show when={entry.bullets.length > 0}>
                      <ul class="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
                        <For each={entry.bullets}>{(b) => <li>{b}</li>}</For>
                      </ul>
                    </Show>
                    <p class="mt-4">
                      <a
                        class="font-mono text-[11px] uppercase tracking-[0.14em] text-primary underline-offset-4 hover:underline"
                        href={entry.docsUrl}
                      >
                        Full entry on docs →
                      </a>
                    </p>
                  </div>
                </li>
              )}
            </For>
          </ol>
        </Show>
      </main>
      <SiteFooter />
    </>
  );
}
