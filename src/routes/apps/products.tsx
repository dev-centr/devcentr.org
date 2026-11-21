import { CatalogPage } from "~/components/catalog-page";
import { products } from "~/lib/apps-catalog";

export default function ProductsCatalog() {
  return (
    <CatalogPage
      title="Products"
      eyebrow="Products"
      intro="Desktop applications, CLIs, and developer tools you can install locally. Multi-repository projects link to an overview page."
      items={products}
      trail={[
        { label: "Assets", href: "/assets" },
        { label: "Apps", href: "/apps" },
        { label: "Products" },
      ]}
    />
  );
}