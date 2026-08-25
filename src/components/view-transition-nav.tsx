import { useBeforeLeave, useIsRouting, type BeforeLeaveEventArgs } from "@solidjs/router";
import { onCleanup } from "solid-js";

import {
  prefersReducedMotion,
  supportsViewTransitions,
  withViewTransitionAsync,
} from "~/lib/view-transitions";

/**
 * Wraps Solid Router navigations in the View Transitions API so page changes
 * crossfade. Skips when reduced motion is preferred or the API is missing.
 * Theme circle-reveal sets `data-theme-reveal` and owns root VT styling then.
 */
export function ViewTransitionNav() {
  const isRouting = useIsRouting();
  let active = false;

  useBeforeLeave((e: BeforeLeaveEventArgs) => {
    if (e.defaultPrevented || active) return;
    if (prefersReducedMotion() || !supportsViewTransitions()) return;
    // Same-document hash-only jumps should not morph the whole page.
    if (typeof e.to === "string" && e.to.startsWith("#")) return;

    e.preventDefault();
    active = true;
    void withViewTransitionAsync(() => e.retry(true), isRouting).finally(() => {
      active = false;
    });
  });

  onCleanup(() => {
    active = false;
  });

  return null;
}
