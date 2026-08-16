import { Meta, Title } from "@solidjs/meta";
import { SiteFooter } from "~/components/site-footer";
import { AgentSkills } from "~/components/AgentSkills";

export default function SkillsPage() {
  return (
    <>
      <Title>Agent skills · DevCentr</Title>
      <Meta
        name="description"
        content="Cursor skills from agent-rules. Browse categories, copy a name into a prompt, or pick a bootstrap-org profile."
      />
      <div class="mx-auto max-w-7xl px-6 pb-12 pt-2 md:px-10">
        <header class="mb-10 md:mb-12">
          <p class="eyebrow mb-3 text-primary">Skills · Cursor curricula</p>
          <h1 class="font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Agent skills
          </h1>
          <p class="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Click a skill, read the description, copy the name into a Cursor prompt. Bootstrap skills are the
            org and project profile selector. Writing, docs, and publishing are shipped; review and studio are
            reserved for curricula that do not exist yet.
          </p>
        </header>
        <AgentSkills />
      </div>
      <SiteFooter />
    </>
  );
}
