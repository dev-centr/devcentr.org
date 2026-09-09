import { useColorMode } from "@kobalte/core";
import { Meta, Title } from "@solidjs/meta";
import { For, createMemo, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import { PageTrail } from "~/components/page-trail";
import { SiteFooter } from "~/components/site-footer";

const REPO = "https://github.com/dev-centr/themed-svg-studio";

type PreviewMode = "host" | "adaptive" | "fixed";
type TokenKey = "canvas" | "surface" | "ink" | "accent" | "edge";
type Palette = Record<TokenKey, string>;

type TokenRow = {
  key: TokenKey;
  name: string;
  light: string;
  dark: string;
};

const modes: { id: PreviewMode; label: string; description: string }[] = [
  {
    id: "host",
    label: "Host",
    description: "Preview CSS-variable output in the current site theme.",
  },
  {
    id: "adaptive",
    label: "Adaptive",
    description: "Preview the embedded light/dark palette selected by appearance.",
  },
  {
    id: "fixed",
    label: "Fixed",
    description: "Preview one portable palette with no theme switching.",
  },
];

const bindings = [
  { element: "canvas", property: "fill", token: "diagram.color.canvas" },
  { element: "panel", property: "fill", token: "diagram.color.surface" },
  { element: "title + labels", property: "fill", token: "diagram.color.ink" },
  { element: "focus node", property: "fill", token: "diagram.color.accent" },
  { element: "connectors", property: "stroke", token: "diagram.color.edge" },
] as const;

const hostPalette: Palette = {
  canvas: "hsl(var(--background))",
  surface: "hsl(var(--card))",
  ink: "hsl(var(--foreground))",
  accent: "hsl(var(--primary))",
  edge: "hsl(var(--muted-foreground))",
};

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" class="block size-full" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17 4.9 18 5.2 18 5.2c.7 1.7.3 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z"
      />
    </svg>
  );
}

function SampleDiagram(props: { palette: Palette }) {
  return (
    <svg
      viewBox="0 0 720 430"
      role="img"
      aria-labelledby="studio-preview-title studio-preview-desc"
      class="block h-auto w-full"
    >
      <title id="studio-preview-title">Sample themed system diagram</title>
      <desc id="studio-preview-desc">
        Three connected service cards surround a central themed output node. Only color bindings change.
      </desc>
      <rect width="720" height="430" rx="24" fill={props.palette.canvas} />
      <g fill="none" stroke={props.palette.edge} stroke-width="3">
        <path d="M226 128 C304 128 302 200 360 200" />
        <path d="M494 128 C416 128 418 200 360 200" />
        <path d="M360 302 V244" />
      </g>
      <g fill={props.palette.edge}>
        <circle cx="360" cy="200" r="5" />
        <circle cx="360" cy="244" r="5" />
      </g>
      <g fill={props.palette.surface} stroke={props.palette.edge} stroke-width="2">
        <rect x="66" y="76" width="160" height="104" rx="14" />
        <rect x="494" y="76" width="160" height="104" rx="14" />
        <rect x="280" y="302" width="160" height="76" rx="14" />
      </g>
      <g fill={props.palette.ink} font-family="ui-monospace, monospace">
        <text x="88" y="112" font-size="13" opacity="0.7">SOURCE</text>
        <text x="88" y="143" font-size="21" font-weight="600">Manifest</text>
        <text x="516" y="112" font-size="13" opacity="0.7">BINDINGS</text>
        <text x="516" y="143" font-size="21" font-weight="600">Semantic roles</text>
        <text x="302" y="332" font-size="13" opacity="0.7">EXPORT</text>
        <text x="302" y="359" font-size="18" font-weight="600">Portable SVG</text>
      </g>
      <circle cx="360" cy="220" r="64" fill={props.palette.accent} />
      <path
        d="M329 220h62M360 189v62M342 202l36 36M378 202l-36 36"
        fill="none"
        stroke={props.palette.canvas}
        stroke-linecap="round"
        stroke-width="7"
      />
      <text
        x="360"
        y="287"
        fill={props.palette.ink}
        font-family="ui-monospace, monospace"
        font-size="12"
        text-anchor="middle"
      >
        THEMED OUTPUT
      </text>
    </svg>
  );
}

