import { CatalogGate } from "~/components/catalog-gate";

const panes = [
  {
    id: "apps",
    label: "Apps",
    blurb: "Products you install and services you open in a browser.",
    href: "/apps",
    tone: "from-primary/25 via-transparent to-transparent",
  },
  {
    id: "standards",
    label: "Standards",
    blurb: "Specs and formats the ecosystem endorses and ships against.",
    href: "/assets/standards",
    tone: "from-accent-foreground/20 via-transparent to-transparent",
  },
] as const;

export default function AssetsGate() {
  return (
    <CatalogGate
      eyebrow="Catalog"
      title="Assets"
      intro="Apps and standards live here. Skills stay in the Assets menu beside them."
      panes={[...panes]}
    />
  );
}