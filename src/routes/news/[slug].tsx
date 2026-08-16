import { useParams } from "@solidjs/router";
import { createMemo, Show } from "solid-js";
import { Meta, Title } from "@solidjs/meta";

import { PageTrail } from "~/components/page-trail";
import { SiblingOwnershipDiagram } from "~/components/sibling-ownership-diagram";
import { SiteFooter } from "~/components/site-footer";
import { ToolchainArchitectureDiagram } from "~/components/toolchain-architecture-diagram";
import { getPost } from "~/lib/news";

export default function NewsPostPage() {
  const params = useParams();
  const post = createMemo(() => getPost(params.slug));
  const showToolchainDiagrams = createMemo(
    () => params.slug === "2026-07-28-partnering-with-openshellorg",
  );

  return (
    <>
      <Show when={post()} keyed>
        {(p) => (
          <>
            <Title>{`${p.title} · DevCentr News`}</Title>
            <Meta name="description" content={p.description || p.title} />
            <Meta name="keywords" content={[...(p.tags || []), "DevCentr", "news", "blog"].join(", ")} />
          </>
        )}
      </Show>
      <main class="mx-auto max-w-3xl px-6 pb-24 pt-6 md:px-10 md:pt-10">
        <Show
          when={post()}
          fallback={
            <div>
              <PageTrail crumbs={[{ label: "News", href: "/news" }, { label: "Not found" }]} />
              <h1 class="mt-4 font-display text-3xl font-semibold tracking-tight">Post not found</h1>
              <p class="mt-3 text-muted-foreground">That news entry does not exist.</p>
            </div>
          }
          keyed
        >
          {(p) => (
            <article>
              <PageTrail crumbs={[{ label: "News", href: "/news" }, { label: p.title }]} />
              <p class="eyebrow mt-3 text-primary">{p.date}</p>
              <h1 class="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                {p.title}
              </h1>
              <Show when={p.description}>
                <p class="mt-4 text-lg leading-relaxed text-muted-foreground">{p.description}</p>
              </Show>
              <div class="news-prose mt-10" innerHTML={p.html} />
              <Show when={showToolchainDiagrams()}>
                <div class="mt-12 space-y-10">
                  <ToolchainArchitectureDiagram />
                  <SiblingOwnershipDiagram />
                </div>
              </Show>
            </article>
          )}
        </Show>
      </main>
      <SiteFooter />
    </>
  );
}
