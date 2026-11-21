import { Meta, Title } from "@solidjs/meta";
import { ExtensionsStore } from "~/components/extensions-store";
import { PageTrail } from "~/components/page-trail";
import { SiteFooter } from "~/components/site-footer";
import { publishedEntries } from "~/lib/local-extensions";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "DevCentr extensions store",
  url: "https://devcentr.org/extensions",
  description: "Browse and install DevCentr extensions. Rules templates are one kind. Install records a pointer.",
  isPartOf: { "@type": "WebSite", name: "DevCentr", url: "https://devcentr.org" },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: publishedEntries().map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareSourceCode",
        name: entry.name,
        description: entry.description,
        codeRepository: entry.repository,
        url: entry.install.pointer,
      },
    })),
  },
};

export default function ExtensionsPage() {
  return (
    <>
      <Title>Extensions store · DevCentr</Title>
      <Meta
        name="description"
        content="Browse the DevCentr extensions store. Rules templates are a section of the catalog. Install saves a link to the source file."
      />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <main class="mx-auto w-full max-w-6xl flex-1 px-6 pb-16 pt-6 md:px-10">
        <PageTrail crumbs={[{ label: "DevCentr", href: "/" }, { label: "Extensions store" }]} />
        <div class="mt-6">
          <ExtensionsStore />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
