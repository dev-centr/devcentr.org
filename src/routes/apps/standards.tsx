import { CatalogPage } from "~/components/catalog-page";
import { standards } from "~/lib/apps-catalog";

export default function StandardsCatalog() {
  return (
    <CatalogPage
      title="Standards"
      eyebrow="Standards"
      intro="Formats and specifications DevCentr endorses—not products you install, not hosted dashboards."
      items={standards}
    />
  );
}
