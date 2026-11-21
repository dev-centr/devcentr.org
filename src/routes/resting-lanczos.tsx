import { Meta, Title } from "@solidjs/meta";
import { For, createSignal, onCleanup, onMount } from "solid-js";

import { Button } from "~/components/ui/button";
import { PageTrail } from "~/components/page-trail";
import { SiteFooter } from "~/components/site-footer";
import { categoryLabel, getCatalogItem } from "~/lib/apps-catalog";

const REPO = "https://github.com/dev-centr/resting-lanczos";
const CARD_SIZES = "min(24rem, 90vw)";
const MASTER_W = 2400;
const LANCZOS_TIERS = [400, 800] as const;

type LanczosTier = (typeof LANCZOS_TIERS)[number];

export default function RestingLanczosDemoPage() {
  const item = getCatalogItem("resting-lanczos");
  const [lanczosW, setLanczosW] = createSignal<LanczosTier | null>(800);
  let demoImg: HTMLImageElement | undefined;

  const readLanczosTier = () => {
    const src = demoImg?.currentSrc || demoImg?.src || "";
    if (src.includes("demo-400")) setLanczosW(400);
    else if (src.includes("demo-800")) setLanczosW(800);
  };

  onMount(() => {
    const el = demoImg;
    if (el?.complete) readLanczosTier();
    el?.addEventListener("load", readLanczosTier);
    window.addEventListener("resize", readLanczosTier);
    const ro = new ResizeObserver(readLanczosTier);
    if (el) ro.observe(el);
    onCleanup(() => {
      el?.removeEventListener("load", readLanczosTier);
      window.removeEventListener("resize", readLanczosTier);
      ro.disconnect();
    });
  });

  return (
    <>
      <Title>resting-lanczos · DevCentr</Title>
      <Meta
        name="description"
        content="Side-by-side comparison of browser bilinear downscaling against offline Lanczos3 responsive image tiers with srcset."
      />
      <Meta
        name="keywords"
        content="DevCentr, resting-lanczos, Lanczos, srcset, responsive images, image quality"
      />

      <main class="mx-auto max-w-6xl px-6 pb-16 pt-6 md:px-10 md:pb-24 md:pt-10">
        <PageTrail
          crumbs={[
            { label: "Assets", href: "/assets" }, { label: "Apps", href: "/apps" },
            { label: categoryLabel.products, href: "/apps/products" },
            { label: "resting-lanczos" },
          ]}
        />
        <p class="eyebrow mt-3 text-primary">{item?.tags ?? "Tooling · Image pipeline"}</p>
        <h1 class="mt-3 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          resting-lanczos
        </h1>
        <p class="mt-4 max-w-2xl text-muted-foreground">
          The same chart rendered two ways. On the left, the browser shrinks a 2400px master down to
          card size on the fly. On the right, pre-scaled Lanczos3 tiers are served via{" "}
          <code class="text-primary">srcset</code> and <code class="text-primary">sizes</code>,
          while hover zoom uses a lightweight <code class="text-primary">transform: scale()</code>.
        </p>

        <div class="mt-6 flex flex-wrap gap-2">
          <Button
            as="a"
            href={REPO}
            target="_blank"
            rel="noopener noreferrer"
            class="rounded-md"
          >
            GitHub repo
          </Button>
          <Button
            as="a"
            href="https://docs.devcentr.org/home/tools/resting-lanczos.html"
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            class="rounded-md text-muted-foreground"
          >
            Docs note
          </Button>
        </div>

        <section
          class="rl-compare mt-14"
          aria-label="Side-by-side image quality comparison"
        >
          <article class="rl-col min-w-0">
            <div class="rl-col-intro">
              <p class="font-mono text-[11px] caps tracking-[0.2em] text-muted-foreground">01 · Naive</p>
              <h2 class="mt-2 font-display text-xl font-semibold tracking-tight md:text-2xl">
                Browser downscale
              </h2>
              <p class="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                A single 2400×1800 master scaled down into a 24rem card at paint time, softening
                thin strokes and small labels.
              </p>
            </div>
            <div
              class="rl-col-status flex max-w-sm gap-2"
              role="status"
              aria-label="Master source width 2400w"
            >
              <span class="rl-tier is-on flex-1">{MASTER_W}w</span>
            </div>
            <div class="rl-col-card rl-card group max-w-sm">
              <div class="rl-frame">
                <img
                  src="/resting-lanczos/master-2400.webp"
                  width={2400}
                  height={1800}
                  alt="High-resolution comparison chart downscaled by the browser"
                  class="rl-img"
                  decoding="async"
                />
              </div>
            </div>
            <p class="rl-col-cap font-mono text-[11px] caps tracking-[0.14em] text-muted-foreground">
              src = master-2400.webp · no srcset
            </p>
          </article>

          <article class="rl-col min-w-0">
            <div class="rl-col-intro">
              <p class="font-mono text-[11px] caps tracking-[0.2em] text-primary">02 · Resting</p>
              <h2 class="mt-2 font-display text-xl font-semibold tracking-tight md:text-2xl">
                Lanczos tiers + srcset
              </h2>
              <p class="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                Pre-scaled 400w and 800w Lanczos3 images selected via srcset. The browser displays
                the matching bitmap at rest and zooms with CSS transform on hover.
              </p>
            </div>
            <div
              class="rl-col-status flex max-w-sm gap-2"
              role="status"
              aria-live="polite"
              aria-label="Lanczos source width currently served"
            >
              <For each={LANCZOS_TIERS}>
                {(w) => (
                  <span class="rl-tier flex-1" classList={{ "is-on": lanczosW() === w }}>
                    {w}w
                  </span>
                )}
              </For>
            </div>
            <div class="rl-col-card rl-card group max-w-sm">
              <div class="rl-frame">
                <img
                  ref={(el) => {
                    demoImg = el;
                  }}
                  src="/resting-lanczos/demo-800.webp"
                  srcset="/resting-lanczos/demo-400.webp 400w, /resting-lanczos/demo-800.webp 800w"
                  sizes={CARD_SIZES}
                  width={800}
                  height={600}
                  alt="Lanczos-tier comparison chart served via srcset"
                  class="rl-img rl-img--zoom"
                  decoding="async"
                />
              </div>
            </div>
            <p class="rl-col-cap font-mono text-[11px] caps tracking-[0.14em] text-muted-foreground">
              srcset 400w, 800w · hover = scale(1.03)
            </p>
          </article>
        </section>

        <section class="mt-16 max-w-2xl border-t border-border/70 pt-10">
          <h2 class="font-display text-2xl font-semibold tracking-tight">What to look for</h2>
          <ul class="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
            <li>Monospace labels and 1px grid lines stay noticeably crisper on the right at resting size.</li>
            <li>Concentric rings and checkerboard bands show far less aliasing when the bitmap matches the rendered box.</li>
            <li>Hovering the right card scales smoothly via CSS transform without re-rasterizing or shifting layout.</li>
          </ul>
          <p class="mt-6 text-sm leading-relaxed text-muted-foreground">
            Full methodology and build CLIs live in{" "}
            <a href={REPO} class="text-primary underline-offset-4 hover:underline" target="_blank" rel="noopener noreferrer">
              dev-centr/resting-lanczos
            </a>
            .
          </p>
        </section>
      </main>

      <SiteFooter />

      <style>{`
        .rl-compare {
          display: grid;
          gap: 2.5rem;
        }
        .rl-col {
          display: flex;
          min-width: 0;
          flex-direction: column;
          gap: 0.75rem;
        }
        @media (min-width: 768px) {
          .rl-compare {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto auto auto auto;
            column-gap: 2rem;
            row-gap: 0.75rem;
          }
          .rl-col {
            display: contents;
          }
          .rl-col-intro { grid-row: 1; }
          .rl-col-status { grid-row: 2; }
          .rl-col-card { grid-row: 3; }
          .rl-col-cap { grid-row: 4; }
        }
        .rl-card {
          background: hsl(var(--card));
          border: 1px solid hsl(var(--border) / 0.7);
          border-radius: 0.75rem;
          padding: 0.65rem;
        }
        .rl-frame {
          overflow: hidden;
          border-radius: 0.5rem;
          aspect-ratio: 4 / 3;
          background: #0b1520;
        }
        .rl-img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
        }
        .rl-img--zoom {
          transform-origin: top center;
          transition: transform 0.7s ease-out;
        }
        .rl-card:hover .rl-img--zoom {
          transform: scale(1.03);
        }
        .rl-tier {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 2.25rem;
          padding: 0 0.75rem;
          border: 1px solid hsl(var(--border) / 0.7);
          border-radius: 0.375rem;
          background: hsl(var(--background));
          color: hsl(var(--muted-foreground));
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: var(--text-case);
        }
        .rl-tier.is-on {
          background: hsl(var(--primary));
          border-color: transparent;
          color: hsl(var(--primary-foreground));
        }
        @media (prefers-reduced-motion: reduce) {
          .rl-img--zoom {
            transition: none;
          }
          .rl-card:hover .rl-img--zoom {
            transform: none;
          }
        }
      `}</style>
    </>
  );
}
