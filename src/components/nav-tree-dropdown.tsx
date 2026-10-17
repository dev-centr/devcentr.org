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

/** Tree rails — visible on popover in light and dark without reading as heavy chrome. */
const railClass = "bg-muted-foreground/25 dark:bg-muted-foreground/50";

/** Fixed width for branch glyphs; keeps labels aligned with the root row. */
const TREE_GUTTER_PX = 20;

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

function TreeRail(props: { isFirst: boolean; isLast: boolean }) {
  const railLeft = `${TREE_GUTTER_PX / 2}px`;

  return (
    <div
      class="relative shrink-0 self-stretch"
      style={{ width: `${TREE_GUTTER_PX}px` }}
      aria-hidden="true"
    >
      <span
        class={cn("absolute w-px", railClass)}
        style={{
          left: railLeft,
          top: props.isFirst ? "0" : "-1px",
          height: props.isLast ? "50%" : "100%",
        }}
      />
      <span
        class={cn("absolute top-1/2 h-px -translate-y-px", railClass)}
        style={{
          left: railLeft,
          width: `${TREE_GUTTER_PX / 2 + 4}px`,
        }}
      />
      {props.isFirst ? (
        <span
          class={cn("absolute w-px", railClass)}
          style={{
            left: railLeft,
            top: "-6px",
            height: "6px",
          }}
        />
      ) : null}
    </div>
  );
}

function TreeChildItem(props: { link: NavTreeChildLink; isFirst: boolean; isLast: boolean }) {
  return (
    <DropdownMenuItem
      class={cn(itemClass, "mx-1 flex items-stretch gap-0 !p-0 focus:bg-accent")}
      onSelect={() => openLink(props.link.href, props.link.external)}
    >
      <TreeRail isFirst={props.isFirst} isLast={props.isLast} />
      <span class="min-w-0 flex-1 py-1.5 pr-2">{props.link.label}</span>
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
          class={cn(itemClass, "mx-1 flex items-stretch gap-0 !p-0")}
          onSelect={() => openLink(props.root.href, props.root.external)}
        >
          <div class="shrink-0" style={{ width: `${TREE_GUTTER_PX}px` }} aria-hidden="true" />
          <span class="min-w-0 flex-1 py-1.5 pr-2">{props.root.label}</span>
        </DropdownMenuItem>
        <div class="relative">
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
