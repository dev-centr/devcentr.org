import { A } from "@solidjs/router";
import { Meta, Title } from "@solidjs/meta";
import { SiteFooter } from "~/components/site-footer";
import { BootstrapProfiles } from "~/components/BootstrapProfiles";
import { Button } from "~/components/ui/button";

export default function TemplatesPage() {
  return (
    <>
      <Title>Bootstrap templates · DevCentr</Title>
      <Meta
        name="description"
        content="Named SDL bootstrap profiles for GitHub orgs and projects. Copy a name into Cursor with the bootstrap-org skill."
      />
      <div class="mx-auto max-w-7xl px-6 pb-12 pt-2 md:px-10">
        <header class="mb-10 md:mb-12">
          <p class="eyebrow mb-3 text-primary">Templates · Org &amp; project profiles</p>
          <h1 class="font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Bootstrap templates
          </h1>
          <p class="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Same profiles the Cursor <code>bootstrap-org</code> skill loads. Click a row, read the description, copy
            the name into a prompt. House default is SolidStart static + solid-ui unless the profile says otherwise.
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
              as={A}
              href="/toolchain-advisor"
              variant="ghost"
              class="rounded-md font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground"
            >
              Toolchain Advisor
            </Button>
            <Button
              as="a"
              href="https://github.com/dev-centr/agent-rules/tree/main/skills/bootstrap-org/profiles"
              target="_blank"
              variant="ghost"
              class="rounded-md font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground"
            >
              Source SDL
            </Button>
          </div>
        </header>
        <BootstrapProfiles />
      </div>
      <SiteFooter />
    </>
  );
}
