import { ModeToggle } from "~/components/mode-toggle";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

export default function Home() {
  return (
    <div class="arch-surface relative min-h-dvh">
      <div class="relative z-10">
        <header class="mx-auto flex max-w-6xl items-center justify-between px-6 pb-6 pt-8 md:px-12 md:pb-10 md:pt-12">
          <span class="arch-eyebrow text-foreground/80">Dev-Centr</span>
          <ModeToggle />
        </header>

        <main class="mx-auto max-w-6xl px-6 pb-32 md:px-12">
          <section class="mb-28 md:mb-40">
            <p class="arch-eyebrow mb-8 md:mb-10">Laboratory · Development Orchestration Suite</p>
            <div class="arch-rule mb-10 md:mb-14" />

            <h1 class="max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-[4.25rem]">
              Orchestrating
              <span class="block text-muted-foreground">the Future</span>
            </h1>

            <p class="mt-10 max-w-2xl text-lg leading-[1.75] text-muted-foreground md:mt-14 md:text-xl md:leading-[1.7]">
              Dev-Centr is the laboratory for the{" "}
              <strong class="font-semibold text-foreground">Development Orchestration Suite (DOS)</strong> movement. We
              shape the gravity of the modern developer&apos;s world—structure before syntax, systems before snippets.
            </p>

            <div class="mt-12 flex flex-col gap-3 sm:mt-14 sm:flex-row sm:flex-wrap sm:items-center">
              <Button as="a" size="lg" class="rounded-sm font-mono text-xs uppercase tracking-[0.2em]" href="https://devcentr.app">
                Download
              </Button>
              <Button
                as="a"
                size="lg"
                variant="outline"
                class="rounded-sm border-border/80 bg-background/40 font-mono text-xs uppercase tracking-[0.2em] backdrop-blur-sm"
                href="https://docs.devcentr.org"
              >
                Vision
              </Button>
              <Button
                as="a"
                size="lg"
                variant="ghost"
                class="rounded-sm font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
                href="https://github.com/dev-centr"
              >
                GitHub
              </Button>
            </div>
          </section>

          <section class="mb-28 md:mb-40">
            <div class="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
              <div>
                <p class="arch-eyebrow mb-3">01</p>
                <h2 class="font-display text-2xl font-semibold tracking-tight md:text-3xl">The DOS Manifesto</h2>
              </div>
              <p class="max-w-md text-sm leading-relaxed text-muted-foreground md:text-right">
                Three load-bearing ideas for how teams author, see, and evolve their developer environments.
              </p>
            </div>

            <div class="grid gap-6 md:grid-cols-3 md:gap-8">
              <Card class="rounded-sm border-border/80 bg-card/60 shadow-none backdrop-blur-sm transition-colors hover:border-primary/35 dark:bg-card/40">
                <CardHeader class="space-y-3 pb-2">
                  <CardTitle class="font-display text-lg font-semibold tracking-tight text-foreground">
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

              <Card class="rounded-sm border-border/80 bg-card/60 shadow-none backdrop-blur-sm transition-colors hover:border-primary/35 dark:bg-card/40">
                <CardHeader class="space-y-3 pb-2">
                  <CardTitle class="font-display text-lg font-semibold tracking-tight text-foreground">Visual DevEx</CardTitle>
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

              <Card class="rounded-sm border-border/80 bg-card/60 shadow-none backdrop-blur-sm transition-colors hover:border-primary/35 dark:bg-card/40">
                <CardHeader class="space-y-3 pb-2">
                  <CardTitle class="font-display text-lg font-semibold tracking-tight text-foreground">AI Synergy</CardTitle>
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
            <p class="arch-eyebrow mb-3">02</p>
            <h2 class="mb-10 font-display text-2xl font-semibold tracking-tight md:mb-14 md:text-3xl">The Category Pivot</h2>

            <Card class="rounded-sm border-border/80 bg-card/50 shadow-none backdrop-blur-md dark:bg-card/30">
              <CardContent class="p-0">
                <div class="grid gap-0 md:grid-cols-[4px_1fr]">
                  <div class="hidden bg-primary/90 md:block" aria-hidden="true" />
                  <blockquote class="px-8 py-12 md:px-14 md:py-16">
                    <p class="text-lg font-light leading-[1.85] text-muted-foreground md:text-xl md:leading-[1.8]">
                      Traditional IDEs focus on the editor. Dev-Centr focuses on the{" "}
                      <strong class="font-semibold text-foreground">orchestration</strong> of the entire developer
                      lifecycle.
                    </p>
                  </blockquote>
                </div>
              </CardContent>
            </Card>
          </section>

          <footer class="arch-rule mt-24 md:mt-32" />
          <p class="mt-8 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Dev-Centr · DOS
          </p>
        </main>
      </div>
    </div>
  );
}
