import { useParams } from "@solidjs/router";
import { createMemo, Show } from "solid-js";
import { Meta, Title } from "@solidjs/meta";

import { PageTrail } from "~/components/page-trail";
import { SiteFooter } from "~/components/site-footer";
import { ThemedNewsContent } from "~/components/themed-news-content";
import { getPost } from "~/lib/blog";

export default function BlogPostPage() {
  const params = useParams();
  const post = createMemo(() => getPost(params.slug));

  return (
    <>
      <Show when={post()} keyed>
        {(p) => (
          <>
            <Title>{`${p.title} — DevCentr Blog`}</Title>
            <Meta name="description" content={p.description || p.title} />
            <Meta name="keywords" content={[...(p.tags || []), "DevCentr", "blog"].join(", ")} />
          </>
        )}
      </Show>
      <main class="mx-auto max-w-3xl px-6 pb-24 pt-6 md:px-10 md:pt-10">
        <Show
          when={post()}
          fallback={
            <div>
              <PageTrail crumbs={[{ label: "Blog", href: "/blog" }, { label: "Not found" }]} />
              <h1 class="mt-4 font-display text-3xl font-semibold tracking-tight">Post not found</h1>
              <p class="mt-3 text-muted-foreground">That blog entry does not exist.</p>
            </div>
          }
          keyed
        >
          {(p) => (
            <article>
              <PageTrail crumbs={[{ label: "Blog", href: "/blog" }, { label: p.title }]} />
              <p class="eyebrow mt-3 text-primary">{p.date}</p>
              <h1 class="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                {p.title}
              </h1>
              <Show when={p.description}>
                <p class="mt-4 text-lg leading-relaxed text-muted-foreground">{p.description}</p>
              </Show>
              <ThemedNewsContent html={p.html} />
            </article>
          )}
        </Show>
      </main>
      <SiteFooter />
    </>
  );
}