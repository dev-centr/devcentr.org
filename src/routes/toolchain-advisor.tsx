import { A } from "@solidjs/router";
import { ToolchainAdvisor } from "~/components/ToolchainAdvisor";
import { Button } from "~/components/ui/button";

export default function ToolchainAdvisorPage() {
  return (
    <div class="arch-surface relative min-h-dvh">
      <div class="relative z-10 mx-auto max-w-7xl px-6 py-10 md:px-12 md:py-14">
        <header class="mb-10 md:mb-14">
          <p class="arch-eyebrow mb-3">Toolchain · Decision flow</p>
          <div class="arch-rule mb-6" />
          <h1 class="font-display text-3xl font-medium tracking-tight text-foreground/92 md:text-4xl">
            Toolchain Advisor
          </h1>
          <p class="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Choose host, target, language, and toolchain on the left. The context panel shows history,
            comparisons, and guidance from the same SDL definitions as DevCentr desktop (synced via git).
          </p>
          <div class="mt-6 flex flex-wrap gap-2">
            <Button
              as={A}
              href="/"
              variant="outline"
              class="rounded-sm border-border/60 font-mono text-xs uppercase tracking-[0.18em]"
            >
              Home
            </Button>
            <Button
              as="a"
              href="https://github.com/dev-centr/toolchain-advisor"
              target="_blank"
              variant="ghost"
              class="rounded-sm font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground"
            >
              Definitions repo
            </Button>
          </div>
        </header>
        <ToolchainAdvisor />
      </div>
    </div>
  );
}
