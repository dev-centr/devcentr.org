import { HeroOrbit } from "~/components/hero-orbit";
import { SiblingOwnershipDiagram } from "~/components/sibling-ownership-diagram";
import { SiteFooter } from "~/components/site-footer";
import { ToolchainArchitectureDiagram } from "~/components/toolchain-architecture-diagram";
import { Button } from "~/components/ui/button";

const pillars = [
  {
    n: "01",
    title: "Ecosystem Management",
    kicker: "Environment as code",
    body: "Treat shells, toolchains, and environments like real project assets—author them, version them, and share them instead of chasing config files.",
  },
  {
    n: "02",
    title: "Visual DevEx",
    kicker: "Systems made visible",
    body: "See how your software fits together—dependencies, environments, and structure—without digging through opaque folders.",
  },
  {
    n: "03",
    title: "AI Synergy",
    kicker: "Context that compounds",
    body: "Give humans and AI the same grounded project context so assistance stays accurate and useful where you actually work.",
  },
  {
    n: "04",
    title: "DevOps",
    kicker: "One facet of the suite",
    body: "CI/CD, infrastructure, and traditional ops where they belong on the path—without reducing DevCentr to a DevOps product.",
  },
] as const;

const destinations = [
  {
    href: "https://devcentr.app",
    label: "devcentr.app",
    detail: "Flagship DOS",
  },
  {
    href: "/apps",
    label: "Apps",
    detail: "Products, services & standards",
  },
  {
    href: "https://docs.devcentr.org",
    label: "docs.devcentr.org",
    detail: "Knowledge base & specs",
  },
  {
    href: "/news",
    label: "News",
    detail: "Initiatives & engineering blog",
  },
  {
    href: "/changelog",
    label: "Changelog",
    detail: "Product & docs shipping notes",
  },
  {
    href: "/toolchain-advisor",
    label: "Toolchain Advisor",
    detail: "Pick host, target, language",
  },
  {
    href: "https://github.com/dev-centr",
    label: "GitHub",
    detail: "Source-available ecosystem",
  },
] as const;

export default function Home() {
  return (
    <main>
      <section class="relative isolate min-h-[calc(100dvh-5.5rem)] overflow-hidden">
        <HeroOrbit />
        <div class="relative z-10 mx-auto flex max-w-6xl flex-col justify-center px-6 pb-20 pt-10 md:min-h-[calc(100dvh-5.5rem)] md:px-10 md:pb-28 md:pt-6">
          <p class="eyebrow rise text-primary">Developer Ecosystem</p>

          <h1 class="rise rise-delay-1 mt-5 max-w-3xl font-display text-[clamp(3rem,12vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.04em] text-foreground">
            DevCentr
          </h1>

          <p class="rise rise-delay-2 mt-6 max-w-xl font-display text-xl font-medium leading-snug tracking-tight text-foreground/90 md:text-2xl">
            More than just a tool, a path to mastery.
          </p>

          <p class="rise rise-delay-2 mt-4 max-w-lg text-base leading-relaxed text-muted-foreground md:text-[1.05rem]">
            An ecosystem of tools and resources for developers. Go from 0 to pro. Learn and manage development workflows with our flagship Development Orchestration
            Suite that improves how developers live and work.
          </p>

          <div class="rise rise-delay-3 mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button
              as="a"
              size="lg"
              class="rounded-md font-mono text-xs uppercase tracking-[0.16em]"
              href="https://devcentr.app"
            >
              Get the app
            </Button>
            <Button
              as="a"
              size="lg"
              variant="outline"
              class="rounded-md border-border/80 bg-background/40 font-mono text-xs uppercase tracking-[0.16em] backdrop-blur-sm"
              href="/toolchain-advisor"
            >
              Toolchain Advisor
            </Button>
          </div>
        </div>
      </section>

      <section class="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
        <div class="max-w-2xl">
          <p class="eyebrow">From 0 to pro</p>
          <h2 class="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Four practical ideas
          </h2>
          <p class="mt-4 text-muted-foreground">
            How you manage, see, improve, and operate the path around your code—whether you are starting out or
            leveling up. (A DOS is what some might casually call a Dev OS; we keep the public name precise.)
          </p>
        </div>

        <ol class="mt-14 space-y-0 border-t border-border/70">
          {pillars.map((p) => (
            <li class="grid gap-4 border-b border-border/70 py-10 md:grid-cols-[5rem_1fr_1.1fr] md:gap-10 md:py-12">
              <span class="font-mono text-sm text-primary">{p.n}</span>
              <div>
                <h3 class="font-display text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                  {p.title}
                </h3>
                <p class="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  {p.kicker}
                </p>
              </div>
              <p class="text-[0.95rem] leading-relaxed text-muted-foreground md:pt-1">{p.body}</p>
            </li>
          ))}
        </ol>
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
        <h2 class="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">Destinations</h2>
        <ul class="mt-12 divide-y divide-border/70 border-y border-border/70">
          {destinations.map((d) => (
            <li>
              <a
                href={d.href}
                class="group flex flex-col gap-1 py-6 no-underline transition-colors sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
              >
                <span class="font-display text-xl font-semibold tracking-tight text-foreground group-hover:text-primary md:text-2xl">
                  {d.label}
                </span>
                <span class="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  {d.detail}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <SiteFooter />
    </main>
  );
}
