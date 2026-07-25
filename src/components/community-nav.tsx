import { For } from "solid-js";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { SLACK_INVITE_URL, STATUS_MONITOR_URL } from "~/lib/site-links";

const triggerClass =
  "hidden h-auto gap-1 border-0 bg-transparent px-0 py-0 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground shadow-none hover:bg-transparent hover:text-foreground sm:inline-flex";

const itemClass =
  "cursor-pointer font-mono text-[11px] uppercase tracking-[0.14em] focus:bg-accent focus:text-accent-foreground";

const communityLinks = [
  { href: "/help", label: "Help", external: false },
  { href: "/status", label: "Status", external: false },
  { href: STATUS_MONITOR_URL, label: "Uptime monitor", external: true },
  { href: SLACK_INVITE_URL, label: "Slack", external: true },
  {
    href: "https://github.com/dev-centr/devcentr/discussions",
    label: "Discussions",
    external: true,
  },
] as const;

function openCommunityLink(href: string, external: boolean) {
  if (external) {
    window.open(href, "_blank", "noopener,noreferrer");
    return;
  }
  window.location.assign(href);
}

export function CommunityNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        as={Button<"button">}
        variant="ghost"
        size="sm"
        class={triggerClass}
        aria-label="Community menu"
      >
        Community
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
      <DropdownMenuContent class="min-w-44 border-border/70 bg-popover/95 backdrop-blur-sm">
        <DropdownMenuLabel class="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Connect
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <For each={communityLinks}>
          {(link) => (
            <DropdownMenuItem
              class={itemClass}
              onSelect={() => openCommunityLink(link.href, link.external)}
            >
              {link.label}
            </DropdownMenuItem>
          )}
        </For>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
