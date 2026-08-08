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

/** Radius from origin to the farthest corner of a w×h box (plus subpixel fudge). */
function coverRadius(x: number, y: number, w: number, h: number): number {
  const maxX = Math.max(x, w - x);
  const maxY = Math.max(y, h - y);
  // Ceil + 1px so the circle actually clears the far corner (avoids end snap).
  return Math.ceil(Math.hypot(maxX, maxY)) + 1;
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

/** Toggle center in layout-viewport CSS pixels (not clientX/clientY). */
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
 * Snapshot Containing Block is often closer to the *large* viewport on mobile
 * (URL bar included above the layout viewport). Measuring 100lvh/lvw before the
 * transition lets us shift the clip origin and size the radius so it covers.
 *
 * Clip `at` must be px, not %: on mobile the VT root's used height can be
 * indefinite, so Y% collapses to 0 (circle pinned to the top edge) while X%
 * still tracks the button — matching the desktop-ok / mobile-broken report.
 */
function snapshotFrame(): {
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
} {
  const vw = Math.max(window.innerWidth, 1);
  const vh = Math.max(window.innerHeight, 1);
  let width = vw;
  let height = vh;

  try {
    const probe = document.createElement("div");
    probe.setAttribute("aria-hidden", "true");
    probe.style.cssText =
      "position:fixed;inset:0;width:100lvw;height:100lvh;visibility:hidden;pointer-events:none;contain:strict";
    document.documentElement.appendChild(probe);
    width = Math.max(vw, probe.offsetWidth || vw);
    height = Math.max(vh, probe.offsetHeight || vh);
    probe.remove();
  } catch {
    /* lvh/lvw unsupported — fall back to layout viewport */
  }

  return {
    width,
    height,
    offsetX: Math.max(0, width - vw),
    // Extra SCB/large-viewport height sits above the layout viewport (URL bar).
    offsetY: Math.max(0, height - vh),
  };
}

/**
 * A→B: new theme expands from button center (0 → edge).
 * B→A: old theme contracts from page edge into button center (edge → 0).
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

  if (direction === "contract") {
    style.textContent = `
@keyframes theme-reveal-contract {
  from { clip-path: circle(${rPx}px at ${xPx}px ${yPx}px); }
  to { clip-path: circle(0px at ${xPx}px ${yPx}px); }
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
  from { clip-path: circle(0px at ${xPx}px ${yPx}px); }
  to { clip-path: circle(${rPx}px at ${xPx}px ${yPx}px); }
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
  const origin = toggleCenterPx(options.toggle);
  const snap = snapshotFrame();
  const x = origin.x + snap.offsetX;
  const y = origin.y + snap.offsetY;
  const r = coverRadius(x, y, snap.width, snap.height);

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
