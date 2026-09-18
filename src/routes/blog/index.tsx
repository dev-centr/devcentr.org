import { For } from "solid-js";
import { A } from "@solidjs/router";
import { Meta, Title } from "@solidjs/meta";

import { SiteFooter } from "~/components/site-footer";
import { getPosts } from "~/lib/blog";

export default function BlogIndex() {
  const posts = getPosts();

  return (
    <>
      <Title>Blog — DevCentr</Title>
      <Meta
        name="description"
        content="DevCentr Blog — craft, investigations, and orientations that are not News-desk releases."
      />
      <Meta name="keywords" content="DevCentr, blog, essay, craft, tooling" />
      <main class="mx-auto max-w-6xl px-6 pb-24 pt-6 md:px-10 md:pt-10">
        <p class="eyebrow text-primary">Thinking</p>
        <h1 class="mt-3 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">Blog</h1>
        <p class="mt-4 max-w-2xl text-muted-foreground">
          Craft notes, investigations, and tool orientations — things that are not official News yet.
          Releases and partnerships live on{" "}
          <a class="text-primary underline-offset-4 hover:underline" href="/news">
            News
          </a>
          . Day-to-day shipping notes live on the{" "}
          <a class="text-primary underline-offset-4 hover:underline" href="/changelog">
            Changelog
          </a>
          . Subscribe via{" "}
          <a class="text-primary underline-offset-4 hover:underline" href="/blog/rss.xml">
            RSS
          </a>{" "}
          or{" "}
          <a class="text-primary underline-offset-4 hover:underline" href="/blog/atom.xml">
            Atom
          </a>
          .
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
      <SiteFooter />
    </>
  );
}