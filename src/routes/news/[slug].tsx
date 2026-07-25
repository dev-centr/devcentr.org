import { A, useParams } from "@solidjs/router";
import { createMemo, Show } from "solid-js";
import { Meta, Title } from "@solidjs/meta";

import { SiteFooter } from "~/components/site-footer";
import { SiteHeader } from "~/components/site-header";
import { getPost } from "~/lib/news";

export default function NewsPostPage() {
  const params = useParams();
  const post = createMemo(() => getPost(params.slug));

  return (
    <div class="plane-surface relative min-h-dvh">
      <Show when={post()} keyed>
        {(p) => (
          <>
            <Title>{`${p.title} · DevCentr News`}</Title>
            <Meta name="description" content={p.description || p.title} />
            <Meta name="keywords" content={[...(p.tags || []), "DevCentr", "news", "blog"].join(", ")} />
          </>
        )}
      </Show>
      <div class="relative z-10">
        <SiteHeader />
        <main class="mx-auto max-w-3xl px-6 pb-24 pt-6 md:px-10 md:pt-10">
          <A
            href="/news"
            class="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground no-underline transition-colors hover:text-foreground"
          >
            ← News
          </A>

          <Show
            when={post()}
            fallback={
              <div class="mt-10">
                <h1 class="font-display text-3xl font-semibold tracking-tight">Post not found</h1>
                <p class="mt-3 text-muted-foreground">That news entry does not exist.</p>
              </div>
            }
            keyed
          >
            {(p) => (
              <article class="mt-8">
                <p class="eyebrow text-primary">{p.date}</p>
                <h1 class="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                  {p.title}
                </h1>
                <Show when={p.description}>
                  <p class="mt-4 text-lg leading-relaxed text-muted-foreground">{p.description}</p>
                </Show>
                <div class="news-prose mt-10" innerHTML={p.html} />
              </article>
            )}
          </Show>
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
