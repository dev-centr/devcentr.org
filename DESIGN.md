# Design system — devcentr.org

## Direction

**Control plane.** Cool steel neutrals, teal signal color, geometric type. Reads as orchestration / gravity / ops — not a newspaper, not cream-and-serif, not purple glass.

## Color

| Token | Light | Dark |
| --- | --- | --- |
| Background | Cool gray-blue `#F0F4F8` | Near-black `#0A1016` |
| Primary (signal) | Teal `#178F80` | Bright teal `#2DD4BF` |
| Foreground | Ink `#0B1520` | Soft white |
| Muted text | Slate mid | Slate mid |

## Typography

- **Display / body:** Space Grotesk
- **Meta / CTAs:** IBM Plex Mono (uppercase, tracked)

## Brand mark

Orbiting rings + rotated square hub = “center of gravity.” Assets live in `public/brand/` (mirrored in `.github` / `.github-private` `profile/`):

- `logo.svg` / `logo.png` / `logo-256.png` — transparent mark
- `logo-on-dark.svg` / `logo-on-dark.png` / `logo-on-dark-256.png` — rounded tile; upload the 256 for the GitHub org avatar
- `logo-motion.svg` — self-contained animated SVG (no player)
- `logo.riv` — interactive twin (Rive; author per `public/brand/README.adoc`)

Site chrome may also animate via CSS on inline SVG (`LogoMark` / `HeroOrbit`). Prefer the file forms when harboring or embedding outside the app.

Regenerate rasters: `pnpm run brand:raster`

## Layout rules

1. Hero is one composition: brand, one headline, one supporting line, CTA group, full-bleed orbital visual.
2. No cards in the hero. Cards only when they wrap a real interaction.
3. One job per section.
4. Motion: orbit spin, reverse orbit, hub pulse (respect `prefers-reduced-motion`).
