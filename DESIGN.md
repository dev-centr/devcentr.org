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

Orbiting rings + rotated square hub = “center of gravity.” Assets live in `public/brand/`:

- `logo.svg` — transparent mark
- `logo-on-dark.svg` — rounded tile for dark UI / org avatar source
- `logo.png` — 1024×1024 raster
- `logo-256.png` — GitHub org avatar (upload in org Settings → Profile)

Regenerate rasters: `pnpm run brand:raster`

## Layout rules

1. Hero is one composition: brand, one headline, one supporting line, CTA group, full-bleed orbital visual.
2. No cards in the hero. Cards only when they wrap a real interaction.
3. One job per section.
4. Motion: orbit spin, reverse orbit, hub pulse (respect `prefers-reduced-motion`).
