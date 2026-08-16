import { ModeToggle } from "~/components/mode-toggle";
import { CommunityNav } from "~/components/community-nav";
import { LogoMark } from "~/components/logo-mark";

const linkClass =
  "hidden font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground sm:inline";

export function SiteHeader() {
  return (
    <header class="mx-auto flex w-full max-w-6xl items-center justify-between px-6 pb-4 pt-6 md:px-10 md:pt-8">
      <a href="/" class="group flex items-center gap-3 text-foreground no-underline">
        <LogoMark class="size-9 text-primary transition-transform duration-500 group-hover:rotate-12" />
        <span class="font-display text-lg font-semibold tracking-tight">DevCentr</span>
      </a>
      <nav class="flex items-center gap-2 md:gap-3">
        <a href="/apps" class={linkClass}>
          Apps
        </a>
        <a href="/templates" class={linkClass}>
          Templates
        </a>
        <a href="/news" class={linkClass}>
          News
        </a>
        <a href="/changelog" class={linkClass}>
          Changelog
        </a>
        <a href="https://docs.devcentr.org" class={linkClass}>
          Docs
        </a>
        <CommunityNav />
        <a href="https://github.com/dev-centr" class={linkClass}>
          GitHub
        </a>
        <ModeToggle />
      </nav>
    </header>
  );
}
