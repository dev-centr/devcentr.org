import { NavDropdown } from "~/components/nav-dropdown";

const helpLinks = [
  { href: "/help", label: "Help desk" },
  { href: "/status", label: "Status" },
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