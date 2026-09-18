import { NavDropdown } from "~/components/nav-dropdown";
import { SLACK_INVITE_URL } from "~/lib/site-links";

const helpLinks = [
  { href: "/help", label: "Help desk" },
  { href: "/status", label: "Status" },
  { href: SLACK_INVITE_URL, label: "Slack", external: true },
  {
    href: "https://github.com/orgs/dev-centr/discussions",
    label: "Discussions",
    external: true,
  },
] as const;

export function HelpNav() {
  return (
    <NavDropdown
      label="Help"
      ariaLabel="Help menu"
      menuLabel="Help"
      links={[...helpLinks]}
    />
  );
}