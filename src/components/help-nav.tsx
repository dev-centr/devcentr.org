import { NavTreeDropdown } from "~/components/nav-tree-dropdown";

const helpChildren = [
  { href: "/status", label: "Status" },
  {
    href: "https://github.com/orgs/dev-centr/discussions",
    label: "Discussions",
    external: true,
  },
] as const;

export function HelpNav() {
  return (
    <NavTreeDropdown
      label="Help"
      ariaLabel="Help menu"
      root={{ href: "/help", label: "Help" }}
      children={[...helpChildren]}
    />
  );
}
