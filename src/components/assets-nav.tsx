import { NavTreeDropdown } from "~/components/nav-tree-dropdown";

const assetChildren = [
  { href: "/apps", label: "Apps" },
  { href: "/skills", label: "Skills" },
  { href: "/rules", label: "Rules" },
  { href: "/extensions", label: "Extensions" },
  { href: "/demos", label: "Demos" },
  { href: "/assets/standards", label: "Standards" },
] as const;

export function AssetsNav() {
  return (
    <NavTreeDropdown
      label="Assets"
      ariaLabel="Assets menu"
      root={{ href: "/assets", label: "Overview" }}
      children={[...assetChildren]}
    />
  );
}
