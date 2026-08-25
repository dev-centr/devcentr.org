import { A } from "@solidjs/router";
import { Meta, Title } from "@solidjs/meta";
import { SiteFooter } from "~/components/site-footer";
import { ToolchainAdvisor } from "~/components/ToolchainAdvisor";
import { Button } from "~/components/ui/button";

export default function ToolchainBrowserPage() {
  return (
    <>
      <Title>Toolchain Browser · DevCentr</Title>
      <Meta
        name="description"
        content="Browse host, target, language, and toolchain. Advice is built into the flow—same SDL definitions as DevCentr desktop."
      />
      <div class="mx-auto max-w-7xl px-6 pb-12 pt-2 md:px-10">
        <header class="mb-10 md:mb-12">
          <p class="eyebrow mb-3 text-primary">Toolchain · Browse</p>
          <h1 class="font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Toolchain Browser
          </h1>
          <p class="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Browse host, target, language, and toolchain. Advice is a feature of the browser—grounded in the same SDL
            definitions as DevCentr desktop.
          </p>
          <div class="mt-6 flex flex-wrap gap-2">
            <Button
              as={A}
              href="/"
              variant="outline"
              class="rounded-md border-border/70 font-mono text-xs uppercase tracking-[0.16em]"
            >
              Home
            </Button>
            <Button
              as="a"
              href="https://github.com/dev-centr/toolchain-advisor"
              target="_blank"
              variant="ghost"
              class="rounded-md font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground"
            >
              Definitions repo
            </Button>
          </div>
        </header>
        <ToolchainAdvisor />
      </div>
      <SiteFooter />
    </>
  );
}
