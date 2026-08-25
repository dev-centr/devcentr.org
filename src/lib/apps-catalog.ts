export type CatalogItem = {
  id: string;
  name: string;
  summary: string;
  href: string;
  external?: boolean;
  ideaSlug?: string;
};

export type IdeaPage = {
  slug: string;
  title: string;
  category: "products" | "services" | "standards";
  overview: string;
  repos: { name: string; summary: string; href: string }[];
};

export const products: CatalogItem[] = [
  {
    id: "devcentr",
    name: "DevCentr",
    summary: "Flagship Development Orchestration Suite (DOS).",
    href: "https://devcentr.app",
    external: true,
  },
  {
    id: "equivalence-engine",
    name: "Equivalence Engine",
    summary: "DAG-based adaptation across code, paths, and CLI installs.",
    href: "/ideas/equivalence-engine",
    ideaSlug: "equivalence-engine",
  },
  {
    id: "pathman",
    name: "Pathman",
    summary: "Windows PATH management CLI.",
    href: "https://github.com/dev-centr/pathman",
    external: true,
  },
  {
    id: "msi-generator",
    name: "MSI Generator",
    summary: "Cross-platform MSI/MSIX packaging in D.",
    href: "https://github.com/dev-centr/msi-installer-generator",
    external: true,
  },
  {
    id: "github-actions-editor",
    name: "GitHub Actions Editor",
    summary: "Visual editor for GitHub Actions workflows.",
    href: "https://github.com/dev-centr/github-actions-editor",
    external: true,
  },
  {
    id: "repo-drive",
    name: "RepoDrive",
    summary: "Virtual filesystem for forge repos with catalog, schema, and tray.",
    href: "https://github.com/dev-centr/repo-drive",
    external: true,
  },
  {
    id: "issues-browser",
    name: "Issues Browser",
    summary: "Local three-pane browser for issues, PRs, and discussions.",
    href: "https://github.com/dev-centr/issues-browser",
    external: true,
  },
  {
    id: "rules-manager",
    name: "Rules Manager",
    summary: "Tray UI and daemon that compose workstation agent-rules.",
    href: "https://github.com/dev-centr/rules-manager",
    external: true,
  },
  {
    id: "fixnow-dev",
    name: "FixNow.dev",
    summary: "Put ignored high-value issues on a public countdown clock.",
    href: "https://github.com/dev-centr/fixnow-dev",
    external: true,
  },
  {
    id: "prohelp",
    name: "Prohelp",
    summary: "Structured CLI help library and tooling.",
    href: "https://github.com/openshellorg/prohelp",
    external: true,
  },
  {
    id: "resting-lanczos",
    name: "resting-lanczos",
    summary: "Crisp responsive images: Lanczos tiers + srcset + transform (comparison demo).",
    href: "/resting-lanczos",
  },
];

export const services: CatalogItem[] = [
  {
    id: "packagehub",
    name: "PackageHub",
    summary: "Public storefront — find and browse packages.",
    href: "https://packagehub.dev",
    external: true,
  },
  {
    id: "pkgpublish",
    name: "pkgpublish",
    summary: "Publisher console — configure targets and ship packages.",
    href: "https://pkgpublish.dev",
    external: true,
  },
];

export const standards: CatalogItem[] = [
  {
    id: "centrmark",
    name: "CentrMark",
    summary: "Literate markup for Synchronous Literate Programming.",
    href: "https://github.com/dev-centr/centrmark",
    external: true,
  },
];

export const ideas: IdeaPage[] = [
  {
    slug: "equivalence-engine",
    title: "Equivalence Engine",
    category: "products",
    overview:
      "Rule-driven equivalence across software versions, filesystem intents, and CLI install contexts. One engine resolves shortest-path adaptations from SDL rulesets so DevCentr and CI can migrate code, map paths, and provision tools consistently.",
    repos: [
      {
        name: "equivalence-engine",
        summary: "Core CLI — domains: code, filesystem, cli.",
        href: "https://github.com/dev-centr/equivalence-engine",
      },
      {
        name: "libequivalence",
        summary: "D library for rule loading and resolution.",
        href: "https://github.com/dev-centr/libequivalence",
      },
      {
        name: "equivalence-rules-code",
        summary: "Code migration rules (e.g. PyQt, Astro).",
        href: "https://github.com/dev-centr/equivalence-rules-code",
      },
      {
        name: "equivalence-rules-filesystem",
        summary: "Cross-OS path equivalency rules.",
        href: "https://github.com/dev-centr/equivalence-rules-filesystem",
      },
      {
        name: "equivalence-rules-cli",
        summary: "CLI tool install catalog for DevCentr.",
        href: "https://github.com/dev-centr/equivalence-rules-cli",
      },
      {
        name: "equivalence-engine-action",
        summary: "GitHub Action to run adaptations in CI.",
        href: "https://github.com/dev-centr/equivalence-engine-action",
      },
    ],
  },
];

export function getIdea(slug: string) {
  return ideas.find((i) => i.slug === slug);
}
