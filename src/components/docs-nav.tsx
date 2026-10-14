import { NavDropdown } from "~/components/nav-dropdown";

const docsLinks = [
  { href: "/news", label: "News" },
  { href: "/blog", label: "Blog" },
  { href: "/changelog", label: "Changelog" },
  { href: "https://docs.devcentr.org", label: "Docs", external: true },
] as const;

export function DocsNav() {
  return <NavDropdown label="Docs" ariaLabel="Docs menu" links={[...docsLinks]} />;
}
