import { Meta, Title } from "@solidjs/meta";
import { SiteFooter } from "~/components/site-footer";
import { AgentSkills } from "~/components/AgentSkills";

export default function SkillsPage() {
  return (
    <>
      <Title>Agent skills · DevCentr</Title>
      <Meta
        name="description"
        content="Inventory of DevCentr agent skills from agent-rules. The harness auto-loads and keeps them current; the corpus is designed to work together even if you only adopt pieces."
      />
      <div class="mx-auto max-w-7xl px-6 pb-12 pt-2 md:px-10">
        <header class="mb-10 md:mb-12">
          <p class="eyebrow mb-3 text-primary">Skills · harness inventory</p>
          <h1 class="font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Agent skills
          </h1>
          <p class="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            AI-assisted coding and vibe coding workflows in DevCentr load agent skills through the harness —
            pulled from agent-rules, kept current, and applied without a manual shopping trip. This page is that
            inventory made visible: what exists by category, what each skill covers, and which slots are still
            empty. You can adopt pieces without taking every harness tweak, but the corpus is designed to work
            together in sum — browsing here is how you see the whole set, not a menu of one-offs. Copy a name
            only if you need to call one out explicitly. Bootstrap lists org and project profiles.
          </p>
        </header>
        <AgentSkills />
      </div>
      <SiteFooter />
    </>
  );
}
