import { Meta, Title } from "@solidjs/meta";
import { PageTrail } from "~/components/page-trail";
import { SiteFooter } from "~/components/site-footer";

export default function DemosIndex() {
  return (
    <>
      <Title>Demos · DevCentr</Title>
      <Meta name="description" content="Previews and interactive demos of DevCentr tools and interface concepts." />
      <main class="mx-auto w-full max-w-6xl flex-1 px-6 pb-16 pt-6 md:px-10">
        <PageTrail crumbs={[{ label: "DevCentr", href: "/" }, { label: "Demos" }]} />
        <h1 class="mt-4 font-display text-4xl font-semibold tracking-tight">Demos</h1>
        <p class="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Interactive prototypes and static previews of DevCentr tools and interface concepts.
        </p>
        <ul class="mt-10 divide-y divide-border/70 border-y border-border/70">
          <li>
            <a href="/demos/rules-templates" class="block py-6 no-underline">
              <span class="font-display text-xl font-semibold">Rules templates</span>
              <p class="mt-2 max-w-xl text-sm text-muted-foreground">
                Static preview of the Rules panel in Orchestrator, showing local templates and the link to install more.
              </p>
            </a>
          </li>
        </ul>
      </main>
      <SiteFooter />
    </>
  );
}
