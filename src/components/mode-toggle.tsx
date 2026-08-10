import { useColorMode } from "@kobalte/core";

import { Button } from "~/components/ui/button";
import { applyThemeWithCircleReveal, elementCenter } from "~/lib/theme-reveal";

/** Day mark — compact disc + short rays */
function SunIcon(props: { class?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      class={props.class}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" fill="currentColor" />
      <g stroke="currentColor" stroke-width="1.75" stroke-linecap="round">
        <path d="M12 2.5v2.25M12 19.25V21.5M2.5 12h2.25M19.25 12H21.5" />
        <path d="M5.05 5.05l1.6 1.6M17.35 17.35l1.6 1.6M5.05 18.95l1.6-1.6M17.35 6.65l1.6-1.6" />
      </g>
    </svg>
  );
}

/** Night mark — crisp crescent (not the broken stock moon path) */
function MoonIcon(props: { class?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      class={props.class}
      aria-hidden="true"
    >
      <path d="M20.2 14.35A8.2 8.2 0 0 1 9.65 3.8a8.25 8.25 0 1 0 10.55 10.55Z" />
      {/* tiny satellite — echoes the brand orbit nodes */}
      <circle cx="17.5" cy="6.5" r="1.15" opacity="0.85" />
    </svg>
  );
}

export function ModeToggle() {
  const { colorMode, setColorMode } = useColorMode();

  const handleClick = (event: MouseEvent) => {
    const next = colorMode() === "dark" ? "light" : "dark";
    const target = event.currentTarget;
    if (!(target instanceof Element)) {
      setColorMode(next);
      return;
    }
    // Capture center synchronously — same as the dual-veil wave that tracked
    // the button on mobile Chrome.
    applyThemeWithCircleReveal(() => setColorMode(next), {
      next,
      origin: elementCenter(target),
    });
  };

  const isDark = () => colorMode() === "dark";

  return (
    <Button
      variant="outline"
      size="icon"
      data-theme-toggle
      class="group relative size-10 shrink-0 overflow-hidden rounded-full border-border/60 bg-background/55 text-muted-foreground shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.08)] backdrop-blur-sm transition-colors hover:border-primary/35 hover:bg-primary/8 hover:text-primary"
      onClick={handleClick}
      aria-label={isDark() ? "Use light appearance" : "Use dark appearance"}
    >
      <span class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,hsl(var(--primary)/0.16),transparent_55%)] opacity-70 transition-opacity group-hover:opacity-100" />
      <SunIcon class="relative size-[1.15rem] scale-100 rotate-0 opacity-100 transition-all duration-200 ease-out dark:scale-50 dark:-rotate-45 dark:opacity-0" />
      <MoonIcon class="absolute size-[1.15rem] scale-50 rotate-45 opacity-0 transition-all duration-200 ease-out dark:scale-100 dark:rotate-0 dark:opacity-100" />
    </Button>
  );
}
