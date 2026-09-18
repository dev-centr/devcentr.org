import { ModeToggle } from "~/components/mode-toggle";
import { HelpNav } from "~/components/help-nav";
import { LogoMark } from "~/components/logo-mark";
import { NavDropdown } from "~/components/nav-dropdown";

const linkClass =
  "hidden font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground sm:inline";

const appsLinks = [
  { href: "/apps", label: "Apps" },
  { href: "/skills", label: "Skills" },
] as const;

const updatesLinks = [
  { href: "/news", label: "News" },
  { href: "/blog", label: "Blog" },
  { href: "/changelog", label: "Changelog" },
  { href: "https://docs.devcentr.org", label: "Docs", external: true },
] as const;

export function SiteHeader() {
  return (
    <header class="mx-auto flex w-full max-w-6xl items-center justify-between px-6 pb-4 pt-6 md:px-10 md:pt-8">
      <a href="/" class="group flex items-center gap-3 text-foreground no-underline">
        <LogoMark class="size-9 text-primary transition-transform duration-500 group-hover:rotate-12" />
        <span class="font-display text-lg font-semibold tracking-tight">DevCentr</span>
      </a>
      <nav class="flex items-center gap-2 md:gap-3">
        <NavDropdown label="Apps" menuLabel="Apps" links={[...appsLinks]} />
        <NavDropdown label="Updates" menuLabel="Updates" links={[...updatesLinks]} />
        <HelpNav />
        <a href="https://github.com/dev-centr" class={linkClass}>
          GitHub
        </a>
        <ModeToggle />
      </nav>
    </header>
  );
}