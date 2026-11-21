import { Meta, Title } from "@solidjs/meta";
import { RulesEditor } from "~/components/rules-editor";
import { SiteFooter } from "~/components/site-footer";
import { PageTrail } from "~/components/page-trail";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "DevCentr rules editor",
  applicationCategory: "DeveloperApplication",
  url: "https://devcentr.org/rules",
  description: "Read rules templates installed on this computer and open the extensions store to add a link.",
  provider: { "@type": "Organization", name: "DevCentr", email: "support@devcentr.org", url: "https://devcentr.org" },
};

export default function RulesPage() {
  return (
    <>
      <Title>Rules editor · DevCentr</Title>
      <Meta
        name="description"
        content="The rules editor lists templates on this computer. Install more templates opens the extensions store and saves a link, not a copy of the file."
      />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <main class="mx-auto w-full max-w-6xl flex-1 px-6 pb-16 pt-6 md:px-10">
        <PageTrail crumbs={[{ label: "DevCentr", href: "/" }, { label: "Rules editor" }]} />
        <div class="mt-6">
          <RulesEditor />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
