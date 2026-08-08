type Point = { x: number; y: number };
export type ResolvedTheme = "light" | "dark";
type RevealDirection = "expand" | "contract";

const DURATION_MS = 450;
/** easings.net easeOutSine — used forward on both expand and contract keyframes. */
const EASING = "cubic-bezier(0.39, 0.575, 0.565, 1)";
const STYLE_ID = "theme-reveal-keyframes";
const TOGGLE_SELECTOR = "[data-theme-toggle]";
/**
 * clip-path circle % radius is relative to the reference box diagonal factor.
 * ~141% covers from a corner; 150% leaves margin for subpixels / tall snapshots.
 */
const COVER_RADIUS_PCT = 150;

/**
 * State A: theme applied on page load, or after an OS color-scheme change.
 * A→B expands from the toggle center; B→A contracts into the toggle center.
 */
let stateA: ResolvedTheme | null = null;

/**
 * Chrome initializes clip-path coord space per VT pseudo (`old` / `new`) lazily.
 * First expand (new) + first contract (old) land on a wrong origin; after idle the
 * compositor drops both and the bug returns for exactly two clicks. Warm both.
 */
let revealEngineWarm = false;
let warmInFlight: Promise<void> | null = null;
let lifecycleBound = false;

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function supportsViewTransitions(): boolean {
  return typeof document.startViewTransition === "function";
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

function bindRevealLifecycle(): void {
  if (lifecycleBound || typeof window === "undefined") return;
  lifecycleBound = true;

  // Tab freeze / discard drops Chrome's warmed VT clip state.
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      revealEngineWarm = false;
    } else {
      warmThemeRevealEngine();
    }
  });
  window.addEventListener("pageshow", () => {
    revealEngineWarm = false;
    warmThemeRevealEngine();
  });
}

/**
 * Touch both root VT pseudos once so Chrome's first real expand/contract
 * aren't the cold coordinate-space init (wrong origin × 2 clicks).
 */
export function warmThemeRevealEngine(): void {
  bindRevealLifecycle();
  if (revealEngineWarm || warmInFlight || prefersReducedMotion() || !supportsViewTransitions()) {
    return;
  }

  const root = document.documentElement;
  if (root.dataset.themeReveal === "active" || root.dataset.themeRevealWarm === "1") return;

  warmInFlight = (async () => {
    const style = document.createElement("style");
    style.id = "theme-reveal-warm";
    style.textContent = `
html[data-theme-reveal-warm="1"]::view-transition-old(root),
html[data-theme-reveal-warm="1"]::view-transition-new(root) {
  animation: none !important;
  mix-blend-mode: normal;
  opacity: 1 !important;
}
`;
    document.head.appendChild(style);
    root.dataset.themeRevealWarm = "1";

    try {
      const transition = document.startViewTransition(() => {
        /* no DOM change — still builds old/new root snapshots */
      });

      await transition.ready;
      for (const pseudo of ["::view-transition-old(root)", "::view-transition-new(root)"] as const) {
        root.animate(
          [
            { clipPath: `circle(${COVER_RADIUS_PCT}% at 50% 50%)` },
            { clipPath: `circle(${COVER_RADIUS_PCT}% at 50% 50%)` },
          ],
          { duration: 1, fill: "forwards", pseudoElement: pseudo },
        );
      }
      await transition.finished;
      revealEngineWarm = true;
    } catch {
      revealEngineWarm = false;
    } finally {
      delete root.dataset.themeRevealWarm;
      style.remove();
      warmInFlight = null;
    }
  })();
}

/**
 * A→B: new theme expands from button center.
 * B→A: old theme contracts into button center.
 * Baked CSS keyframes (not WAAPI-on-pseudo) — WAAPI cold-started wrong origins in Chrome.
 * No lvh/SCB origin shift — that drifted desktop Chrome vs Edge/Firefox.
 */
function mountRevealStyles(xPx: number, yPx: number, direction: RevealDirection): HTMLStyleElement {
  document.getElementById(STYLE_ID)?.remove();
  const style = document.createElement("style");
  style.id = STYLE_ID;

  if (direction === "contract") {
    style.textContent = `
@keyframes theme-reveal-contract {
  from { clip-path: circle(${COVER_RADIUS_PCT}% at ${xPx}px ${yPx}px); }
  to { clip-path: circle(0% at ${xPx}px ${yPx}px); }
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
  from { clip-path: circle(0% at ${xPx}px ${yPx}px); }
  to { clip-path: circle(${COVER_RADIUS_PCT}% at ${xPx}px ${yPx}px); }
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
  next: ResolvedTheme;
  toggle?: EventTarget | null;
};

export function applyThemeWithCircleReveal(apply: () => void, options: CircleRevealOptions): void {
  bindRevealLifecycle();

  if (prefersReducedMotion() || !supportsViewTransitions()) {
    apply();
    return;
  }

  const root = document.documentElement;
  // Don't start a reveal on top of an in-flight one.
  if (root.dataset.themeReveal === "active") return;

  const run = () => {
    // Re-check — another reveal may have started while we waited on warm.
    if (root.dataset.themeReveal === "active") return;

    const direction = revealDirection(options.next);
    const { x, y } = toggleCenterPx(options.toggle);

    root.dataset.themeReveal = "active";
    const style = mountRevealStyles(x, y, direction);
    const transition = document.startViewTransition(apply);

    void transition.finished.finally(() => {
      delete root.dataset.themeReveal;
      style.remove();
      revealEngineWarm = true;
    });
  };

  // Avoid concurrent VTs with an in-flight warm-up.
  if (warmInFlight) {
    void warmInFlight.finally(run);
    return;
  }

  run();
}

export function elementCenter(el: Element): Point {
  const rect = el.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
}
