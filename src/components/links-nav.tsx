import { NavDropdown } from "~/components/nav-dropdown";
import { SLACK_INVITE_URL } from "~/lib/site-links";

const links = [
  { href: "https://github.com/dev-centr", label: "GitHub", external: true },
  { href: SLACK_INVITE_URL, label: "Slack", external: true },
] as const;

export function LinksNav() {
  return (
    <NavDropdown
      label="Links"
      ariaLabel="Links menu"
      menuLabel="Links"
      links={[...links]}
    />
  );
}