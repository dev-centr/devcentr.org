import { useColorMode } from "@kobalte/core";
import { onCleanup, onMount } from "solid-js";

import { syncThemeRevealBaseline, warmThemeRevealEngine } from "~/lib/theme-reveal";

const THEME_STORAGE_KEY = "devcentr-theme";

function systemResolved(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/**
 * When the OS light/dark preference changes, clear a manual light/dark override
 * so the app follows the system again (per devcentr theme UX).
 * Also refreshes the theme-reveal baseline so reverse plays relative to the new OS state.
 */
export function ThemeSystemSync() {
  const { setColorMode } = useColorMode();

  onMount(() => {
    syncThemeRevealBaseline();

    let cancelled = false;
    const scheduleWarm = () => {
      if (cancelled) return;
      warmThemeRevealEngine();
    };
    const warmHandle =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback(scheduleWarm, { timeout: 2500 })
        : window.setTimeout(scheduleWarm, 800);

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onSchemeChange = () => {
      try {
        const stored = localStorage.getItem(THEME_STORAGE_KEY);
        if (stored === "light" || stored === "dark") {
          setColorMode("system");
        }
      } catch {
        /* ignore */
      }
      // New OS scheme becomes the baseline for forward/reverse reveal direction.
      syncThemeRevealBaseline(systemResolved());
    };
    mql.addEventListener("change", onSchemeChange);
    onCleanup(() => {
      cancelled = true;
      mql.removeEventListener("change", onSchemeChange);
      if (typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(warmHandle as number);
      } else {
        window.clearTimeout(warmHandle as number);
      }
    });
  });

  return null;
}
