/** Shared View Transitions helpers for SPA navigations (not theme reveal). */

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function supportsViewTransitions(): boolean {
  return typeof document !== "undefined" && typeof document.startViewTransition === "function";
}

/** Run a synchronous DOM update inside a view transition when available. */
export function withViewTransition(update: () => void): void {
  if (prefersReducedMotion() || !supportsViewTransitions()) {
    update();
    return;
  }
  document.startViewTransition(update);
}

/**
 * Run an update that may suspend (route load) inside a view transition.
 * Resolves when `isBusy` becomes false (or immediately if already idle).
 */
export async function withViewTransitionAsync(
  update: () => void,
  isBusy: () => boolean,
): Promise<void> {
  if (prefersReducedMotion() || !supportsViewTransitions()) {
    update();
    return;
  }

  const transition = document.startViewTransition(async () => {
    update();
    if (!isBusy()) return;
    await new Promise<void>((resolve) => {
      const start = performance.now();
      const tick = () => {
        if (!isBusy() || performance.now() - start > 4000) {
          resolve();
          return;
        }
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  });

  try {
    await transition.finished;
  } catch {
    /* skipped / aborted */
  }
}
