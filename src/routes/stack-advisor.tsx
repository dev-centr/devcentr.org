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
        content="Choose a compatible host, target, language, and toolchain stack. Start from the sample path or filter freely using the same SDL definitions as Orchestrator."
      />
      <div class="mx-auto max-w-7xl px-6 pb-12 pt-2 md:px-10">
        <header class="mb-10 md:mb-12">
          <p class="eyebrow mb-3 text-primary">Stack · Decide</p>
          <h1 class="font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Stack Advisor
          </h1>
          <p class="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Choose a compatible host, target, language, and toolchain stack. A sample path is loaded
            to get you started: remove any step with × or add a new one with +. Unselected steps
            stay open, backed by the same SDL definitions that power Orchestrator.
          </p>
          <div class="mt-6 flex flex-wrap gap-2">
            <Button
              as="a"
              href={STANDALONE_URL}
              target="_blank"
              rel="noopener noreferrer"
              class="rounded-md"
            >
              Open standalone app
            </Button>
            <Button
              as={A}
              href="/"
              variant="outline"
              class="rounded-md border-border/70"
            >
              Home
            </Button>
            <Button
              as="a"
              href="https://github.com/dev-centr/stack-advisor"
              target="_blank"
              variant="ghost"
              class="rounded-md text-muted-foreground"
            >
              Definitions and source
            </Button>
          </div>
        </header>
        <StackAdvisorEmbed />
      </div>
      <SiteFooter />
    </>
  );
}
