import { CatalogPage } from "~/components/catalog-page";
import { services } from "~/lib/apps-catalog";

export default function ServicesCatalog() {
  return (
    <CatalogPage
      title="Services"
      eyebrow="Services"
      intro="Hosted experiences. PackageHub is the public browse face; pkgpublish is the publisher console. They stay separate on purpose."
      items={services}
    />
  );
}
