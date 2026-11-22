import { HeroOrbit } from "~/components/hero-orbit";
import { SiteFooter } from "~/components/site-footer";
import { SiteMap } from "~/components/site-map";
import { ToolchainArchitectureDiagram } from "~/components/toolchain-architecture-diagram";
import { Button } from "~/components/ui/button";

export default function Home() {
  return (
    <main>
      <section class="relative isolate flex flex-col overflow-hidden md:min-h-[640px]">
        <HeroOrbit />
        <div class="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 py-10 md:min-h-[640px] md:px-10 md:py-10">
          <p class="eyebrow rise text-primary">Developer ecosystem and support</p>

          <h1 class="rise rise-delay-1 -ms-[0.04em] mt-5 max-w-3xl font-display text-[clamp(2.75rem,10vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.04em] text-foreground">
            DevCentr
          </h1>

          <p class="rise rise-delay-2 mt-6 max-w-xl font-display text-xl font-medium leading-snug tracking-tight text-foreground/90 md:text-2xl">
            From first setup to full command.
          </p>

          <p class="rise rise-delay-2 mt-4 max-w-lg text-base leading-relaxed text-muted-foreground md:text-[1.05rem]">
            Tools, open standards, and practical guidance for developers who want to own their whole setup from
            day one to production. Home of{" "}
            <a class="text-primary underline-offset-4 hover:underline" href="/orchestrator">
              Orchestrator
            </a>
            , our Development Orchestration Suite.
          </p>

          <div class="rise rise-delay-3 mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button as="a" size="lg" variant="secondary" class="rounded-md" href="/orchestrator">
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
            Good software shouldn’t require spending half your week nursing broken environments. DevCentr is a
            home for developers: a cultural resource, a <span class="text-primary">development path</span>, and
            a suite that orchestrates the work around the code.
          </blockquote>
        </div>
      </section>

      <section class="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
        <p class="eyebrow">Explore</p>
        <h2 class="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Everything in orbit
        </h2>
        <p class="mt-3 max-w-xl text-muted-foreground">
          Orchestrator sits at the center, surrounded by the docs, catalogs, agent skills, writing, and
          decision tools. Click or tap any planet, or the center star, to jump straight there.
        </p>
        <SiteMap />
      </section>

      <section class="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
        <div class="max-w-2xl">
          <p class="eyebrow">How toolchains should work</p>
          <h2 class="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Stop juggling version managers
          </h2>
          <p class="mt-4 text-muted-foreground">
            Every language shouldn’t force you to install a separate third-party version manager just to switch
            between projects. When you run a language’s official command inside a repo, it should see the version
            that project expects, fetch it if needed, and run it right there without touching the rest of your
            machine.
          </p>
        </div>
        <div class="mt-12">
          <ToolchainArchitectureDiagram />
        </div>
        <p class="mt-8 text-sm text-muted-foreground">
          Read the architecture:{" "}
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
