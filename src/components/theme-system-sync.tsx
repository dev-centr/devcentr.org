import { useColorMode } from "@kobalte/core";
import { onCleanup, onMount } from "solid-js";

const THEME_STORAGE_KEY = "devcentr-theme";

/**
 * When the OS light/dark preference changes, clear a manual light/dark override
 * so the app follows the system again (per devcentr theme UX).
 */
export function ThemeSystemSync() {
  const { setColorMode } = useColorMode();

  onMount(() => {
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
    };
    mql.addEventListener("change", onSchemeChange);
    onCleanup(() => mql.removeEventListener("change", onSchemeChange));
  });

  return null;
}
