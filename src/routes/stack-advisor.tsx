import { A } from "@solidjs/router";
import { Meta, Title } from "@solidjs/meta";
import { SiteFooter } from "~/components/site-footer";
import { StackAdvisorEmbed } from "~/components/StackAdvisor";
import { Button } from "~/components/ui/button";

const STANDALONE_URL = "https://dev-centr.github.io/stack-advisor/";

export default function StackAdvisorPage() {
  return (
    <>
      <Title>Stack Advisor · DevCentr</Title>
      <Meta
        name="description"
        content="Pick a host, target, language, and toolchain stack. A sample path is preloaded; clear levels freely. Same SDL definitions as DevCentr desktop."
      />
      <div class="mx-auto max-w-7xl px-6 pb-12 pt-2 md:px-10">
        <header class="mb-10 md:mb-12">
          <p class="eyebrow mb-3 text-primary">Stack · Decide</p>
          <h1 class="font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Stack Advisor
          </h1>
          <p class="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Reach a stack decision—host, target, language, and toolchain.
            A sample path is preloaded; clear any level with × (cleared levels
            stay unconstrained). Grounded in the same SDL definitions as
            DevCentr desktop.
          </p>
          <div class="mt-6 flex flex-wrap gap-2">
            <Button
              as="a"
              href={STANDALONE_URL}
              target="_blank"
              rel="noopener noreferrer"
              class="rounded-md font-mono text-xs uppercase tracking-[0.16em]"
            >
              Open standalone app
            </Button>
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
              href="https://github.com/dev-centr/stack-advisor"
              target="_blank"
              variant="ghost"
              class="rounded-md font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground"
            >
              Definitions + app repo
            </Button>
          </div>
        </header>
        <StackAdvisorEmbed />
      </div>
      <SiteFooter />
    </>
  );
}
