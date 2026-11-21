import { Meta, Title } from "@solidjs/meta";

import { DownloadCta } from "~/components/download-cta";
import { SiteFooter } from "~/components/site-footer";
import { DEVCENTR_DOWNLOADS, DEVCENTR_PORTABLE } from "~/lib/product-downloads";

const capabilities = [
  {
    n: "01",
    title: "Ecosystem Management",
    body: "Keep shells, runtimes, and toolchains with the project instead of buried in local dotfiles. Author, version, and share them like code.",
  },
  {
    n: "02",
    title: "Visual Blueprints",
    body: "Interactive maps of your architecture, dependencies, and environments so you can see how the system connects without digging through folders.",
  },
  {
    n: "03",
    title: "AI Synergy Hub",
    body: "Feed your coding agents the real state of your stack, rules, and environments so suggestions match how your project actually runs.",
  },
  {
    n: "04",
    title: "Reproducible Workspaces",
    body: "Commit the workspace definition alongside the repo. New teammates and CI runners land in the same working setup from local dev onward.",
  },
  {
    n: "05",
    title: "DevOps",
    body: "Pipelines, infrastructure, and deployment right where they meet the rest of the lifecycle, built in as one facet of the suite.",
  },
] as const;

export default function Orchestrator() {
  return (
    <main>
      <Title>Orchestrator — DevCentr</Title>
      <Meta
        name="description"
        content="DevCentr Orchestrator is the Development Orchestration Suite for Windows, macOS, and Linux. You conduct; Orchestrator runs the environments, toolchains, workspaces, AI context, and ops."
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
            One desktop suite for Windows, macOS, and Linux. You conduct, and Orchestrator handles the
            environments, toolchains, workspaces, AI context, and ops around your code.
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
              class="inline-flex h-11 items-center justify-center rounded-md border border-border/80 bg-background/40 px-8 font-mono text-xs font-medium caps tracking-[0.16em] text-foreground backdrop-blur-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Read the docs
            </a>
          </div>
        </div>
      </section>

      <section>
        <div class="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <p class="eyebrow">Capabilities</p>
          <h2 class="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight md:text-4xl">
            One suite for everything around the code.
          </h2>
          <p class="mt-4 max-w-2xl text-muted-foreground">
            DevOps belongs inside the workflow alongside environment management, visual architecture, and shared
            AI context.
          </p>
          <ul class="mt-14 grid gap-10 md:grid-cols-2">
            {capabilities.map((c) => (
              <li class="border-t border-border/70 pt-6">
                <p class="font-mono text-[11px] caps tracking-[0.18em] text-primary">{c.n}</p>
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
