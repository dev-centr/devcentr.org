import { CatalogPage } from "~/components/catalog-page";
import { products } from "~/lib/apps-catalog";

export default function ProductsCatalog() {
  return (
    <CatalogPage
      title="Products"
      eyebrow="Products"
      intro="Installable and shippable tools. Each entry links to its product site or idea page when several repos share one story."
      items={products}
    />
  );
}
