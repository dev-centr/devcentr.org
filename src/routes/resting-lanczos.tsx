import { Meta, Title } from "@solidjs/meta";
import { A } from "@solidjs/router";

import { SiteFooter } from "~/components/site-footer";
import { Button } from "~/components/ui/button";

const REPO = "https://github.com/dev-centr/resting-lanczos";
const CARD_SIZES = "min(24rem, 90vw)";

export default function RestingLanczosDemoPage() {
  return (
    <>
      <Title>resting-lanczos · DevCentr</Title>
      <Meta
        name="description"
        content="Side-by-side demo: browser bilinear downscale of a huge master vs Lanczos display tiers with srcset and transform scale."
      />
      <Meta
        name="keywords"
        content="DevCentr, resting-lanczos, Lanczos, srcset, responsive images, image quality"
      />

      <main class="mx-auto max-w-6xl px-6 pb-16 pt-6 md:px-10 md:pb-24 md:pt-10">
        <p class="eyebrow text-primary">Tooling · Image pipeline</p>
        <h1 class="mt-3 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          resting-lanczos
        </h1>
        <p class="mt-4 max-w-2xl text-muted-foreground">
          Same chart, two pipelines. Left: the browser downscales a 2400w master into a small card (bilinear /
          GPU filter). Right: offline Lanczos3 tiers via <code class="text-primary">srcset</code> /
          <code class="text-primary">sizes</code>, with hover via <code class="text-primary">transform: scale()</code>
          — no mipmaps.
        </p>

        <div class="mt-6 flex flex-wrap gap-2">
          <Button
            as="a"
            href={REPO}
            target="_blank"
            rel="noopener noreferrer"
            class="rounded-md font-mono text-xs uppercase tracking-[0.16em]"
          >
            GitHub repo
          </Button>
          <Button
            as={A}
            href="/apps/products"
            variant="outline"
            class="rounded-md border-border/70 font-mono text-xs uppercase tracking-[0.16em]"
          >
            Products catalog
          </Button>
          <Button
            as="a"
            href="https://docs.devcentr.org/home/tools/resting-lanczos.html"
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            class="rounded-md font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground"
          >
            Docs note
          </Button>
        </div>

        <section
          class="mt-14 grid gap-10 md:grid-cols-2 md:gap-8"
          aria-label="Side-by-side image quality comparison"
        >
          <article class="min-w-0">
            <p class="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">01 · Naive</p>
            <h2 class="mt-2 font-display text-xl font-semibold tracking-tight md:text-2xl">
              Browser downscale
            </h2>
            <p class="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
              One 2400×1800 master forced into a ~24rem card. Layout size shrinks the bitmap every paint —
              soft text and rings.
            </p>
            <div class="rl-card group mt-6 max-w-sm">
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
            <p class="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              src = master-2400.webp · no srcset
            </p>
          </article>

          <article class="min-w-0">
            <p class="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">02 · Resting</p>
            <h2 class="mt-2 font-display text-xl font-semibold tracking-tight md:text-2xl">
              Lanczos tiers + srcset
            </h2>
            <p class="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Prebaked 400w / 800w Lanczos3 candidates. Browser picks the resting bitmap; hover only scales
              with CSS transform.
            </p>
            <div class="rl-card group mt-6 max-w-sm">
              <div class="rl-frame">
                <img
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
            <p class="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              srcset 400w, 800w · hover = scale(1.03)
            </p>
          </article>
        </section>

        <section class="mt-16 max-w-2xl border-t border-border/70 pt-10">
          <h2 class="font-display text-2xl font-semibold tracking-tight">What to look for</h2>
          <ul class="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
            <li>Mono labels and 1px grid lines stay sharper on the right at resting size.</li>
            <li>Concentric rings and the checker strip alias less when the resting bitmap matches display size.</li>
            <li>Hover the right card: layout size stays fixed — only a CSS transform runs (no live Lanczos).</li>
          </ul>
          <p class="mt-6 text-sm leading-relaxed text-muted-foreground">
            Strategy and CLIs live in{" "}
            <a href={REPO} class="text-primary underline-offset-4 hover:underline" target="_blank" rel="noopener noreferrer">
              dev-centr/resting-lanczos
            </a>
            . WebGL mipmaps are experimental and not used here.
          </p>
        </section>
      </main>

      <SiteFooter />

      <style>{`
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
