type Point = { x: number; y: number };
export type ResolvedTheme = "light" | "dark";
type RevealDirection = "forward" | "reverse";

const DURATION_MS = 450;
const STYLE_ID = "theme-reveal-keyframes";

/** Theme present at load (or last OS scheme change). Returning to it plays reverse. */
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
 * Bake origin/radius into @keyframes as literal px.
 * forward: new theme expands from the control.
 * reverse: old theme contracts into the control (returning to baseline).
 */
function mountRevealStyles(x: number, y: number, r: number, direction: RevealDirection): HTMLStyleElement {
  document.getElementById(STYLE_ID)?.remove();
  const style = document.createElement("style");
  style.id = STYLE_ID;

  if (direction === "reverse") {
    style.textContent = `
@keyframes theme-reveal-clip-reverse {
  from { clip-path: circle(${r}px at ${x}px ${y}px); }
  to { clip-path: circle(0px at ${x}px ${y}px); }
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
  animation: theme-reveal-clip-reverse ${DURATION_MS}ms ease-in-out both;
}
`;
  } else {
    style.textContent = `
@keyframes theme-reveal-clip {
  from { clip-path: circle(0px at ${x}px ${y}px); }
  to { clip-path: circle(${r}px at ${x}px ${y}px); }
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
  }

  document.head.appendChild(style);
  return style;
}

export type CircleRevealOptions = {
  /** Resolved theme being applied; compared to load/system baseline for direction. */
  next: ResolvedTheme;
};

/**
 * Apply a theme change with a single circular clip reveal from `origin`.
 * Leaving the baseline expands the new theme; returning contracts the old one away.
 */
export function applyThemeWithCircleReveal(
  origin: Point,
  apply: () => void,
  options: CircleRevealOptions,
): void {
  if (prefersReducedMotion() || !supportsViewTransitions()) {
    apply();
    return;
  }

  const root = document.documentElement;
  // Ignore overlapping toggles — mid-transition re-entry races VT on mobile.
  if (root.dataset.themeReveal === "active") return;

  const { x, y } = origin;
  const direction = revealDirection(options.next);
  const style = mountRevealStyles(x, y, coverRadius(x, y), direction);
  root.dataset.themeReveal = "active";

  const transition = document.startViewTransition(apply);

  void transition.finished.finally(() => {
    delete root.dataset.themeReveal;
    style.remove();
  });
}

/** Prefer the tap/click point so the circle emerges from the control. */
export function revealOriginFromEvent(event: MouseEvent, fallbackEl?: EventTarget | null): Point {
  if (Number.isFinite(event.clientX) && Number.isFinite(event.clientY)) {
    return { x: event.clientX, y: event.clientY };
  }
  if (fallbackEl instanceof Element) return elementCenter(fallbackEl);
  return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
}

export function elementCenter(el: Element): Point {
  const rect = el.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
}
