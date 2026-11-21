import { CatalogPage } from "~/components/catalog-page";
import { standards } from "~/lib/apps-catalog";

export default function StandardsCatalog() {
  return (
    <CatalogPage
      title="Standards"
      eyebrow="Standards"
      intro="Open formats and specifications that DevCentr tools implement and support."
      items={standards}
      trail={[
        { label: "Assets", href: "/assets" },
        { label: "Standards" },
      ]}
    />
  );
}