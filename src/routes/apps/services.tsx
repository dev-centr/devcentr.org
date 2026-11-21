import { CatalogPage } from "~/components/catalog-page";
import { services } from "~/lib/apps-catalog";

export default function ServicesCatalog() {
  return (
    <CatalogPage
      title="Services"
      eyebrow="Services"
      intro="Hosted web services across the ecosystem, including PackageHub for browsing packages and pkgpublish for managing releases."
      items={services}
      trail={[
        { label: "Assets", href: "/assets" },
        { label: "Apps", href: "/apps" },
        { label: "Services" },
      ]}
    />
  );
}