import { For, Show } from "solid-js";
import { useParams } from "@solidjs/router";

import { SiteFooter } from "~/components/site-footer";
import { PageTrail } from "~/components/page-trail";
import { catalogItemForIdea, categoryLabel, getIdea } from "~/lib/apps-catalog";

export default function IdeaPage() {
  const params = useParams();
  const idea = () => getIdea(params.slug ?? "");
  const catalogItem = () => catalogItemForIdea(params.slug ?? "");

  return (
    <>
      <main class="mx-auto max-w-6xl px-6 pb-20 pt-6 md:px-10 md:pb-28">
        <Show
          when={idea()}
          fallback={
            <div>
              <PageTrail crumbs={[{ label: "Apps", href: "/apps" }, { label: "Not found" }]} />
              <h1 class="mt-4 font-display text-3xl font-semibold">Idea not found</h1>
              <p class="mt-4 text-muted-foreground">
                <a href="/apps" class="text-primary underline-offset-4 hover:underline">
                  Back to Apps
                </a>
              </p>
            </div>
          }
        >
          {(i) => (
            <>
              <PageTrail
                crumbs={[
                  { label: "Apps", href: "/apps" },
                  {
                    label: categoryLabel[i().category],
                    href: `/apps/${i().category}`,
                  },
                  { label: i().title },
                ]}
              />
              <Show when={catalogItem()?.tags}>
                <p class="eyebrow mt-3 text-primary">{catalogItem()?.tags}</p>
              </Show>
              <div class="mt-4 flex items-center gap-4">
                <Show when={catalogItem()?.logo}>
                  <img
                    src={catalogItem()?.logo}
                    alt=""
                    width={48}
                    height={48}
                    class="size-12 shrink-0 rounded-md object-contain"
                  />
                </Show>
                <h1 class="font-display text-4xl font-semibold tracking-tight md:text-5xl">{i().title}</h1>
              </div>
              <p class="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {i().overview}
              </p>

              <h2 class="mt-16 font-display text-2xl font-semibold tracking-tight">Repositories</h2>
              <ul class="mt-8 divide-y divide-border/70 border-y border-border/70">
                <For each={i().repos}>
                  {(repo) => (
                    <li class="py-8">
                      <a href={repo.href} target="_blank" rel="noopener noreferrer" class="group no-underline">
                        <h3 class="font-display text-xl font-semibold tracking-tight text-foreground group-hover:text-primary">
                          {repo.name}
                        </h3>
                        <p class="mt-2 max-w-xl text-sm text-muted-foreground md:text-base">{repo.summary}</p>
                        <p class="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                          GitHub →
                        </p>
                      </a>
                    </li>
                  )}
                </For>
              </ul>
            </>
          )}
        </Show>
      </main>
      <SiteFooter />
    </>
  );
}
