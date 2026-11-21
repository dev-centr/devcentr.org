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
    summary: "One browser interface for GitHub, self-hosted Git servers, and other version control backends.",
    href: "https://repolab.dev",
    external: true,
    tags: "Tooling · Version control",
  },
  {
    id: "uniconfig",
    name: "UniConfig Config Panel",
    summary:
      "Schema-driven settings interface for editing config files that lack a native GUI.",
    href: "/ideas/uniconfig",
    ideaSlug: "uniconfig",
    logo: "/apps/logos/uniconfig.svg",
    tags: "Tooling · Config",
  },
  {
    id: "devcentr",
    name: "Orchestrator",
    summary: "Our flagship Development Orchestration Suite for managing environments, toolchains, and workspaces.",
    href: "/orchestrator",
    logo: "/brand/logo-on-dark.svg",
  },
  {
    id: "equivalence-engine",
    name: "Equivalence Engine",
    summary: "Rule-driven migration engine for adapting code, filesystem paths, and CLI installations.",
    href: "/ideas/equivalence-engine",
    ideaSlug: "equivalence-engine",
    logo: "/apps/logos/equivalence-engine.svg",
  },
  {
    id: "ibex",
    name: "Ibex",
    summary:
      "Cross-platform installer builder that updates system PATH entries cleanly in place.",
    href: "https://docs.devcentr.org/tools/ibex/",
    external: true,
  },
  {
    id: "pathman",
    name: "Pathman",
    summary: "Command-line tool for inspecting and safely editing the Windows PATH.",
    href: "https://github.com/dev-centr/pathman",
    external: true,
  },
  {
    id: "msi-generator",
    name: "MSI Generator",
    summary: "Cross-platform MSI and MSIX package generator written in D.",
    href: "https://github.com/dev-centr/msi-installer-generator",
    external: true,
  },
  {
    id: "github-actions-editor",
    name: "GitHub Actions Editor",
    summary: "Visual workflow editor for creating and maintaining GitHub Actions pipelines.",
    href: "https://github.com/dev-centr/github-actions-editor",
    external: true,
  },
  {
    id: "prohelp",
    name: "Prohelp",
    summary: "Structured command-line help library and documentation tooling.",
    href: "https://github.com/openshellorg/prohelp",
    external: true,
  },
  {
    id: "resting-lanczos",
    name: "resting-lanczos",
    summary: "Responsive image pipeline comparing Lanczos3 pre-scaled tiers against browser downscaling.",
    href: "/resting-lanczos",
    tags: "Tooling · Image pipeline",
  },
  {
    id: "themed-svg-studio",
    name: "Themed SVG Studio",
    summary:
      "Concept editor for binding SVG fills and strokes to semantic light, dark, and host-controlled theme tokens.",
    href: "/themed-svg-studio",
    logo: "/apps/logos/themed-svg-studio.svg",
    tags: "Tooling · SVG · Theming",
  },
  {
    id: "stack-advisor",
    name: "Stack Advisor",
    summary:
      "Interactive selector for picking a compatible host, target, language, and toolchain stack.",
    href: "/stack-advisor",
    tags: "Tooling · Toolchains",
  },
  {
    id: "uniprovider",
    name: "UniProvider",
    summary:
      "Local reference implementation of the Open Provider Registry, combining on-disk manifests with a localhost model aggregator.",
    href: "/ideas/uniprovider",
    ideaSlug: "uniprovider",
    tags: "Tooling · Inference",
  },
];

export const services: CatalogItem[] = [
  {
    id: "packagehub",
    name: "PackageHub",
    summary: "Public web catalog for searching and browsing packages.",
    href: "https://packagehub.dev",
    external: true,
  },
  {
    id: "pkgpublish",
    name: "pkgpublish",
    summary: "Web console for configuring release targets and publishing packages.",
    href: "https://pkgpublish.dev",
    external: true,
  },
  {
    id: "opr-directory",
    name: "OPR Directory",
    summary:
      "Public directory for the Open Provider Registry where hosted model providers self-register and apps discover endpoints.",
    href: "/ideas/opr-directory",
    ideaSlug: "opr-directory",
    tags: "Inference · Registry · SolidStart",
  },
  {
    id: "provider-mirror-backups",
    name: "Provider mirror backups",
    summary:
      "Portable backup architecture combining provider-native search with opt-in local mirrors, starting with issue archives.",
    href: "/ideas/provider-mirror-backups",
    ideaSlug: "provider-mirror-backups",
    tags: "Vision · Data · Portability",
  },
];

