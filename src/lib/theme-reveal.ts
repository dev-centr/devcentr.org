type Point = { x: number; y: number };
export type ResolvedTheme = "light" | "dark";
type RevealDirection = "forward" | "reverse";

const DURATION_MS = 450;
const STYLE_ID = "theme-reveal-keyframes";
const TOGGLE_SELECTOR = "[data-theme-toggle]";

/** Theme present at load (or last OS scheme change). Returning to it flips origin. */
let baselineTheme: ResolvedTheme | null = null;

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

/** Call on load and whenever the OS color-scheme baseline changes. */
export function syncThemeRevealBaseline(theme: ResolvedTheme = readDocumentResolvedTheme()): void {
  baselineTheme = theme;
}

function revealDirection(next: ResolvedTheme): RevealDirection {
  if (baselineTheme == null) syncThemeRevealBaseline();
  return next === baselineTheme ? "reverse" : "forward";
}

/**
 * Toggle center in viewport space. For "reverse" direction, use the antipode so
 * the new theme still expands with the same ease-in-out curve, just from the
 * opposite corner — not a played-backward shrink.
 */
function revealOrigin(
  fromEl: EventTarget | null | undefined,
  direction: RevealDirection,
): { xPct: number; yPct: number; rPx: number } {
  const el =
    (fromEl instanceof Element ? fromEl : null) ??
    document.querySelector(TOGGLE_SELECTOR);

  const vw = Math.max(window.innerWidth, 1);
  const vh = Math.max(window.innerHeight, 1);

  let xPx = vw / 2;
  let yPx = vh / 2;

  if (el instanceof Element) {
    const rect = el.getBoundingClientRect();
    xPx = rect.left + rect.width / 2;
    yPx = rect.top + rect.height / 2;
  }

  if (direction === "reverse") {
    xPx = vw - xPx;
    yPx = vh - yPx;
  }

  return {
    xPct: (xPx / vw) * 100,
    yPct: (yPx / vh) * 100,
    rPx: coverRadius(xPx, yPx),
  };
}

/** Same expand clip both ways — only the origin point changes for reverse. */
function mountRevealStyles(xPct: number, yPct: number, rPx: number): HTMLStyleElement {
  document.getElementById(STYLE_ID)?.remove();
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
@keyframes theme-reveal-clip {
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
  animation: theme-reveal-clip ${DURATION_MS}ms ease-in-out both;
}
`;
  document.head.appendChild(style);
  return style;
}

export type CircleRevealOptions = {
  /** Resolved theme being applied; compared to load/system baseline for direction. */
  next: ResolvedTheme;
  /** Mode-toggle element (preferred). */
  toggle?: EventTarget | null;
};

/**
 * Circular expand of the new theme. Leaving baseline: from the toggle.
 * Returning to baseline: same curve from the opposite corner of the viewport.
 */
export function applyThemeWithCircleReveal(apply: () => void, options: CircleRevealOptions): void {
  if (prefersReducedMotion() || !supportsViewTransitions()) {
    apply();
    return;
  }

  const root = document.documentElement;
  // Ignore overlapping toggles — mid-transition re-entry races VT on mobile.
  if (root.dataset.themeReveal === "active") return;

  const direction = revealDirection(options.next);
  const { xPct, yPct, rPx } = revealOrigin(options.toggle, direction);
  const style = mountRevealStyles(xPct, yPct, rPx);
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
