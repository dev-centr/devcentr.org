import { Meta, Title } from "@solidjs/meta";

import { DownloadCta } from "~/components/download-cta";
import { SiteFooter } from "~/components/site-footer";
import { DEVCENTR_DOWNLOADS, DEVCENTR_PORTABLE } from "~/lib/product-downloads";

const capabilities = [
  {
    n: "01",
    title: "Ecosystem Management",
    body: "Treat shells, toolchains, and environments like real project assets—author them, version them, and share them instead of chasing config files.",
  },
  {
    n: "02",
    title: "Visual Blueprints",
    body: "Interactive maps of your architecture and environments so you can see how the pieces connect.",
  },
  {
    n: "03",
    title: "AI Synergy Hub",
    body: "Share reliable project and environment context with your AI tools so suggestions match how your stack really runs.",
  },
  {
    n: "04",
    title: "Reproducible Workspaces",
    body: "Version your workspace setup so teammates get the same working environment—from local through the rest of the path.",
  },
  {
    n: "05",
    title: "DevOps",
    body: "CI/CD, infra, and traditional ops where they sit on the path—one facet of the suite, not the whole product.",
  },
] as const;

export default function Orchestrator() {
  return (
    <main>
      <Title>Orchestrator — DevCentr</Title>
      <Meta
        name="description"
        content="DevCentr Orchestrator is the Development Orchestration Suite: environments, toolchains, projects, and the ops around the code. You conduct. It orchestrates."
      />

      <section class="border-b border-border/60">
        <div class="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
          <p class="eyebrow text-primary">Development Orchestration Suite</p>
          <h1 class="mt-5 max-w-3xl font-display text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
            Orchestrator
          </h1>
          <p class="mt-6 max-w-xl font-display text-xl font-medium leading-snug tracking-tight text-foreground/90 md:text-2xl">
            Stop managing tools. Orchestrate ecosystems.
          </p>
          <p class="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground md:text-[1.05rem]">
            The suite for Windows, macOS, and Linux. You are the conductor. Orchestrator runs the environments,
            toolchains, projects, and the ops around them.
          </p>
          <div class="mt-10 flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-start">
            <DownloadCta
              label="Download"
              owner="dev-centr"
              repo="devcentr"
              downloads={DEVCENTR_DOWNLOADS}
              portables={DEVCENTR_PORTABLE}
              anchor="download"
            />
            <a
              href="https://docs.devcentr.org"
              class="inline-flex h-11 items-center justify-center rounded-md border border-border/80 bg-background/40 px-8 font-mono text-xs font-medium uppercase tracking-[0.16em] text-foreground backdrop-blur-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Explore the docs
            </a>
          </div>
        </div>
      </section>

      <section>
        <div class="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <p class="eyebrow">Capabilities</p>
          <h2 class="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight md:text-4xl">
            One suite. The whole lifecycle around the code.
          </h2>
          <p class="mt-4 max-w-2xl text-muted-foreground">
            DevOps is one facet of the suite—alongside environment orchestration, visual blueprints, and grounded AI
            context.
          </p>
          <ul class="mt-14 grid gap-10 md:grid-cols-2">
            {capabilities.map((c) => (
              <li class="border-t border-border/70 pt-6">
                <p class="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">{c.n}</p>
                <h3 class="mt-2 font-display text-xl font-semibold tracking-tight">{c.title}</h3>
                <p class="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">{c.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