export const standards: CatalogItem[] = [
  {
    id: "centrmark",
    name: "CentrMark",
    summary: "Literate markup format designed for Synchronous Literate Programming.",
    href: "https://github.com/dev-centr/centrmark",
    external: true,
  },
  {
    id: "opr",
    name: "Open Provider Registry (OPR)",
    summary:
      "Open on-disk and HTTP registration format so local and hosted model runners can register once and work with any aggregator.",
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
      "A general-purpose settings panel for configuration files that lack their own interface. Open INI, YAML, TOML, SDLang, JSON, or tfvars files, apply JSON Schema overlays from an SDLang profile catalog, and track managed paths automatically. The core D library (uniconfig-core) is decoupled from the desktop app so Orchestrator and other tools can reuse it.",
    repos: [
      {
        name: "uniconfig",
        summary: "Desktop control panel and CLI built with dlangui.",
        href: "https://github.com/dev-centr/uniconfig",
      },
      {
        name: "uniconfig-core",
        summary: "Format codecs, schema merging, SDLang profiles, and path registry.",
        href: "https://github.com/dev-centr/uniconfig-core",
      },
    ],
  },
  {
    slug: "uniprovider",
    title: "UniProvider",
    category: "products",
    overview:
      "Reference implementation of the Open Provider Registry (OPR). It reads local on-disk manifests, detects common local runners such as Ollama, LM Studio, and llama.cpp, and exposes a localhost OpenAI-compatible aggregator. Because the protocol comes first, other proxies and tools like LiteLLM or Olla can consume OPR directly without depending on this daemon. Hosted providers are cataloged separately in OPR Directory.",
    repos: [
      {
        name: "uniprovider",
        summary: "D library, CLI, and Open Provider Registry draft specification.",
        href: "https://github.com/dev-centr/uniprovider",
      },
      {
        name: "opr-directory",
        summary: "Public SolidStart directory for hosted providers.",
        href: "https://github.com/dev-centr/opr-directory",
      },
    ],
  },
  {
    slug: "opr-directory",
    title: "OPR Directory",
    category: "services",
    overview:
      "Public web catalog for the Open Provider Registry, built with SolidStart and backed by JSON or Turso storage. Hosted model providers register publicly reachable endpoints so client apps can poll GET /opr/v1/providers, while local runners stay on disk through UniProvider. Planned public host: providers.devcentr.org.",
    repos: [
      {
        name: "opr-directory",
        summary: "SolidStart web app and OPR HTTP API.",
        href: "https://github.com/dev-centr/opr-directory",
      },
      {
        name: "uniprovider",
        summary: "Local reference implementation of the Open Provider Registry.",
        href: "https://github.com/dev-centr/uniprovider",
      },
    ],
  },
  {
    slug: "provider-mirror-backups",
    title: "Provider search and mirror backups",
    category: "services",
    overview:
      "An architecture for portable user data. Data providers expose native fuzzy and vector search so AI tools can query records directly instead of maintaining stale copies, while users can opt into mirror backups that preserve the provider's structure and API. The first working wedge combines local .issues archives with Issues Browser backups and GitHub CLI media attachments, pairing with HCI Nerdz's work on host-held history.",
    repos: [
      {
        name: "issues-browser",
        summary: "Offline backup and search for issue tracker metadata and bodies.",
        href: "https://github.com/dev-centr/issues-browser",
      },
      {
        name: "general-knowledge",
        summary: "Architecture overview of provider search and mirror backups.",
        href: "https://github.com/dev-centr/general-knowledge",
      },
      {
        name: "HCI-Nerdz/docs",
        summary: "Companion HCI framing on host-held history.",
        href: "https://github.com/HCI-Nerdz/docs",
      },
    ],
  },
  {
    slug: "equivalence-engine",
    title: "Equivalence Engine",
    category: "products",
    overview:
      "A rule-driven engine that resolves shortest-path adaptations across software versions, operating system path conventions, and CLI installers. Rules live in SDLang catalogs so Orchestrator and CI pipelines can migrate code, map paths, and provision tools with repeatable results.",
    repos: [
      {
        name: "equivalence-engine",
        summary: "Core CLI covering code, filesystem, and CLI install domains.",
        href: "https://github.com/dev-centr/equivalence-engine",
      },
      {
        name: "libequivalence",
        summary: "D library for loading and resolving adaptation rules.",
        href: "https://github.com/dev-centr/libequivalence",
      },
      {
        name: "equivalence-rules-code",
        summary: "Code migration rulesets, including PyQt and Astro.",
        href: "https://github.com/dev-centr/equivalence-rules-code",
      },
      {
        name: "equivalence-rules-filesystem",
        summary: "Cross-platform filesystem path mapping rules.",
        href: "https://github.com/dev-centr/equivalence-rules-filesystem",
      },
      {
        name: "equivalence-rules-cli",
        summary: "CLI tool installation catalog used by Orchestrator.",
        href: "https://github.com/dev-centr/equivalence-rules-cli",
      },
      {
        name: "equivalence-engine-action",
        summary: "GitHub Action for running adaptations in CI.",
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
