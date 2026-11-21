import { HeroOrbit } from "~/components/hero-orbit";
import { SiblingOwnershipDiagram } from "~/components/sibling-ownership-diagram";
import { SiteFooter } from "~/components/site-footer";
import { SiteMap } from "~/components/site-map";
import { ToolchainArchitectureDiagram } from "~/components/toolchain-architecture-diagram";
import { Button } from "~/components/ui/button";

export default function Home() {
  return (
    <main>
      <section class="relative isolate min-h-[calc(100dvh-5.5rem)] overflow-hidden">
        <HeroOrbit />
        <div class="relative z-10 mx-auto flex max-w-6xl flex-col justify-center px-6 pb-20 pt-10 md:min-h-[calc(100dvh-5.5rem)] md:px-10 md:pb-28 md:pt-6">
          <p class="eyebrow rise text-primary">Developer ecosystem and support</p>

          <h1 class="rise rise-delay-1 -ms-[0.08em] mt-5 max-w-3xl font-display text-[clamp(2.75rem,10vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.04em] text-foreground">
            DevCentr
          </h1>

          <p class="rise rise-delay-2 mt-6 max-w-xl font-display text-xl font-medium leading-snug tracking-tight text-foreground/90 md:text-2xl">
            More than a tool. A path to mastery.
          </p>

          <p class="rise rise-delay-2 mt-4 max-w-lg text-base leading-relaxed text-muted-foreground md:text-[1.05rem]">
            The home for the writing, the catalogs, and the support around the work. The suite that runs the
            environments is{" "}
            <a class="text-primary underline-offset-4 hover:underline" href="/orchestrator">
              Orchestrator
            </a>
            .
          </p>

          <div class="rise rise-delay-3 mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button as="a" size="lg" class="rounded-md" href="/orchestrator">
              Download
            </Button>
            <Button
              as="a"
              size="lg"
              variant="outline"
              class="rounded-md border-border/80 bg-background/40 backdrop-blur-sm"
              href="/stack-advisor"
            >
              Stack Advisor
            </Button>
            <Button
              as="a"
              size="lg"
              variant="outline"
              class="rounded-md border-border/80 bg-background/40 backdrop-blur-sm"
              href="/skills"
            >
              Agent skills
            </Button>
            <Button
              as="a"
              size="lg"
              variant="outline"
              class="rounded-md border-border/80 bg-background/40 backdrop-blur-sm"
              href="/extensions?type=rules-template"
            >
              Extensions store
            </Button>
            <Button
              as="a"
              size="lg"
              variant="outline"
              class="rounded-md border-border/80 bg-background/40 backdrop-blur-sm"
              href="/skills?cat=bootstrap"
            >
              Bootstrap an org
            </Button>
          </div>
        </div>
      </section>

      <section class="border-y border-border/60 bg-foreground/[0.03] dark:bg-foreground/[0.04]">
        <div class="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
          <p class="eyebrow">Why we exist</p>
          <blockquote class="mt-6 max-w-3xl font-display text-2xl font-medium leading-snug tracking-tight text-foreground md:text-3xl md:leading-snug">
            DevCentr is the place for developers—a cultural resource and a{" "}
            <span class="text-primary">development path</span>, with a suite that orchestrates the work around the
            code.
          </blockquote>
        </div>
      </section>

      <section class="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
        <p class="eyebrow">Go further</p>
        <h2 class="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">System</h2>
        <SiteMap />
      </section>

      <section class="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
        <div class="max-w-2xl">
          <p class="eyebrow">Toolchain architecture</p>
          <h2 class="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Official entrypoint owns the lifecycle
          </h2>
          <p class="mt-4 text-muted-foreground">
            Language and SDK ecosystems should resolve the project pin, install if needed, and re-exec under
            the correct version for this process tree — without rewriting the machine default or sending
            newcomers to tribal version managers after an ABI crash.
          </p>
        </div>
        <div class="mt-12">
          <ToolchainArchitectureDiagram />
        </div>
        <div class="mt-10">
          <SiblingOwnershipDiagram />
        </div>
        <p class="mt-8 text-sm text-muted-foreground">
          Deep dive:{" "}
          <a
            class="text-primary underline decoration-primary/35 underline-offset-4 hover:decoration-primary"
            href="https://docs.devcentr.org/general-knowledge/explanation/infrastructure/toolchain-management.html"
          >
            Toolchain Management Pattern
          </a>
          {" · "}
          <a
            class="text-primary underline decoration-primary/35 underline-offset-4 hover:decoration-primary"
            href="https://opensh.org/open-shell-org/shell-architecture/entrypoint-dispatch.html"
          >
            Entrypoint Dispatch
          </a>
        </p>
      </section>

      <SiteFooter />
    </main>
  );
}
