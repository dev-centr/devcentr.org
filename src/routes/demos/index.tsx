import { Meta, Title } from "@solidjs/meta";
import { PageTrail } from "~/components/page-trail";
import { SiteFooter } from "~/components/site-footer";

export default function DemosIndex() {
  return (
    <>
      <Title>Demos · DevCentr</Title>
      <Meta name="description" content="Interactive demos of DevCentr ideas, including the rules editor and extensions store." />
      <main class="mx-auto w-full max-w-6xl flex-1 px-6 pb-16 pt-6 md:px-10">
        <PageTrail crumbs={[{ label: "DevCentr", href: "/" }, { label: "Demos" }]} />
        <h1 class="mt-4 font-display text-4xl font-semibold tracking-tight">Demos</h1>
        <p class="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Short, working views of ideas you can try in the browser. Each demo says what it is for before the controls.
        </p>
        <ul class="mt-10 divide-y divide-border/70 border-y border-border/70">
          <li>
            <a href="/demos/rules-templates" class="block py-6 no-underline">
              <span class="font-display text-xl font-semibold">Rules templates</span>
              <p class="mt-2 max-w-xl text-sm text-muted-foreground">
                Keep a list of rules files as links, then browse the extensions store to add another link.
              </p>
            </a>
          </li>
        </ul>
      </main>
      <SiteFooter />
    </>
  );
}
