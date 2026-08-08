type Point = { x: number; y: number };

const DURATION_MS = 450;
const STYLE_ID = "theme-reveal-keyframes";

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

/**
 * Bake origin/radius into @keyframes as literal px.
 * CSS custom props and WAAPI-on-pseudo are flaky on mobile WebKit for VT.
 */
function mountRevealStyles(x: number, y: number, r: number): HTMLStyleElement {
  document.getElementById(STYLE_ID)?.remove();
  const style = document.createElement("style");
  style.id = STYLE_ID;
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
  document.head.appendChild(style);
  return style;
}

/**
 * Apply a theme change with a single circular clip reveal from `origin`
 * (tap point / mode-toggle). Styles are mounted before startViewTransition
 * so the engine always has the clip animation when the snapshots are taken.
 */
export function applyThemeWithCircleReveal(origin: Point, apply: () => void): void {
  if (prefersReducedMotion() || !supportsViewTransitions()) {
    apply();
    return;
  }

  const root = document.documentElement;
  // Ignore overlapping toggles — mid-transition re-entry races VT on mobile.
  if (root.dataset.themeReveal === "active") return;

  const { x, y } = origin;
  const style = mountRevealStyles(x, y, coverRadius(x, y));
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
