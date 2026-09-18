import { For, Show } from "solid-js";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

const triggerClass =
  "hidden h-auto gap-1 border-0 bg-transparent px-0 py-0 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground shadow-none hover:bg-transparent hover:text-foreground sm:inline-flex";

const itemClass =
  "cursor-pointer font-mono text-[11px] uppercase tracking-[0.14em] focus:bg-accent focus:text-accent-foreground";

export type NavDropdownLink = {
  href: string;
  label: string;
  external?: boolean;
  /** 0 = root, 1 = child under the tree, Ã¢â‚¬Â¦ */
  depth?: number;
  /** When depth > 0, last child gets a corner; others get a tee. */
  treeEnd?: boolean;
};

function openLink(href: string, external?: boolean) {
  if (external) {
    window.open(href, "_blank", "noopener,noreferrer");
    return;
  }
  window.location.assign(href);
}

function treePrefix(depth: number, treeEnd?: boolean) {
  if (depth <= 0) return null;
  const branch = treeEnd ? 'L- ' : '|- ';
  return (
    <span class="mr-1.5 inline-block w-4 text-muted-foreground/70" aria-hidden="true">
      {branch}
    </span>
  );
}

export function NavDropdown(props: {
  label: string;
  ariaLabel?: string;
  menuLabel?: string;
  links: NavDropdownLink[];
}) {
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
      <DropdownMenuContent class="min-w-48 border-border/70 bg-popover/95 backdrop-blur-sm">
        <DropdownMenuLabel class="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {props.menuLabel ?? props.label}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <For each={props.links}>
          {(link) => (
            <DropdownMenuItem
              class={itemClass}
              classList={{
                "pl-2": (link.depth ?? 0) === 0,
                "pl-3": (link.depth ?? 0) > 0,
              }}
              onSelect={() => openLink(link.href, link.external)}
            >
              <Show when={(link.depth ?? 0) > 0}>{treePrefix(link.depth ?? 0, link.treeEnd)}</Show>
              {link.label}
            </DropdownMenuItem>
          )}
        </For>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
