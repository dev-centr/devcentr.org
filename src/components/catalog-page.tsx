import { For, Show } from "solid-js";

import type { CatalogItem } from "~/lib/apps-catalog";
import { PageTrail } from "~/components/page-trail";
import { SiteFooter } from "~/components/site-footer";

export function CatalogPage(props: {
  title: string;
  eyebrow: string;
  intro: string;
  items: CatalogItem[];
}) {
  return (
    <>
      <main class="mx-auto max-w-6xl px-6 pb-20 pt-6 md:px-10 md:pb-28">
        <PageTrail crumbs={[{ label: "Apps", href: "/apps" }, { label: props.eyebrow }]} />
        <h1 class="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">{props.title}</h1>
        <p class="mt-4 max-w-2xl text-muted-foreground">{props.intro}</p>

        <ul class="mt-14 divide-y divide-border/70 border-y border-border/70">
          <For each={props.items}>
            {(item) => (
              <li>
                <a
                  href={item.href}
                  class="group flex flex-col gap-3 py-8 no-underline transition-colors sm:flex-row sm:items-center sm:justify-between sm:gap-10"
                  {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <div class="flex min-w-0 items-start gap-4">
                    <Show when={item.logo}>
                      <img
                        src={item.logo}
                        alt=""
                        width={40}
                        height={40}
                        class="mt-0.5 size-10 shrink-0 rounded-md object-contain"
                      />
                    </Show>
                    <div>
                      <span class="font-display text-xl font-semibold tracking-tight text-foreground group-hover:text-primary md:text-2xl">
                        {item.name}
                      </span>
                      <p class="mt-2 max-w-xl text-sm text-muted-foreground md:text-base">{item.summary}</p>
                    </div>
                  </div>
                  <span class="shrink-0 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                    {item.ideaSlug ? "Idea page" : item.external ? "Open" : "View"} →
                  </span>
                </a>
              </li>
            )}
          </For>
        </ul>
      </main>
      <SiteFooter />
    </>
  );
}
