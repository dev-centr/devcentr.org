import { For } from "solid-js";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { cn } from "~/lib/utils";

const triggerClass =
  "hidden h-auto gap-1 border-0 bg-transparent px-0 py-0 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground shadow-none hover:bg-transparent hover:text-foreground sm:inline-flex";

const itemClass =
  "cursor-pointer font-mono text-[11px] uppercase tracking-[0.14em] focus:bg-accent focus:text-accent-foreground";

export type NavTreeChildLink = {
  href: string;
  label: string;
  external?: boolean;
};

function openLink(href: string, external?: boolean) {
  if (external) {
    window.open(href, "_blank", "noopener,noreferrer");
    return;
  }
  window.location.assign(href);
}

function TreeChildItem(props: { link: NavTreeChildLink; isFirst: boolean; isLast: boolean }) {
  return (
    <DropdownMenuItem
      class={cn(itemClass, "relative pl-4")}
      onSelect={() => openLink(props.link.href, props.link.external)}
    >
      <span
        class={cn(
          "pointer-events-none absolute left-2 w-px bg-border/60",
          props.isFirst ? "top-0" : "-top-px",
          props.isLast ? "h-[calc(50%+1px)]" : "bottom-0",
        )}
        aria-hidden="true"
      />
      <span
        class="pointer-events-none absolute left-2 top-1/2 h-px w-3 bg-border/60"
        aria-hidden="true"
      />
      {props.link.label}
    </DropdownMenuItem>
  );
}

export function NavTreeDropdown(props: {
  label: string;
  ariaLabel?: string;
  root: NavTreeChildLink;
  children: NavTreeChildLink[];
}) {
  const childCount = () => props.children.length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        as={Button<"button">}
        variant="ghost"
        size="sm"
        class={triggerClass}
        aria-label={props.ariaLabel ?? `${props.label} menu`}
      >
        {props.label}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="size-3 opacity-70"
          aria-hidden="true"
        >
          <path d="M6 9l6 6l6 -6" />
        </svg>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="min-w-48 border-border/70 bg-popover/95 p-1 backdrop-blur-sm">
        <DropdownMenuItem
          class={cn(itemClass, "mx-1")}
          onSelect={() => openLink(props.root.href, props.root.external)}
        >
          {props.root.label}
        </DropdownMenuItem>
        <div class="relative mx-1 ml-5">
          <For each={props.children}>
            {(link, index) => (
              <TreeChildItem
                link={link}
                isFirst={index() === 0}
                isLast={index() === childCount() - 1}
              />
            )}
          </For>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
