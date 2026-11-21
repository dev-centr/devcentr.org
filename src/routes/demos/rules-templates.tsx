import { Meta, Title } from "@solidjs/meta";
import { GithubMark } from "~/components/github-mark";
import { PageTrail } from "~/components/page-trail";
import { RulesEditor } from "~/components/rules-editor";
import { SiteFooter } from "~/components/site-footer";

export default function RulesTemplatesDemo() {
  return (
    <>
      <Title>Rules templates demo · DevCentr</Title>
      <Meta
        name="description"
        content="Try the rules editor: a list of template links on the right, and a button that opens the extensions store."
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
          People copy rules out of repositories by hand. This editor keeps the link instead. The list on the right
          is what is already on this computer. Install more templates opens the extensions store, where a rules
          template is one kind of extension. Installing adds the link. The file stays in the repository.
        </p>
        <figure class="mt-8">
          <img
            src="/demos/rules-templates-hero.png"
            alt="The rules editor with the template list on the right and Install more templates."
            width={1122}
            height={585}
            class="pointer-events-none w-full rounded-md border border-border/60"
          />
        </figure>
        <div class="mt-10">
          <RulesEditor />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
