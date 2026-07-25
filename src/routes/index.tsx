import { HeroOrbit } from "~/components/hero-orbit";
import { SiteFooter } from "~/components/site-footer";
import { Button } from "~/components/ui/button";

const pillars = [
  {
    n: "01",
    title: "Ecosystem Management",
    kicker: "Environment as code",
    body: "Author and version shells, toolchains, and infrastructure as first-class citizens—not a pile of side-car text files.",
  },
  {
    n: "02",
    title: "Visual DevEx",
    kicker: "Systems made visible",
    body: "Move from opaque file trees to high-fidelity structure. See the gravity of your software, not just its folders.",
  },
  {
    n: "03",
    title: "AI Synergy",
    kicker: "Context that compounds",
    body: "Give human-in-the-loop AI the deep environmental metadata it needs so flow-state coding can actually stick.",
  },
] as const;

const destinations = [
  {
    href: "https://devcentr.app",
    label: "devcentr.app",
    detail: "Flagship orchestration engine",
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
          <p class="eyebrow rise text-primary">Development Orchestration Suite</p>

          <h1 class="rise rise-delay-1 mt-5 max-w-3xl font-display text-[clamp(3rem,12vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.04em] text-foreground">
            DevCentr
          </h1>

          <p class="rise rise-delay-2 mt-6 max-w-xl font-display text-xl font-medium leading-snug tracking-tight text-foreground/90 md:text-2xl">
            Structure before syntax. Systems before snippets.
          </p>

          <p class="rise rise-delay-2 mt-4 max-w-lg text-base leading-relaxed text-muted-foreground md:text-[1.05rem]">
            The laboratory for the DOS movement—orchestrating environments, toolchains, and context around the
            developer, not just the editor.
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
          <p class="eyebrow">The DOS manifesto</p>
          <h2 class="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Three load-bearing ideas
          </h2>
          <p class="mt-4 text-muted-foreground">
            How teams author, see, and evolve the environments they actually ship in.
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

      <section class="border-y border-border/60 bg-foreground/[0.03] dark:bg-foreground/[0.04]">
        <div class="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
          <p class="eyebrow">The category pivot</p>
          <blockquote class="mt-6 max-w-3xl font-display text-2xl font-medium leading-snug tracking-tight text-foreground md:text-3xl md:leading-snug">
            Traditional IDEs focus on the editor. DevCentr focuses on the{" "}
            <span class="text-primary">orchestration</span> of the entire developer lifecycle.
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
