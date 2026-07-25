import { For } from "solid-js";
import { A } from "@solidjs/router";

import { SiteHeader } from "~/components/site-header";
import { getPosts } from "~/lib/blog";

export default function BlogIndex() {
  const posts = getPosts();

  return (
    <div class="plane-surface relative min-h-dvh">
      <div class="relative z-10">
        <SiteHeader />
        <main class="mx-auto max-w-6xl px-6 pb-24 pt-6 md:px-10 md:pt-10">
          <p class="eyebrow text-primary">Chronicle</p>
          <h1 class="mt-3 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">Blog</h1>
          <p class="mt-4 max-w-2xl text-muted-foreground">
            Initiatives, shipping notes, and news across Dev-Centr and related projects.
          </p>

          <ul class="mt-14 divide-y divide-border/70 border-y border-border/70">
            <For each={posts}>
              {(post) => (
                <li>
                  <A
                    href={`/blog/${post.slug}`}
                    class="group flex flex-col gap-2 py-8 no-underline transition-colors sm:flex-row sm:items-baseline sm:justify-between sm:gap-10"
                  >
                    <div class="min-w-0">
                      <h2 class="font-display text-xl font-semibold tracking-tight text-foreground group-hover:text-primary md:text-2xl">
                        {post.title}
                      </h2>
                      <p class="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{post.description}</p>
                    </div>
                    <time
                      datetime={post.date}
                      class="shrink-0 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground"
                    >
                      {post.date}
                    </time>
                  </A>
                </li>
              )}
            </For>
          </ul>
        </main>
      </div>
    </div>
  );
}
