const surfaces = [
  { href: "https://devcentr.app", label: "App" },
  { href: "/apps", label: "Apps" },
  { href: "https://docs.devcentr.org", label: "Docs" },
  { href: "/news", label: "News" },
  { href: "/changelog", label: "Changelog" },
  { href: "/skills", label: "Agent skills" },
  { href: "/toolchain-advisor", label: "Advisor" },
  { href: "https://github.com/dev-centr", label: "GitHub" },
] as const;

export function SiteMap() {
  return (
    <div class="site-map" aria-label="Site surfaces">
      <div class="site-map-ring" />
      <div class="site-map-hub">DevCentr</div>
      {surfaces.map((s, i) => (
        <div
          class="site-map-node"
          style={{ "--a": `${(i / surfaces.length) * 360 - 90}deg` } as Record<string, string>}
        >
          <a href={s.href}>{s.label}</a>
        </div>
      ))}
    </div>
  );
}
