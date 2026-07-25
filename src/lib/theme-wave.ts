/** CSS custom props + flag used by the polar-wave view transition. */
const WAVE_VARS = [
  "--theme-wave-x",
  "--theme-wave-y",
  "--theme-wave-rx",
  "--theme-wave-ry",
] as const;

type ThemeWavePoint = {
  x: number;
  y: number;
};

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function supportsViewTransitions(): boolean {
  return typeof document.startViewTransition === "function";
}

/**
 * End radii for an ellipse that covers the viewport from (x, y).
 * Horizontal stretch is slightly larger than vertical so the reveal reads as
 * an asymmetric polar wave rather than a perfect circle.
 */
function ellipticalCoverRadii(x: number, y: number): { rx: number; ry: number } {
  const maxX = Math.max(x, window.innerWidth - x);
  const maxY = Math.max(y, window.innerHeight - y);
  // Cover farthest corner, then bias for polar asymmetry.
  const corner = Math.hypot(maxX, maxY);
  return {
    rx: corner * 1.28,
    ry: corner * 1.05,
  };
}

function setWaveOrigin(origin: ThemeWavePoint): void {
  const { rx, ry } = ellipticalCoverRadii(origin.x, origin.y);
  const root = document.documentElement;
  root.style.setProperty("--theme-wave-x", `${origin.x}px`);
  root.style.setProperty("--theme-wave-y", `${origin.y}px`);
  root.style.setProperty("--theme-wave-rx", `${rx}px`);
  root.style.setProperty("--theme-wave-ry", `${ry}px`);
  root.dataset.themeWave = "active";
}

function clearWaveOrigin(): void {
  const root = document.documentElement;
  delete root.dataset.themeWave;
  for (const prop of WAVE_VARS) {
    root.style.removeProperty(prop);
  }
}

/**
 * Apply a theme change with an asymmetric polar-wave reveal from `origin`
 * (typically the mode-toggle button center). Falls back to an instant flip
 * when View Transitions are unavailable or reduced motion is preferred.
 */
export function applyThemeWithWave(origin: ThemeWavePoint, apply: () => void): void {
  if (prefersReducedMotion() || !supportsViewTransitions()) {
    apply();
    return;
  }

  setWaveOrigin(origin);

  const transition = document.startViewTransition(() => {
    apply();
  });

  void transition.finished.finally(() => {
    clearWaveOrigin();
  });
}

/** Center of an element in viewport coordinates. */
export function elementCenter(el: Element): ThemeWavePoint {
  const rect = el.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
}
