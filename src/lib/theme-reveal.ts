type Point = { x: number; y: number };

const VARS = ["--theme-reveal-x", "--theme-reveal-y", "--theme-reveal-r"] as const;

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

function setRevealOrigin(origin: Point): void {
  const root = document.documentElement;
  root.style.setProperty("--theme-reveal-x", `${origin.x}px`);
  root.style.setProperty("--theme-reveal-y", `${origin.y}px`);
  root.style.setProperty("--theme-reveal-r", `${coverRadius(origin.x, origin.y)}px`);
  root.dataset.themeReveal = "active";
}

function clearRevealOrigin(): void {
  const root = document.documentElement;
  delete root.dataset.themeReveal;
  for (const prop of VARS) root.style.removeProperty(prop);
}

/**
 * Apply a theme change with a single circular clip reveal from `origin`.
 * No blend modes, masks, or overlay layers — just View Transition + clip-path.
 */
export function applyThemeWithCircleReveal(origin: Point, apply: () => void): void {
  if (prefersReducedMotion() || !supportsViewTransitions()) {
    apply();
    return;
  }

  setRevealOrigin(origin);
  const transition = document.startViewTransition(apply);
  void transition.finished.finally(clearRevealOrigin);
}

export function elementCenter(el: Element): Point {
  const rect = el.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
}
