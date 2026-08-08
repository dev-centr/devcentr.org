type Point = { x: number; y: number };
export type ResolvedTheme = "light" | "dark";
type RevealDirection = "expand" | "contract";

const DURATION_MS = 450;
/** easings.net easeOutSine — used forward on both expand and contract keyframes. */
const EASING = "cubic-bezier(0.39, 0.575, 0.565, 1)";
const STYLE_ID = "theme-reveal-keyframes";
const TOGGLE_SELECTOR = "[data-theme-toggle]";
/** Inflate past the viewport corner so mobile SCB / subpixels don't end-snap. */
const RADIUS_PAD = 1.25;

/**
 * State A: theme applied on page load, or after an OS color-scheme change.
 * A→B expands from the toggle center; B→A contracts into the toggle center.
 */
let stateA: ResolvedTheme | null = null;
let revealSequence = 0;

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function supportsViewTransitions(): boolean {
  return typeof document.startViewTransition === "function";
}

/** Radius from toggle to farthest layout-viewport corner, padded for full cover. */
function coverRadius(x: number, y: number): number {
  const maxX = Math.max(x, window.innerWidth - x);
  const maxY = Math.max(y, window.innerHeight - y);
  return Math.ceil(Math.hypot(maxX, maxY) * RADIUS_PAD) + 1;
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

/** Toggle center in layout-viewport CSS pixels (never clientX/Y — 0 is valid). */
function toggleCenterPx(fromEl?: EventTarget | null): Point {
  const el =
    (fromEl instanceof Element ? fromEl : null) ??
    document.querySelector(TOGGLE_SELECTOR);

  if (el instanceof Element) {
    const rect = el.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  }

  return {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };
}

/**
 * A→B: new theme expands from button center.
 * B→A: old theme contracts into button center.
 *
 * Baked CSS px→px keyframes mounted before startViewTransition.
 * Avoid: lvh/SCB origin shifts (broke Chrome desktop), WAAPI-on-pseudo
 * (cold origin ×2), % radius (Chrome often skips the clip animation entirely),
 * and no-op warm VTs (left animation:none / skipped transitions).
 */
function mountRevealStyles(
  xPx: number,
  yPx: number,
  rPx: number,
  direction: RevealDirection,
): HTMLStyleElement {
  document.getElementById(STYLE_ID)?.remove();
  const style = document.createElement("style");
  style.id = STYLE_ID;
  const animationName = `theme-reveal-${direction}-${++revealSequence}`;

  // Round so keyframe strings stay stable for interpolation.
  const x = Math.round(xPx * 100) / 100;
  const y = Math.round(yPx * 100) / 100;
  const r = Math.round(rPx);

  if (direction === "contract") {
    style.textContent = `
@keyframes ${animationName} {
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
  animation: ${animationName} ${DURATION_MS}ms ${EASING} both;
}
`;
  } else {
    style.textContent = `
@keyframes ${animationName} {
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
  animation: ${animationName} ${DURATION_MS}ms ${EASING} both;
}
`;
  }

  document.head.appendChild(style);
  return style;
}

export type CircleRevealOptions = {
  next: ResolvedTheme;
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
  const { x, y } = toggleCenterPx(options.toggle);
  const r = coverRadius(x, y);

  root.dataset.themeReveal = "active";
  const style = mountRevealStyles(x, y, r, direction);

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
