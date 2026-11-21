import { CatalogGate } from "~/components/catalog-gate";

const panes = [
  {
    id: "products",
    label: "Products",
    blurb: "Desktop apps, command-line tools, and generators you install and run locally.",
    href: "/apps/products",
    tone: "from-primary/25 via-transparent to-transparent",
  },
  {
    id: "services",
    label: "Services",
    blurb: "Hosted web tools for browsing packages, publishing releases, and running cloud workflows.",
    href: "/apps/services",
    tone: "from-foreground/10 via-transparent to-transparent",
  },
] as const;

export default function AppsGate() {
  return (
    <CatalogGate
      eyebrow="Apps"
      title="Apps"
      intro="Choose between locally installed products and hosted web services."
      panes={[...panes]}
    />
  );
}