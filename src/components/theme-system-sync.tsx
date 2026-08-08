import { useColorMode } from "@kobalte/core";
import { onCleanup, onMount } from "solid-js";

import { syncThemeRevealBaseline } from "~/lib/theme-reveal";

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
    onCleanup(() => mql.removeEventListener("change", onSchemeChange));
  });

  return null;
}
