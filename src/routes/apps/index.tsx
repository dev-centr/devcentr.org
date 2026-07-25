import { createSignal, For } from "solid-js";
import { SiteFooter } from "~/components/site-footer";
import { SiteHeader } from "~/components/site-header";

type PaneId = "products" | "services" | "standards";

const panes: {
  id: PaneId;
  label: string;
  blurb: string;
  href: string;
  tone: string;
}[] = [
  {
    id: "products",
    label: "Products",
    blurb: "Installable tools you run on a machine—apps, CLIs, and generators.",
    href: "/apps/products",
    tone: "from-primary/25 via-transparent to-transparent",
  },
  {
    id: "services",
    label: "Services",
    blurb: "Hosted surfaces—browse, publish, account-backed workflows.",
    href: "/apps/services",
    tone: "from-foreground/10 via-transparent to-transparent",
  },
  {
    id: "standards",
    label: "Standards",
    blurb: "Specs and formats the ecosystem endorses and ships against.",
    href: "/apps/standards",
    tone: "from-accent-foreground/20 via-transparent to-transparent",
  },
];

export default function AppsGate() {
  const [active, setActive] = createSignal<PaneId | null>(null);

  const flexFor = (id: PaneId) => {
    const a = active();
    if (!a) return 1;
    return a === id ? 1.55 : 0.72;
  };

  return (
    <div class="plane-surface relative min-h-dvh">
      <div class="relative z-10 flex min-h-dvh min-w-0 flex-col overflow-x-clip">
        <SiteHeader brandSize="sm" />

        <main class="flex min-w-0 flex-1 flex-col">
          <div class="mx-auto w-full max-w-6xl px-6 pt-6 md:px-10">
            <p class="eyebrow">Catalog</p>
            <h1 class="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">Apps</h1>
            <p class="mt-3 max-w-xl text-muted-foreground">
              Choose a category. Products, services, and standards stay separate on purpose.
            </p>
          </div>

          <div
            class="apps-gate mt-10 flex min-h-[min(70vh,40rem)] min-w-0 flex-1 flex-col md:mt-14 md:flex-row"
            onMouseLeave={() => setActive(null)}
          >
            <For each={panes}>
              {(pane, index) => {
                const blurbOpen = () => active() === null || active() === pane.id;
                const blurbEmphasis = () => active() === pane.id;
                const ctaOpen = () => active() === pane.id;

                return (
                  <a
                    href={pane.href}
                    class="apps-gate-pane group relative flex flex-col justify-end overflow-hidden border-border/70 no-underline transition-[flex] duration-500 ease-out md:border-y md:first:border-l md:last:border-r"
                    classList={{
                      "border-t": true,
                      "border-b md:border-b": true,
                      "apps-gate-pane--skew": index() < panes.length - 1,
                    }}
                    style={{ flex: flexFor(pane.id) }}
                    onMouseEnter={() => setActive(pane.id)}
                    onFocus={() => setActive(pane.id)}
                  >
                    <div
                      class={`pointer-events-none absolute inset-0 bg-gradient-to-br ${pane.tone} opacity-80 transition-opacity duration-500 group-hover:opacity-100`}
                      aria-hidden="true"
                    />
                    <div class="relative z-10 p-8 md:p-10 lg:p-12">
                      <p class="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                        0{index() + 1}
                      </p>
                      <h2 class="mt-3 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                        {pane.label}
                      </h2>
                      <div
                        class="apps-gate-reveal"
                        classList={{
                          "is-open": blurbOpen(),
                          "is-emphasis": blurbEmphasis(),
                        }}
                        aria-hidden={!blurbOpen()}
                      >
                        <div class="apps-gate-reveal-inner">
                          <p class="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground md:text-base">
                            {pane.blurb}
                          </p>
                        </div>
                      </div>
                      <div
                        class="apps-gate-reveal"
                        classList={{
                          "is-open": ctaOpen(),
                          "is-emphasis": ctaOpen(),
                        }}
                        aria-hidden={!ctaOpen()}
                      >
                        <div class="apps-gate-reveal-inner">
                          <span class="mt-8 inline-flex font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
                            Open catalogue →
                          </span>
                        </div>
                      </div>
                    </div>
                  </a>
                );
              }}
            </For>
          </div>

          <SiteFooter />
        </main>
      </div>
    </div>
  );
}
