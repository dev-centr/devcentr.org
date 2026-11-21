import { CatalogGate } from "~/components/catalog-gate";

const panes = [
  {
    id: "apps",
    label: "Apps",
    blurb: "Installable tools and hosted web services built across DevCentr.",
    href: "/apps",
    tone: "from-primary/25 via-transparent to-transparent",
  },
  {
    id: "standards",
    label: "Standards",
    blurb: "Open specifications and formats supported across the ecosystem.",
    href: "/assets/standards",
    tone: "from-accent-foreground/20 via-transparent to-transparent",
  },
] as const;

export default function AssetsGate() {
  return (
    <CatalogGate
      eyebrow="Catalog"
      title="Assets"
      intro="Browse DevCentr apps, hosted services, and open standards."
      panes={[...panes]}
    />
  );
}