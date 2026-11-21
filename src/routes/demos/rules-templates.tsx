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
        content="A picture of the DevCentr desktop rules panel. The list on the right is templates on this computer. This page does not edit rules."
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
          The rules editor is a page in the DevCentr desktop app. The picture below is that panel. The list on
          the right is Templates on this computer. Install more templates opens the extensions store in a
          browser. This page is only the picture. It does not edit rules.
        </p>
        <figure class="mt-8">
          <img
            src="/demos/rules-templates-hero.png"
            alt="A picture of the DevCentr desktop rules panel. Templates on this computer is on the right, with Install more templates. This page does not edit rules."
            width={1122}
            height={585}
            class="pointer-events-none w-full rounded-md border border-border/60"
          />
          <figcaption class="mt-3 text-sm text-muted-foreground">
            The desktop Rules page. You cannot edit rules from this picture.
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
