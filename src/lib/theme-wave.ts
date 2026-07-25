/** CSS custom props + flag used by the polar-wave view transition. */
const WAVE_VARS = [
  "--theme-wave-x",
  "--theme-wave-y",
  "--theme-wave-rx",
  "--theme-wave-ry",
  "--theme-wave-crx",
  "--theme-wave-cry",
] as const;

const VEIL_SAT_ID = "theme-wave-veil-sat";
const VEIL_DIM_ID = "theme-wave-veil-dim";
const WAVE_DURATION_MS = 580;
const WAVE_EASING = "cubic-bezier(0.22, 1, 0.36, 1)";

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

function ensureVeil(id: string, kind: "sat" | "dim"): HTMLElement {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement("div");
    el.id = id;
    el.className = `theme-wave-veil theme-wave-veil--${kind}`;
    el.setAttribute("aria-hidden", "true");
    document.body.appendChild(el);
  }
  return el;
}

function mountWaveVeils(): void {
  ensureVeil(VEIL_SAT_ID, "sat");
  ensureVeil(VEIL_DIM_ID, "dim");
}

function removeWaveVeils(): void {
  document.getElementById(VEIL_SAT_ID)?.remove();
  document.getElementById(VEIL_DIM_ID)?.remove();
}

function setWaveOrigin(origin: ThemeWavePoint): { rx: number; ry: number } {
  const { rx, ry } = ellipticalCoverRadii(origin.x, origin.y);
  const root = document.documentElement;
  root.style.setProperty("--theme-wave-x", `${origin.x}px`);
  root.style.setProperty("--theme-wave-y", `${origin.y}px`);
  root.style.setProperty("--theme-wave-rx", `${rx}px`);
  root.style.setProperty("--theme-wave-ry", `${ry}px`);
  root.style.setProperty("--theme-wave-crx", "0px");
  root.style.setProperty("--theme-wave-cry", "0px");
  root.dataset.themeWave = "active";
  return { rx, ry };
}

function clearWaveOrigin(): void {
  const root = document.documentElement;
  delete root.dataset.themeWave;
  for (const prop of WAVE_VARS) {
    root.style.removeProperty(prop);
  }
  removeWaveVeils();
}

/**
 * Expand current ellipse radii in sync with the CSS clip/mask that read
 * --theme-wave-crx/cry. Concrete px values keep @property interpolation reliable.
 */
function animateWaveRadii(rx: number, ry: number): Animation {
  return document.documentElement.animate(
    [
      {
        ["--theme-wave-crx" as string]: "0px",
        ["--theme-wave-cry" as string]: "0px",
      },
      {
        ["--theme-wave-crx" as string]: `${rx}px`,
        ["--theme-wave-cry" as string]: `${ry}px`,
      },
    ],
    {
      duration: WAVE_DURATION_MS,
      easing: WAVE_EASING,
      fill: "forwards",
    },
  );
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

  const { rx, ry } = setWaveOrigin(origin);
  let radiiAnimation: Animation | undefined;

  const transition = document.startViewTransition(() => {
    // Mount after the old snapshot so veils only exist in the new VT layer tree.
    mountWaveVeils();
    apply();
  });

  void transition.ready.then(() => {
    radiiAnimation = animateWaveRadii(rx, ry);
  });

  void transition.finished.finally(() => {
    radiiAnimation?.cancel();
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
