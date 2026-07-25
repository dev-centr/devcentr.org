import { LogoMark } from "~/components/logo-mark";

const footLink =
  "text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline";

export function SiteFooter() {
  return (
    <footer class="mx-auto max-w-6xl px-6 pb-14 md:px-10">
      <div class="flex flex-col gap-6 border-t border-border/70 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex items-center gap-3">
          <LogoMark class="size-7 text-primary" />
          <span class="font-display text-sm font-semibold tracking-tight">DevCentr</span>
        </div>
        <nav class="flex flex-wrap gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-[0.22em]">
          <a href="/news" class={footLink}>
            News
          </a>
          <a href="/health" class={footLink}>
            Service health
          </a>
          <a href="https://docs.devcentr.org" class={footLink}>
            Docs
          </a>
          <a href="https://github.com/dev-centr" class={footLink}>
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