export default function ThemedSvgStudioPage() {
  const { colorMode } = useColorMode();
  const [mode, setMode] = createSignal<PreviewMode>("host");
  const [tokens, setTokens] = createStore<TokenRow[]>([
    { key: "canvas", name: "diagram.color.canvas", light: "#eef3f7", dark: "#0a1118" },
    { key: "surface", name: "diagram.color.surface", light: "#ffffff", dark: "#12202b" },
    { key: "ink", name: "diagram.color.ink", light: "#10202c", dark: "#e6f2f1" },
    { key: "accent", name: "diagram.color.accent", light: "#167f75", dark: "#39d3bd" },
    { key: "edge", name: "diagram.color.edge", light: "#758895", dark: "#8095a3" },
  ]);

  const isDark = () => colorMode() === "dark";
  const palette = createMemo<Palette>(() => {
    if (mode() === "host") return hostPalette;
    const field = mode() === "adaptive" && isDark() ? "dark" : "light";
    return Object.fromEntries(tokens.map((token) => [token.key, token[field]])) as Palette;
  });

  const diagnostics = createMemo(() => {
    const shared = [
      { tone: "ok", label: "5 semantic roles are bound" },
      { tone: "ok", label: "No unsafe scripts or external resources" },
    ];
    if (mode() === "host") {
      return [
        ...shared,
        { tone: "note", label: "Host variables stay unresolved in the exported artifact" },
      ];
    }
    if (mode() === "adaptive") {
      return [
        ...shared,
        { tone: "ok", label: "Light and dark palettes are complete" },
        { tone: "note", label: "prefers-color-scheme selects the embedded palette" },
      ];
    }
    return [
      ...shared,
      { tone: "note", label: "Fixed export uses the light values shown above" },
    ];
  });

  const activeMode = createMemo(() => modes.find((item) => item.id === mode()) ?? modes[0]);

  return (
    <>
      <Title>Themed SVG Studio concept · DevCentr</Title>
      <Meta
        name="description"
        content="Interactive concept demo for binding SVG presentation properties to semantic light and dark theme tokens, validating them, and choosing a portable export."
      />
      <Meta
        name="keywords"
        content="DevCentr, Themed SVG Studio, SVG, semantic tokens, light mode, dark mode, accessible diagrams"
      />

      <main class="mx-auto w-full max-w-7xl px-6 pb-20 pt-6 md:px-10 md:pb-28">
        <PageTrail
          crumbs={[
            { label: "Apps", href: "/apps" },
            { label: "Products", href: "/apps/products" },
            { label: "Themed SVG Studio" },
          ]}
        />

        <a
          href={REPO}
          target="_blank"
          rel="noopener noreferrer"
          class="mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-primary"
          aria-label="Open the Themed SVG Studio repository on GitHub"
        >
          <span class="size-5"><GitHubIcon /></span>
          GitHub repository
        </a>

        <div class="mt-8 max-w-3xl">
          <p class="eyebrow text-primary">Product concept · Theme workflow</p>
          <h1 class="mt-3 font-display text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
            Themed SVG Studio
          </h1>
          <p class="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            A web concept for preparing existing SVG artwork to work across light, dark, and host-controlled
            surfaces. Name semantic colors, bind existing presentation properties, review diagnostics, then
            export the right artifact. This demo does not edit paths or geometry; the desktop editor belongs in
            the product repository.
          </p>
        </div>

        <section class="mt-12 rounded-xl border border-border/70 bg-card/70 p-4 shadow-sm sm:p-6" aria-labelledby="studio-preview-heading">
          <div class="flex flex-col gap-3 border-b border-border/70 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p class="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">Sample document</p>
              <h2 id="studio-preview-heading" class="mt-2 font-display text-2xl font-semibold tracking-tight">
                Preview semantic output
              </h2>
            </div>
            <p class="max-w-md text-sm text-muted-foreground">
              Switch export behavior below. The site appearance drives Host and Adaptive previews.
            </p>
          </div>
          <div class="mt-6 overflow-hidden rounded-lg border border-border/70 bg-background">
            <SampleDiagram palette={palette()} />
          </div>
        </section>

        <section class="mt-8 rounded-xl border border-dashed border-border bg-background/45 p-4 sm:p-6" aria-labelledby="preview-mode-heading">
          <p class="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Demo controls</p>
          <div class="mt-2 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 id="preview-mode-heading" class="font-display text-xl font-semibold tracking-tight">
                Preview mode
              </h2>
              <p class="mt-2 max-w-xl text-sm text-muted-foreground" aria-live="polite">
                {activeMode().description}
              </p>
            </div>
            <div class="grid grid-cols-3 overflow-hidden rounded-md border border-border" role="radiogroup" aria-label="Preview mode">
              <For each={modes}>
                {(item) => (
                  <button
                    type="button"
                    role="radio"
                    aria-checked={mode() === item.id}
                    class="min-h-11 border-l border-border px-4 font-mono text-[11px] uppercase tracking-[0.14em] first:border-l-0 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    classList={{
                      "bg-primary text-primary-foreground": mode() === item.id,
                      "bg-card text-muted-foreground hover:text-foreground": mode() !== item.id,
                    }}
                    onClick={() => setMode(item.id)}
                  >
                    {item.label}
                  </button>
                )}
              </For>
            </div>
          </div>
        </section>

        <div class="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1.35fr)_minmax(19rem,0.65fr)]">
          <div class="space-y-8">
            <section class="rounded-xl border border-border/70 bg-card/70" aria-labelledby="tokens-heading">
              <div class="border-b border-border/70 p-5 sm:p-6">
                <p class="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">01 · Define</p>
                <h2 id="tokens-heading" class="mt-2 font-display text-2xl font-semibold tracking-tight">
                  Semantic tokens
                </h2>
                <p class="mt-2 text-sm text-muted-foreground">
                  Change a swatch to test the adaptive and fixed outputs. Host mode keeps using site variables.
                </p>
              </div>
              <div class="overflow-x-auto">
                <table class="w-full min-w-[36rem] border-collapse text-left">
                  <thead>
                    <tr class="border-b border-border/70 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                      <th class="px-5 py-3 font-medium sm:px-6">Token</th>
                      <th class="px-4 py-3 font-medium">Light</th>
                      <th class="px-4 py-3 font-medium">Dark</th>
                    </tr>
                  </thead>
                  <tbody>
                    <For each={tokens}>
                      {(token, index) => (
                        <tr class="border-b border-border/50 last:border-b-0">
                          <th class="px-5 py-4 font-mono text-xs font-medium text-foreground sm:px-6">{token.name}</th>
                          <td class="px-4 py-3">
                            <label class="inline-flex items-center gap-2">
                              <span class="sr-only">Light value for {token.name}</span>
                              <input
                                type="color"
                                value={token.light}
                                onInput={(event) => setTokens(index(), "light", event.currentTarget.value)}
                                class="size-9 cursor-pointer rounded border border-border bg-transparent p-1"
                              />
                              <span class="font-mono text-xs text-muted-foreground">{token.light}</span>
                            </label>
                          </td>
                          <td class="px-4 py-3">
                            <label class="inline-flex items-center gap-2">
                              <span class="sr-only">Dark value for {token.name}</span>
                              <input
                                type="color"
                                value={token.dark}
                                onInput={(event) => setTokens(index(), "dark", event.currentTarget.value)}
                                class="size-9 cursor-pointer rounded border border-border bg-transparent p-1"
                              />
                              <span class="font-mono text-xs text-muted-foreground">{token.dark}</span>
                            </label>
                          </td>
                        </tr>
                      )}
                    </For>
                  </tbody>
                </table>
              </div>
            </section>

            <section class="rounded-xl border border-border/70 bg-card/70 p-5 sm:p-6" aria-labelledby="bindings-heading">
              <p class="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">02 · Bind</p>
              <h2 id="bindings-heading" class="mt-2 font-display text-2xl font-semibold tracking-tight">
                Presentation bindings
              </h2>
              <p class="mt-2 text-sm text-muted-foreground">
                Geometry remains untouched. Each row maps an existing fill or stroke to a semantic role.
              </p>
              <ul class="mt-6 divide-y divide-border/60 border-y border-border/60">
                <For each={bindings}>
                  {(binding) => (
                    <li class="grid gap-2 py-4 text-sm sm:grid-cols-[1fr_auto_1.35fr] sm:items-center sm:gap-4">
                      <span class="font-medium text-foreground">{binding.element}</span>
                      <span class="hidden text-muted-foreground sm:inline" aria-hidden="true">→</span>
                      <span class="font-mono text-xs text-primary">
                        {binding.property}: {binding.token}
                      </span>
                    </li>
                  )}
                </For>
              </ul>
            </section>
          </div>

          <aside class="space-y-8">
            <section class="rounded-xl border border-border/70 bg-card/70 p-5 sm:p-6" aria-labelledby="diagnostics-heading">
              <p class="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">03 · Review</p>
              <h2 id="diagnostics-heading" class="mt-2 font-display text-2xl font-semibold tracking-tight">
                Diagnostics
              </h2>
              <ul class="mt-5 space-y-3" aria-live="polite">
                <For each={diagnostics()}>
                  {(diagnostic) => (
                    <li class="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                      <span
                        class="mt-1.5 size-2 shrink-0 rounded-full"
                        classList={{
                          "bg-primary": diagnostic.tone === "ok",
                          "bg-muted-foreground": diagnostic.tone === "note",
                        }}
                        aria-hidden="true"
                      />
                      {diagnostic.label}
                    </li>
                  )}
                </For>
              </ul>
            </section>

            <section class="rounded-xl border border-primary/25 bg-primary/[0.06] p-5 sm:p-6" aria-labelledby="export-heading">
              <p class="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">04 · Export</p>
              <h2 id="export-heading" class="mt-2 font-display text-2xl font-semibold tracking-tight">
                Artifact summary
              </h2>
              <dl class="mt-5 space-y-4 text-sm">
                <div class="flex items-start justify-between gap-4 border-b border-border/60 pb-3">
                  <dt class="text-muted-foreground">Artifact</dt>
                  <dd class="text-right font-mono text-xs text-foreground">
                    diagram.{mode()}.svg
                  </dd>
                </div>
                <div class="flex items-start justify-between gap-4 border-b border-border/60 pb-3">
                  <dt class="text-muted-foreground">Theme source</dt>
                  <dd class="text-right font-medium text-foreground">
                    {mode() === "host" ? "Host CSS variables" : mode() === "adaptive" ? "Embedded palettes" : "Fixed values"}
                  </dd>
                </div>
                <div class="flex items-start justify-between gap-4 border-b border-border/60 pb-3">
                  <dt class="text-muted-foreground">Bindings</dt>
                  <dd class="font-medium text-foreground">{bindings.length}</dd>
                </div>
                <div class="flex items-start justify-between gap-4">
                  <dt class="text-muted-foreground">Geometry changes</dt>
                  <dd class="font-medium text-foreground">None</dd>
                </div>
              </dl>
              <p class="mt-6 text-xs leading-relaxed text-muted-foreground">
                Concept only. Export and desktop editing are not implemented on this site.
              </p>
            </section>
          </aside>
        </div>

        <section class="mt-16 border-t border-border/70 pt-10">
          <h2 class="font-display text-2xl font-semibold tracking-tight">Continue with the product</h2>
          <p class="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Follow implementation progress, desktop-editor decisions, and the approved product mark in the
            canonical repository.
          </p>
          <a
            href={REPO}
            target="_blank"
            rel="noopener noreferrer"
            class="mt-5 inline-flex min-h-11 items-center gap-2 rounded-md bg-primary px-5 font-mono text-xs uppercase tracking-[0.16em] text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <span class="size-4"><GitHubIcon /></span>
            Open themed-svg-studio
          </a>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
