export type SkillCategoryId =
  | "all"
  | "bootstrap"
  | "writing"
  | "docs"
  | "publishing"
  | "review"
  | "studio";

export type SkillEntry = {
  id: string;
  summary: string;
  category: Exclude<SkillCategoryId, "all">;
  sourceUrl: string;
  status: "active" | "planned";
};

const SKILLS_ROOT = "https://github.com/dev-centr/agent-rules/tree/main/skills";

export const SKILL_CATEGORIES: {
  id: SkillCategoryId;
  label: string;
  sourceUrl: string;
  empty?: string;
}[] = [
  {
    id: "all",
    label: "All",
    sourceUrl: SKILLS_ROOT,
  },
  {
    id: "bootstrap",
    label: "Bootstrap skills",
    sourceUrl: `${SKILLS_ROOT}/bootstrap-org/profiles`,
  },
  {
    id: "writing",
    label: "Writing",
    sourceUrl: SKILLS_ROOT,
  },
  {
    id: "docs",
    label: "Docs",
    sourceUrl: `${SKILLS_ROOT}/fix-docs-encoding`,
  },
  {
    id: "publishing",
    label: "Publishing",
    sourceUrl: `${SKILLS_ROOT}/publish-to-dub`,
  },
  {
    id: "review",
    label: "Review",
    sourceUrl: SKILLS_ROOT,
    empty: "PR review and merge-ready curricula are not published as skills yet.",
  },
  {
    id: "studio",
    label: "Studio",
    sourceUrl: SKILLS_ROOT,
    empty: "Studio MCP and vibe-coding curricula stay in the how-to until they ship as skills.",
  },
];

export const SKILL_ENTRIES: SkillEntry[] = [
  {
    id: "bootstrap-org",
    category: "bootstrap",
    summary: "Stand up a GitHub org or a library/CLI/desktop/web app from a named SDL profile.",
    sourceUrl: `${SKILLS_ROOT}/bootstrap-org`,
    status: "active",
  },
  {
    id: "writing-news",
    category: "writing",
    summary: "Outward news body copy: inverted pyramid, shared record, not a changelog.",
    sourceUrl: `${SKILLS_ROOT}/writing-news`,
    status: "active",
  },
  {
    id: "writing-blog",
    category: "writing",
    summary: "Inward essay and tutorial narrative: thesis, thinking in public.",
    sourceUrl: `${SKILLS_ROOT}/writing-blog`,
    status: "active",
  },
  {
    id: "fix-docs-encoding",
    category: "docs",
    summary: "Repair UTF-8 mojibake and invalid SVG XML in Antora docs after Windows edits.",
    sourceUrl: `${SKILLS_ROOT}/fix-docs-encoding`,
    status: "active",
  },
  {
    id: "publish-to-dub",
    category: "publishing",
    summary: "Register a D package on code.dlang.org with dubx / dub-publish. Official dub has no publish command.",
    sourceUrl: `${SKILLS_ROOT}/publish-to-dub`,
    status: "active",
  },
];

export function parseSkillCategory(raw: string | undefined): SkillCategoryId {
  const id = (raw ?? "").trim().toLowerCase();
  if (SKILL_CATEGORIES.some((c) => c.id === id)) return id as SkillCategoryId;
  return "all";
}

export function skillsInCategory(id: SkillCategoryId): SkillEntry[] {
  if (id === "all") return SKILL_ENTRIES.filter((s) => s.status === "active");
  return SKILL_ENTRIES.filter((s) => s.category === id);
}
