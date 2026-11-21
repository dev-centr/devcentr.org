import { Meta, Title } from "@solidjs/meta";
import { SiteFooter } from "~/components/site-footer";
import { AgentSkills } from "~/components/AgentSkills";

export default function SkillsPage() {
  return (
    <>
      <Title>Agent skills · DevCentr</Title>
      <Meta
        name="description"
        content="Browse the DevCentr agent skills catalog from agent-rules. Use a single skill for one task or install the full set into your coding harness."
      />
      <div class="mx-auto max-w-[56rem] px-6 pb-12 pt-2 md:px-10">
        <header class="mb-10 md:mb-12">
          <p class="eyebrow mb-3 text-primary">Skills · Catalog</p>
          <h1 class="font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Agent skills
          </h1>
          <p class="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            DevCentr coding workflows share a catalog of reusable agent skills maintained in agent-rules.
            Browse what is available by category, read what each skill covers, or copy a prompt for a
            single task. Open the Bootstrap tab for starter profiles covering new organizations and projects.
          </p>
        </header>
        <AgentSkills />
      </div>
      <SiteFooter />
    </>
  );
}
