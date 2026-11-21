import { Meta, Title } from "@solidjs/meta";
import { GithubMark } from "~/components/github-mark";
import { PageTrail } from "~/components/page-trail";
import { SiteFooter } from "~/components/site-footer";

export default function RulesTemplatesDemo() {
  return (
    <>
      <Title>Rules templates · DevCentr</Title>
      <Meta
        name="description"
        content="Static preview of the Rules panel in Orchestrator, showing local rules templates and the extensions store link."
      />
      <main class="mx-auto w-full max-w-6xl flex-1 px-6 pb-16 pt-6 md:px-10">
        <PageTrail
          crumbs={[
            { label: "DevCentr", href: "/" },
            { label: "Demos", href: "/demos" },
            { label: "Rules templates" },
          ]}
        />
        <GithubMark href="https://github.com/dev-centr/devcentr.org" label="devcentr.org on GitHub" />
        <h1 class="mt-4 font-display text-4xl font-semibold tracking-tight">Rules templates</h1>
        <p class="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          In Orchestrator, the Rules panel manages the agent rules and templates installed on your
          machine, with a direct link to install more from the extensions store. Below is a static
          preview of that panel.
        </p>
        <figure class="mt-8">
          <img
            src="/demos/rules-templates-hero.png"
            alt="Screenshot of the Rules panel in Orchestrator, showing local templates in the sidebar and an Install more templates button."
            width={1122}
            height={585}
            class="pointer-events-none w-full rounded-md border border-border/60"
          />
          <figcaption class="mt-3 text-sm text-muted-foreground">
            The Rules panel inside Orchestrator.
          </figcaption>
        </figure>
        <p class="mt-8 text-sm">
          <a class="text-primary underline-offset-4 hover:underline" href="/extensions?type=rules-template">
            Browse rules templates
          </a>
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
