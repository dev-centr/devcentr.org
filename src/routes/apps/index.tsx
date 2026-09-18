import { CatalogGate } from "~/components/catalog-gate";

const panes = [
  {
    id: "products",
    label: "Products",
    blurb: "Installable tools you run on a machine - apps, CLIs, and generators.",
    href: "/apps/products",
    tone: "from-primary/25 via-transparent to-transparent",
  },
  {
    id: "services",
    label: "Services",
    blurb: "Hosted surfaces - browse, publish, account-backed workflows.",
    href: "/apps/services",
    tone: "from-foreground/10 via-transparent to-transparent",
  },
] as const;

export default function AppsGate() {
  return (
    <CatalogGate
      eyebrow="Apps"
      title="Apps"
      intro="Pick products or services. Standards live under Assets, not here."
      panes={[...panes]}
    />
  );
}