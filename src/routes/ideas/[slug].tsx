import { useParams } from "@solidjs/router";
import { For, Show } from "solid-js";
import { SiteFooter } from "~/components/site-footer";
import { getIdea } from "~/lib/apps-catalog";

export default function IdeaPage() {
  const params = useParams();
  const idea = () => getIdea(params.slug ?? "");

  return (
    <>
      <main class="mx-auto max-w-6xl px-6 pb-20 pt-6 md:px-10 md:pb-28">
        <Show
          when={idea()}
          fallback={
            <div>
              <h1 class="font-display text-3xl font-semibold">Idea not found</h1>
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
              <p class="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                <a href="/apps" class="hover:text-foreground">
                  Apps
                </a>
                <span class="mx-2 opacity-40">/</span>
                <a href={`/apps/${i().category}`} class="hover:text-foreground">
                  {i().category}
                </a>
                <span class="mx-2 opacity-40">/</span>
                Idea
              </p>
              <h1 class="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">{i().title}</h1>
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
