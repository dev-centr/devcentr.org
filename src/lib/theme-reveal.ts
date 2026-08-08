type Point = { x: number; y: number };

const DURATION_MS = 450;
const EASING = "ease-in-out";

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
 * Apply a theme change with a single circular clip reveal from `origin`
 * (mode-toggle center). Concrete clip-path keyframes via WAAPI so the circle
 * is anchored to the button — CSS vars do not reliably reach VT pseudos.
 */
export function applyThemeWithCircleReveal(origin: Point, apply: () => void): void {
  if (prefersReducedMotion() || !supportsViewTransitions()) {
    apply();
    return;
  }

  const { x, y } = origin;
  const r = coverRadius(x, y);
  const root = document.documentElement;
  root.dataset.themeReveal = "active";

  const transition = document.startViewTransition(apply);

  void transition.ready.then(() => {
    root.animate(
      {
        clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`],
      },
      {
        duration: DURATION_MS,
        easing: EASING,
        fill: "both",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  });

  void transition.finished.finally(() => {
    delete root.dataset.themeReveal;
  });
}

export function elementCenter(el: Element): Point {
  const rect = el.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
}
