import { AssetsNav } from "~/components/assets-nav";
import { DocsNav } from "~/components/docs-nav";
import { HelpNav } from "~/components/help-nav";
import { LinksNav } from "~/components/links-nav";
import { ModeToggle } from "~/components/mode-toggle";
import { LogoMark } from "~/components/logo-mark";

export function SiteHeader() {
  return (
    <header class="mx-auto flex w-full max-w-6xl items-center justify-between px-6 pb-4 pt-6 md:px-10 md:pt-8">
      <a href="/" class="group flex items-center gap-3 text-foreground no-underline">
        <LogoMark class="size-9 text-primary transition-transform duration-500 group-hover:rotate-12" />
        <span class="font-display text-lg font-semibold tracking-tight">DevCentr</span>
      </a>
      <nav class="flex items-center gap-2 md:gap-3">
        <AssetsNav />
        <DocsNav />
        <HelpNav />
        <LinksNav />
        <ModeToggle />
      </nav>
    </header>
  );
}
