import { ModeToggle } from "~/components/mode-toggle";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

export default function Home() {
  return (
    <div class="arch-surface relative min-h-dvh">
      <div class="relative z-10">
        <header class="mx-auto flex max-w-6xl items-center justify-between px-6 pb-5 pt-7 md:px-12 md:pb-8 md:pt-10">
          <span class="arch-eyebrow text-foreground/70">Dev-Centr</span>
          <ModeToggle />
        </header>

        <main class="mx-auto max-w-6xl px-6 pb-32 md:px-12">
          <section class="mb-24 md:mb-36">
            <p class="arch-eyebrow mb-7 md:mb-9">Laboratory · Development Orchestration Suite</p>
            <div class="arch-rule mb-9 md:mb-12" />

            <h1 class="max-w-4xl font-display text-4xl font-medium leading-[1.06] tracking-tight text-foreground/92 md:text-6xl lg:text-[4.1rem]">
              Orchestrating
              <span class="block text-muted-foreground">the Future</span>
            </h1>

            <p class="mt-9 max-w-2xl text-base leading-[1.8] text-muted-foreground md:mt-12 md:text-lg md:leading-[1.75]">
              Dev-Centr is the laboratory for the{" "}
              <strong class="font-medium text-foreground/95">Development Orchestration Suite (DOS)</strong> movement. We
              shape the gravity of the modern developer&apos;s world—structure before syntax, systems before snippets.
            </p>

            <div class="mt-10 flex flex-col gap-2.5 sm:mt-12 sm:flex-row sm:flex-wrap sm:items-center">
              <Button as="a" size="lg" class="rounded-sm font-mono text-xs uppercase tracking-[0.18em]" href="https://devcentr.app">
                Download
              </Button>
              <Button
                as="a"
                size="lg"
                variant="outline"
                class="rounded-sm border-border/60 bg-background/35 font-mono text-xs uppercase tracking-[0.18em] backdrop-blur-sm"
                href="https://docs.devcentr.org"
              >
                Docs
              </Button>
              <Button
                as="a"
                size="lg"
                variant="ghost"
                class="rounded-sm font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground/85"
                href="https://github.com/dev-centr"
              >
                GitHub
              </Button>
            </div>
          </section>

          <section class="mb-24 md:mb-36">
            <div class="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
              <div>
                <p class="arch-eyebrow mb-2.5">01</p>
                <h2 class="font-display text-2xl font-medium tracking-tight text-foreground/92 md:text-3xl">The DOS Manifesto</h2>
              </div>
              <p class="max-w-md text-sm leading-relaxed text-muted-foreground md:text-right">
                Three load-bearing ideas for how teams author, see, and evolve their developer environments.
              </p>
            </div>

            <div class="grid gap-6 md:grid-cols-3 md:gap-8">
              <Card class="rounded-sm border-border/55 bg-card/50 shadow-none backdrop-blur-sm transition-colors hover:border-border/80 dark:bg-card/35">
                <CardHeader class="space-y-3 pb-2">
                  <CardTitle class="font-display text-lg font-medium tracking-tight text-foreground/92">
                    Ecosystem Management
                  </CardTitle>
                  <CardDescription class="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    Environment as code
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p class="text-sm leading-[1.75] text-muted-foreground">
                    Move beyond text files. Author and version your entire environment—shells, toolchains, and
                    infrastructure—as first-class citizens.
                  </p>
                </CardContent>
              </Card>

              <Card class="rounded-sm border-border/55 bg-card/50 shadow-none backdrop-blur-sm transition-colors hover:border-border/80 dark:bg-card/35">
                <CardHeader class="space-y-3 pb-2">
                  <CardTitle class="font-display text-lg font-medium tracking-tight text-foreground/92">Visual DevEx</CardTitle>
                  <CardDescription class="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    Systems made visible
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p class="text-sm leading-[1.75] text-muted-foreground">
                    Transition from opaque file trees to high-fidelity design artifacts. Visualize the invisible structure
                    of your software.
                  </p>
                </CardContent>
              </Card>

              <Card class="rounded-sm border-border/55 bg-card/50 shadow-none backdrop-blur-sm transition-colors hover:border-border/80 dark:bg-card/35">
                <CardHeader class="space-y-3 pb-2">
                  <CardTitle class="font-display text-lg font-medium tracking-tight text-foreground/92">AI Synergy</CardTitle>
                  <CardDescription class="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    Context that compounds
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p class="text-sm leading-[1.75] text-muted-foreground">
                    Provide the deep contextual metadata necessary for human-in-the-loop AI and flow-state coding to reach
                    their full potential.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <p class="arch-eyebrow mb-2.5">02</p>
            <h2 class="mb-9 font-display text-2xl font-medium tracking-tight text-foreground/92 md:mb-12 md:text-3xl">The Category Pivot</h2>

            <Card class="rounded-sm border-border/55 bg-card/45 shadow-none backdrop-blur-md dark:bg-card/28">
              <CardContent class="p-0">
                <div class="grid gap-0 md:grid-cols-[3px_1fr]">
                  <div class="hidden bg-primary/55 md:block" aria-hidden="true" />
                  <blockquote class="px-8 py-11 md:px-12 md:py-14">
                    <p class="text-base font-light leading-[1.85] text-muted-foreground md:text-lg md:leading-[1.82]">
                      Traditional IDEs focus on the editor. Dev-Centr focuses on the{" "}
                      <strong class="font-medium text-foreground/95">orchestration</strong> of the entire developer
                      lifecycle.
                    </p>
                  </blockquote>
                </div>
              </CardContent>
            </Card>
          </section>

          <footer class="arch-rule mt-20 md:mt-28" />
          <p class="mt-7 text-center font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground/90">
            <a
              href="https://docs.devcentr.org"
              class="text-muted-foreground/90 underline decoration-border/60 underline-offset-4 transition-colors hover:text-foreground/85"
            >
              Documentation
            </a>
            {" · "}
            Dev-Centr · DOS
          </p>
        </main>
      </div>
    </div>
  );
}
