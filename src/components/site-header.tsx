import { ModeToggle } from "~/components/mode-toggle";
import { LogoMark } from "~/components/logo-mark";

const linkClass =
  "hidden font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground sm:inline";

export function SiteHeader(props: { brandSize?: "sm" | "md" }) {
  const markClass = () => (props.brandSize === "sm" ? "size-8 text-primary" : "size-9 text-primary");
  const nameClass = () =>
    props.brandSize === "sm"
      ? "font-display text-base font-semibold tracking-tight"
      : "font-display text-lg font-semibold tracking-tight";

  return (
    <header class="mx-auto flex max-w-6xl items-center justify-between px-6 pb-4 pt-6 md:px-10 md:pt-8">
      <a href="/" class="group flex items-center gap-3 text-foreground no-underline">
        <LogoMark class={`${markClass()} transition-transform duration-500 group-hover:rotate-12`} />
        <span class={nameClass()}>DevCentr</span>
      </a>
      <nav class="flex items-center gap-2 md:gap-3">
        <a href="/news" class={linkClass}>
          News
        </a>
        <a href="https://docs.devcentr.org" class={linkClass}>
          Docs
        </a>
        <a href="https://github.com/dev-centr" class={linkClass}>
          GitHub
        </a>
        <ModeToggle />
      </nav>
    </header>
  );
}
