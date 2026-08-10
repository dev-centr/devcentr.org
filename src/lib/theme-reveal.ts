type Point = { x: number; y: number };
export type ResolvedTheme = "light" | "dark";
type RevealDirection = "expand" | "contract";

const DURATION_MS = 450;
/** easings.net easeOutSine — same curve forward for expand and contract. */
const EASING = "cubic-bezier(0.39, 0.575, 0.565, 1)";
const TOGGLE_SELECTOR = "[data-theme-toggle]";

const REVEAL_VARS = [
  "--theme-reveal-x",
  "--theme-reveal-y",
  "--theme-reveal-rx",
  "--theme-reveal-ry",
] as const;

/**
 * State A: theme applied on page load, or after an OS color-scheme change.
 * A→B expands from the toggle center; B→A contracts into the toggle center.
 */
let stateA: ResolvedTheme | null = null;

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function supportsViewTransitions(): boolean {
  return typeof document.startViewTransition === "function";
}

/**
 * End radii for an ellipse that covers the viewport from (x, y).
 * Same asymmetric polar bias as the dual-veil wave (wider than tall) — shape
 * only; no veil layers.
 */
function ellipticalCoverRadii(x: number, y: number): { rx: number; ry: number } {
  const maxX = Math.max(x, window.innerWidth - x);
  const maxY = Math.max(y, window.innerHeight - y);
  const corner = Math.hypot(maxX, maxY);
  return {
    rx: Math.ceil(corner * 1.28) + 1,
    ry: Math.ceil(corner * 1.05) + 1,
  };
}

export function readDocumentResolvedTheme(): ResolvedTheme {
  const root = document.documentElement;
  if (root.classList.contains("dark") || root.dataset.kbTheme === "dark") return "dark";
  if (root.dataset.kbTheme === "light") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/** Record State A (load or OS scheme change). */
export function syncThemeRevealBaseline(theme: ResolvedTheme = readDocumentResolvedTheme()): void {
  stateA = theme;
}

function revealDirection(next: ResolvedTheme): RevealDirection {
  if (stateA == null) syncThemeRevealBaseline();
  return next === stateA ? "contract" : "expand";
}

/**
 * Toggle center in layout-viewport CSS pixels.
 * Prefer a concrete Element (mode-toggle); never clientX/Y — 0 is valid on
 * the left/top edge and used to look like a missing coordinate.
 */
function toggleCenterPx(fromEl?: EventTarget | null): Point {
  const el =
    (fromEl instanceof Element ? fromEl : null) ??
    document.querySelector(TOGGLE_SELECTOR);

  if (el instanceof Element) return elementCenter(el);

  return {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };
}

/**
 * Same origin path as the dual-veil wave that tracked the button on mobile
 * Chrome: bake x/y onto <html> as CSS vars, keep clip-path as a *live* style
 * on the VT pseudo (not keyframed coords), and WAAPI-animate only the radii
 * on documentElement after transition.ready.
 */
function setRevealOrigin(
  origin: Point,
  direction: RevealDirection,
  rx: number,
  ry: number,
): void {
  const root = document.documentElement;
  root.style.setProperty("--theme-reveal-x", `${origin.x}px`);
  root.style.setProperty("--theme-reveal-y", `${origin.y}px`);
  const startRx = direction === "expand" ? "0px" : `${rx}px`;
  const startRy = direction === "expand" ? "0px" : `${ry}px`;
  root.style.setProperty("--theme-reveal-rx", startRx);
  root.style.setProperty("--theme-reveal-ry", startRy);
  root.dataset.themeReveal = direction;
}

function clearRevealOrigin(): void {
  const root = document.documentElement;
  delete root.dataset.themeReveal;
  for (const prop of REVEAL_VARS) {
    root.style.removeProperty(prop);
  }
}

function animateRevealRadii(
  fromRx: number,
  fromRy: number,
  toRx: number,
  toRy: number,
): Animation {
  return document.documentElement.animate(
    [
      {
        ["--theme-reveal-rx" as string]: `${fromRx}px`,
        ["--theme-reveal-ry" as string]: `${fromRy}px`,
      },
      {
        ["--theme-reveal-rx" as string]: `${toRx}px`,
        ["--theme-reveal-ry" as string]: `${toRy}px`,
      },
    ],
    {
      duration: DURATION_MS,
      easing: EASING,
      fill: "forwards",
    },
  );
}

export type CircleRevealOptions = {
  next: ResolvedTheme;
  /** Prefer a precomputed button center (captured synchronously on click). */
  origin?: Point;
  /** Fallback when `origin` is omitted — Element or event.currentTarget. */
  toggle?: EventTarget | null;
};

export function applyThemeWithCircleReveal(apply: () => void, options: CircleRevealOptions): void {
  if (prefersReducedMotion() || !supportsViewTransitions()) {
    apply();
    return;
  }

  const root = document.documentElement;
  if (root.dataset.themeReveal) return;

  const direction = revealDirection(options.next);
  const origin = options.origin ?? toggleCenterPx(options.toggle);
  const { rx, ry } = ellipticalCoverRadii(origin.x, origin.y);

  setRevealOrigin(origin, direction, rx, ry);

  let radiusAnimation: Animation | undefined;
  const transition = document.startViewTransition(apply);

  void transition.ready
    .then(() => {
      radiusAnimation =
        direction === "expand"
          ? animateRevealRadii(0, 0, rx, ry)
          : animateRevealRadii(rx, ry, 0, 0);
    })
    .catch(() => {
      /* Transition skipped/aborted — finished handler cleans up. */
    });

  void transition.finished.finally(() => {
    radiusAnimation?.cancel();
    clearRevealOrigin();
  });
}

export function elementCenter(el: Element): Point {
  const rect = el.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
}
