import { Meta, Title } from "@solidjs/meta";

import { SiteFooter } from "~/components/site-footer";
import { SLACK_INVITE_URL } from "~/lib/site-links";

const secondary = [
  {
    href: "/status",
    label: "Status",
    detail: "Live probes of public services",
  },
  {
    href: SLACK_INVITE_URL,
    label: "Slack",
    detail: "DevCentr community workspace",
  },
  {
    href: "https://github.com/dev-centr/devcentr/issues",
    label: "GitHub Issues",
    detail: "Bugs and feature requests",
  },
  {
    href: "https://github.com/orgs/dev-centr/discussions",
    label: "Discussions",
    detail: "Questions and community Q&A",
  },
] as const;

export default function HelpPage() {
  return (
    <>
      <Title>Help · DevCentr</Title>
      <Meta
        name="description"
        content="Find DevCentr help — documentation for self-serve answers, or contact support when you need a human."
      />
      <Meta name="keywords" content="DevCentr, help, support, docs, documentation, contact" />
      <main class="mx-auto max-w-6xl px-6 pb-10 pt-6 md:px-10 md:pt-10">
        <p class="eyebrow text-primary">Help</p>
        <h1 class="mt-3 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          How can we help?
        </h1>
        <p class="mt-4 max-w-2xl text-muted-foreground">
          Start with self-serve docs when you can. Reach out for support when something needs a person — a dedicated
          desk is on the way.
        </p>

        <section class="mt-14" aria-labelledby="help-paths-heading">
          <h2 id="help-paths-heading" class="sr-only">
            Primary paths
          </h2>
          <ul class="divide-y divide-border/70 border-y border-border/70">
            <li>
              <a
                href="https://docs.devcentr.org"
                class="group flex flex-col gap-2 py-8 no-underline transition-colors sm:flex-row sm:items-baseline sm:justify-between sm:gap-10"
              >
                <div class="min-w-0">
                  <p class="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">Self-help</p>
                  <p class="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground group-hover:text-primary md:text-3xl">
                    Documentation
                  </p>
                  <p class="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    Guides, reference, and architecture at docs.devcentr.org — the fastest path for how-to and
                    product knowledge.
                  </p>
                </div>
                <span class="shrink-0 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground group-hover:text-primary">
                  Open docs →
                </span>
              </a>
            </li>
            <li id="support">
              <div class="group flex flex-col gap-2 py-8 sm:flex-row sm:items-baseline sm:justify-between sm:gap-10">
                <div class="min-w-0">
                  <p class="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Support</p>
                  <p class="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                    <a
                      href="mailto:support@devcentr.org"
                      class="text-foreground no-underline transition-colors hover:text-primary"
                    >
                      Contact support
                    </a>
                  </p>
                  <p class="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    Email{" "}
                    <a
                      href="mailto:support@devcentr.org"
                      class="font-medium text-foreground underline decoration-primary/50 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
                    >
                      support@devcentr.org
                    </a>{" "}
                    for now. A dedicated support system (tickets and assisted help) is coming later.
                  </p>
                </div>
                <a
                  href="mailto:support@devcentr.org"
                  class="shrink-0 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground no-underline transition-colors hover:text-primary"
                >
                  support@devcentr.org
                </a>
              </div>
            </li>
          </ul>
        </section>

        <section class="mt-16" aria-labelledby="more-help-heading">
          <p class="eyebrow">Also useful</p>
          <h2 id="more-help-heading" class="mt-3 font-display text-2xl font-semibold tracking-tight md:text-3xl">
            More ways to get unstuck
          </h2>
          <ul class="mt-10 divide-y divide-border/70 border-y border-border/70">
            {secondary.map((item) => {
              const external = item.href.startsWith("http") || item.href.startsWith("mailto:");
              return (
                <li>
                  <a
                    href={item.href}
                    class="group flex flex-col gap-1 py-5 no-underline transition-colors sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                    target={external && item.href.startsWith("http") ? "_blank" : undefined}
                    rel={external && item.href.startsWith("http") ? "noreferrer" : undefined}
                  >
                    <span class="font-display text-lg font-semibold tracking-tight text-foreground group-hover:text-primary md:text-xl">
                      {item.label}
                    </span>
                    <span class="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                      {item.detail}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
