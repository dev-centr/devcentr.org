import { Meta, Title } from "@solidjs/meta";
import { SiteFooter } from "~/components/site-footer";
import { AgentSkills } from "~/components/AgentSkills";

export default function SkillsPage() {
  return (
    <>
      <Title>Agent skills · DevCentr</Title>
      <Meta
        name="description"
        content="Audit DevCentr agent skills from agent-rules: what exists by category, summaries, and empty slots. Copy a name into Cursor when you mean to load it."
      />
      <div class="mx-auto max-w-7xl px-6 pb-12 pt-2 md:px-10">
        <header class="mb-10 md:mb-12">
          <p class="eyebrow mb-3 text-primary">Skills · agent-rules inventory</p>
          <h1 class="font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Agent skills
          </h1>
          <p class="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            AI-assisted coding and vibe coding workflows depend on a known set of agent skills — not scavenger
            hunts through the repo. This page inventories DevCentr skills from agent-rules so you can audit what
            exists, what each one covers, and which categories are still empty. Open a skill for its summary; copy
            the name only when you mean to load it in Cursor. Bootstrap lists org and project profiles.
          </p>
        </header>
        <AgentSkills />
      </div>
      <SiteFooter />
    </>
  );
}
