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
  "hidden h-auto gap-1 border-0 bg-transparent px-0 py-0 font-mono text-[11px] caps tracking-[0.16em] text-muted-foreground shadow-none hover:bg-transparent hover:text-foreground sm:inline-flex";

const itemClass =
  "cursor-pointer font-mono text-[11px] caps tracking-[0.14em] focus:bg-accent focus:text-accent-foreground";

const railClass = "bg-muted-foreground/25 dark:bg-muted-foreground/50";

/** Width of the wireframe column; labels start after this gap. */
const BRANCH_WIDTH_PX = 16;
/** Short vertical segment connecting the root row to the first branch. */
const ROOT_STEM_PX = 8;
/** Matches `py-1.5` on each tree row. The rail has to cross this padding or it breaks between rows. */
const ROW_PAD = "0.375rem";

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

function TreeBranchColumn(props: { isFirst: boolean; isLast: boolean; onlyChild: boolean }) {
  return (
    <div
      class="relative shrink-0 self-stretch"
      style={{ width: `${BRANCH_WIDTH_PX}px`, "min-height": "2.25rem" }}
      aria-hidden="true"
    >
      <span
        class={cn("absolute top-1/2 h-px -translate-y-1/2", railClass)}
        style={{ left: "50%", right: 0 }}
      />
      <ShowTreeVertical isFirst={props.isFirst} isLast={props.isLast} onlyChild={props.onlyChild} />
    </div>
  );
}

function ShowTreeVertical(props: { isFirst: boolean; isLast: boolean; onlyChild: boolean }) {
  const reachesRoot = props.onlyChild || props.isFirst;
  const stopsAtBranch = props.onlyChild || props.isLast;

  return (
    <span
      class={cn("absolute w-px -translate-x-1/2", railClass)}
      style={{
        left: "50%",
        top: reachesRoot ? `-${ROOT_STEM_PX}px` : `calc(-1 * ${ROW_PAD} - 1px)`,
        bottom: stopsAtBranch ? "50%" : `calc(-1 * ${ROW_PAD} - 1px)`,
      }}
    />
  );
}

function TreeChildItem(props: {
  link: NavTreeChildLink;
  isFirst: boolean;
  isLast: boolean;
  onlyChild: boolean;
}) {
  return (
    <DropdownMenuItem
      class={cn(
        itemClass,
        "flex items-center gap-2 rounded-sm !py-1.5 !pl-0 !pr-2 focus:bg-accent",
      )}
      onSelect={() => openLink(props.link.href, props.link.external)}
    >
      <TreeBranchColumn isFirst={props.isFirst} isLast={props.isLast} onlyChild={props.onlyChild} />
      <span class="min-w-0 flex-1">{props.link.label}</span>
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
        <div class="mx-1 pl-4">
          <For each={props.children}>
            {(link, index) => (
              <TreeChildItem
                link={link}
                isFirst={index() === 0}
                isLast={index() === childCount() - 1}
                onlyChild={childCount() === 1}
              />
            )}
          </For>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
