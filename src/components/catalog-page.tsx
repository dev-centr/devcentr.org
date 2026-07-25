import type { CatalogItem } from "~/lib/apps-catalog";
import { SiteFooter } from "~/components/site-footer";
import { SiteHeader } from "~/components/site-header";

export function CatalogPage(props: {
  title: string;
  eyebrow: string;
  intro: string;
  items: CatalogItem[];
}) {
  return (
    <div class="plane-surface relative min-h-dvh">
      <div class="relative z-10">
        <SiteHeader />
        <main class="mx-auto max-w-6xl px-6 pb-20 pt-6 md:px-10 md:pb-28">
          <p class="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            <a href="/apps" class="hover:text-foreground">
              Apps
            </a>
            <span class="mx-2 opacity-40">/</span>
            {props.eyebrow}
          </p>
          <h1 class="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">{props.title}</h1>
          <p class="mt-4 max-w-2xl text-muted-foreground">{props.intro}</p>

          <ul class="mt-14 divide-y divide-border/70 border-y border-border/70">
            {props.items.map((item) => (
              <li>
                <a
                  href={item.href}
                  class="group flex flex-col gap-2 py-8 no-underline transition-colors sm:flex-row sm:items-baseline sm:justify-between sm:gap-10"
                  {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <div>
                    <span class="font-display text-xl font-semibold tracking-tight text-foreground group-hover:text-primary md:text-2xl">
                      {item.name}
                    </span>
                    <p class="mt-2 max-w-xl text-sm text-muted-foreground md:text-base">{item.summary}</p>
                  </div>
                  <span class="shrink-0 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                    {item.ideaSlug ? "Idea page" : item.external ? "Open" : "View"} →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
