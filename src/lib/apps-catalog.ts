export type CatalogCategory = "products" | "services" | "standards";

export type CatalogItem = {
  id: string;
  name: string;
  summary: string;
  href: string;
  external?: boolean;
  ideaSlug?: string;
  /** Public URL of an existing product mark; omit when none exists. */
  logo?: string;
  /** Topic tags (not a breadcrumb). Example: "Tooling · Image pipeline". */
  tags?: string;
};

export type IdeaPage = {
  slug: string;
  title: string;
  category: CatalogCategory;
  overview: string;
  repos: { name: string; summary: string; href: string }[];
};

export const categoryLabel: Record<CatalogCategory, string> = {
  products: "Products",
  services: "Services",
  standards: "Standards",
};

export const products: CatalogItem[] = [
  {
    id: "repolab",
    name: "RepoLab",
    summary: "One browser frontend for GitHub, other git hosts, and other VCS backends.",
    href: "https://repolab.dev",
    external: true,
    tags: "Tooling · Version control",
  },
  {
    id: "uniconfig",
    name: "UniConfig Config Panel",
    summary:
      "Schema-driven Control Panel for config files that never grew a settings UI.",
    href: "/ideas/uniconfig",
    ideaSlug: "uniconfig",
    logo: "/apps/logos/uniconfig.svg",
    tags: "Tooling · Config",
  },
  {
    id: "devcentr",
    name: "DevCentr",
    summary: "Flagship Development Orchestration Suite (DOS).",
    href: "https://devcentr.app",
    external: true,
    logo: "/brand/logo-on-dark.svg",
  },
  {
    id: "equivalence-engine",
    name: "Equivalence Engine",
    summary: "DAG-based adaptation across code, paths, and CLI installs.",
    href: "/ideas/equivalence-engine",
    ideaSlug: "equivalence-engine",
    logo: "/apps/logos/equivalence-engine.svg",
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
    tags: "Tooling · Image pipeline",
  },
  {
    id: "stack-advisor",
    name: "Stack Advisor",
    summary:
      "Reach a host · target · language · toolchain stack. Guided path or DIY filters; browse and advice are modes.",
    href: "/stack-advisor",
    tags: "Tooling · Toolchains",
  },
  {
    id: "uniprovider",
    name: "UniProvider",
    summary:
      "Local Open Provider Registry reference implementation — discover on-disk manifests + well-known runners; localhost aggregator.",
    href: "/ideas/uniprovider",
    ideaSlug: "uniprovider",
    tags: "Tooling · Inference",
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
  {
    id: "opr-directory",
    name: "OPR Directory",
    summary:
      "Tentative — online Open Provider Registry directory (providers.devcentr.org unset). Skeleton only; apps would poll registered endpoints later.",
    href: "/ideas/opr-directory",
    ideaSlug: "opr-directory",
    tags: "Tentative · Inference · Registry",
  },
  {
    id: "provider-mirror-backups",
    name: "Provider mirror backups",
    summary:
      "Vision — opt-in backups that mimic a data provider’s shape and API, plus provider-native fuzzy/vector search. Near-term wedge: .issues archives + Issues Browser.",
    href: "/ideas/provider-mirror-backups",
    ideaSlug: "provider-mirror-backups",
    tags: "Vision · Data · Portability",
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
  {
    id: "opr",
    name: "Open Provider Registry (OPR)",
    summary:
      "Open on-disk (+ optional HTTP) registration for online and offline model runners — implement once, any aggregator may consume.",
    href: "https://github.com/dev-centr/uniprovider/blob/main/spec/opr.md",
    external: true,
    tags: "Standards · Inference",
  },
];

export const ideas: IdeaPage[] = [
  {
    slug: "uniconfig",
    title: "UniConfig Config Panel",
    category: "products",
    overview:
      "A generic settings surface for other people's config files: open INI, YAML, TOML, SDLang, JSON, or tfvars; overlay JSON Schema from an SDLang profile catalog; register paths after touch. The D library (uniconfig-core) is independent of the dlangui desktop app so DevCentr can reuse the tree.",
    repos: [
      {
        name: "uniconfig",
        summary: "Desktop panel and CLI (dlangui).",
        href: "https://github.com/dev-centr/uniconfig",
      },
      {
        name: "uniconfig-core",
        summary: "Codecs, schema merge, SDLang profiles, registry.",
        href: "https://github.com/dev-centr/uniconfig-core",
      },
    ],
  },
  {
    slug: "uniprovider",
    title: "UniProvider",
    category: "products",
    overview:
      "Reference implementation of the Open Provider Registry (OPR): local on-disk manifests, transitional well-known probes (Ollama, LM Studio, llama.cpp, …), and a localhost OpenAI-compat aggregator. Protocol-first — other aggregators may speak OPR without depending on this daemon. Does not replace LiteLLM/Olla proxies; feeds them. Online public directory is a separate tentative service (opr-directory).",
    repos: [
      {
        name: "uniprovider",
        summary: "D library + CLI + OPR draft spec.",
        href: "https://github.com/dev-centr/uniprovider",
      },
      {
        name: "opr-directory",
        summary: "Tentative online directory skeleton (providers.devcentr.org unset).",
        href: "https://github.com/dev-centr/opr-directory",
      },
    ],
  },
  {
    slug: "opr-directory",
    title: "OPR Directory",
    category: "services",
    overview:
      "Tentative hosted directory where niche model providers could self-register OPR records and desktop apps could poll — the piece OpenAI-compat does not provide. Skeleton repository only; not in scope for implementation today. Local discovery remains uniprovider.",
    repos: [
      {
        name: "opr-directory",
        summary: "STATUS + API sketch; no product code yet.",
        href: "https://github.com/dev-centr/opr-directory",
      },
      {
        name: "uniprovider",
        summary: "Local OPR reference implementation.",
        href: "https://github.com/dev-centr/uniprovider",
      },
    ],
  },
  {
    slug: "provider-mirror-backups",
    title: "Provider search and mirror backups",
    category: "services",
    overview:
      "Architectural vision: data providers expose first-class fuzzy → vector/hybrid search so AI clients need not keep full private replicas just to RAG; consumers opt into mirror backups that mimic the provider’s data structure and API. Near-term demonstration wedge is personal .issues submission archives (bodies + media) plus Issues Browser forge metadata backups, with GitHub CLI --attach for live media. HCI face: Host-held history. Advocacy-by-demo for consumer-portable data over host-locked correspondence.",
    repos: [
      {
        name: "issues-browser",
        summary: "Forge metadata/body backup and offline search (early mirror wedge).",
        href: "https://github.com/dev-centr/issues-browser",
      },
      {
        name: "general-knowledge",
        summary: "Encyclopedia: Provider search and mirror backups.",
        href: "https://github.com/dev-centr/general-knowledge",
      },
      {
        name: "HCI-Nerdz/docs",
        summary: "Host-held history (human symptom ↔ treatment face).",
        href: "https://github.com/HCI-Nerdz/docs",
      },
    ],
  },
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

export function getCatalogItem(id: string) {
  return [...products, ...services, ...standards].find((item) => item.id === id);
}

export function catalogItemForIdea(slug: string) {
  return [...products, ...services].find((item) => item.ideaSlug === slug);
}
