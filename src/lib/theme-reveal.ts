type Point = { x: number; y: number };
export type ResolvedTheme = "light" | "dark";
type RevealDirection = "expand" | "contract";

const DURATION_MS = 450;
/** easings.net easeOutSine — used forward on both expand and contract keyframes. */
const EASING = "cubic-bezier(0.39, 0.575, 0.565, 1)";
const STYLE_ID = "theme-reveal-keyframes";
const TOGGLE_SELECTOR = "[data-theme-toggle]";

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

/** Radius from origin to the farthest viewport corner (covers the screen). */
function coverRadius(x: number, y: number): number {
  const maxX = Math.max(x, window.innerWidth - x);
  const maxY = Math.max(y, window.innerHeight - y);
  return Math.hypot(maxX, maxY);
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
  // Leaving A → expand; returning to A → contract.
  return next === stateA ? "contract" : "expand";
}

/** Exact center of the mode-toggle control. */
function toggleCenter(fromEl?: EventTarget | null): { xPct: number; yPct: number; rPx: number } {
  const el =
    (fromEl instanceof Element ? fromEl : null) ??
    document.querySelector(TOGGLE_SELECTOR);

  const vw = Math.max(window.innerWidth, 1);
  const vh = Math.max(window.innerHeight, 1);

  if (el instanceof Element) {
    const rect = el.getBoundingClientRect();
    const xPx = rect.left + rect.width / 2;
    const yPx = rect.top + rect.height / 2;
    return {
      xPct: (xPx / vw) * 100,
      yPct: (yPx / vh) * 100,
      rPx: coverRadius(xPx, yPx),
    };
  }

  return {
    xPct: 50,
    yPct: 50,
    rPx: coverRadius(vw / 2, vh / 2),
  };
}

/**
 * A→B: new theme expands from button center (0 → edge).
 * B→A: old theme contracts from page edge into button center (edge → 0).
 * Both keyframes play forward with easeOutSine (not animation-direction: reverse).
 */
function mountRevealStyles(
  xPct: number,
  yPct: number,
  rPx: number,
  direction: RevealDirection,
): HTMLStyleElement {
  document.getElementById(STYLE_ID)?.remove();
  const style = document.createElement("style");
  style.id = STYLE_ID;

  if (direction === "contract") {
    style.textContent = `
@keyframes theme-reveal-contract {
  from { clip-path: circle(${rPx}px at ${xPct}% ${yPct}%); }
  to { clip-path: circle(0px at ${xPct}% ${yPct}%); }
}
html[data-theme-reveal="active"]::view-transition-old(root),
html[data-theme-reveal="active"]::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}
html[data-theme-reveal="active"]::view-transition-new(root) {
  z-index: 1;
}
html[data-theme-reveal="active"]::view-transition-old(root) {
  z-index: 2;
  animation: theme-reveal-contract ${DURATION_MS}ms ${EASING} both;
}
`;
  } else {
    style.textContent = `
@keyframes theme-reveal-expand {
  from { clip-path: circle(0px at ${xPct}% ${yPct}%); }
  to { clip-path: circle(${rPx}px at ${xPct}% ${yPct}%); }
}
html[data-theme-reveal="active"]::view-transition-old(root),
html[data-theme-reveal="active"]::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}
html[data-theme-reveal="active"]::view-transition-old(root) {
  z-index: 1;
}
html[data-theme-reveal="active"]::view-transition-new(root) {
  z-index: 2;
  animation: theme-reveal-expand ${DURATION_MS}ms ${EASING} both;
}
`;
  }

  document.head.appendChild(style);
  return style;
}

export type CircleRevealOptions = {
  /** Resolved theme being applied (B when leaving A, A when returning). */
  next: ResolvedTheme;
  /** Mode-toggle element — origin is its exact center. */
  toggle?: EventTarget | null;
};

export function applyThemeWithCircleReveal(apply: () => void, options: CircleRevealOptions): void {
  if (prefersReducedMotion() || !supportsViewTransitions()) {
    apply();
    return;
  }

  const root = document.documentElement;
  if (root.dataset.themeReveal === "active") return;

  const direction = revealDirection(options.next);
  const { xPct, yPct, rPx } = toggleCenter(options.toggle);
  const style = mountRevealStyles(xPct, yPct, rPx, direction);
  root.dataset.themeReveal = "active";

  const transition = document.startViewTransition(apply);

  void transition.finished.finally(() => {
    delete root.dataset.themeReveal;
    style.remove();
  });
}

export function elementCenter(el: Element): Point {
  const rect = el.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
}
