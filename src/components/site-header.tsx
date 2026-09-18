import { ModeToggle } from "~/components/mode-toggle";
import { HelpNav } from "~/components/help-nav";
import { LinksNav } from "~/components/links-nav";
import { LogoMark } from "~/components/logo-mark";
import { NavDropdown } from "~/components/nav-dropdown";

const assetsLinks = [
  { href: "/assets", label: "Assets", depth: 0 },
  { href: "/apps", label: "Apps", depth: 1 },
  { href: "/skills", label: "Skills", depth: 1 },
  { href: "/assets/standards", label: "Standards", depth: 1, treeEnd: true },
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
        <NavDropdown label="Assets" menuLabel="Assets" links={[...assetsLinks]} />
        <NavDropdown label="Updates" menuLabel="Updates" links={[...updatesLinks]} />
        <HelpNav />
        <LinksNav />
        <ModeToggle />
      </nav>
    </header>
  );
}