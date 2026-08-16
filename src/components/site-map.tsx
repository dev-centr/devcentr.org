import { onCleanup, onMount, type JSX } from "solid-js";

type PlanetDef = {
  id: string;
  label: string;
  href: string;
  rx: number;
  ry: number;
  tilt: number;
  period: number;
  phase: number;
  fill: string;
};

const PLANETS: PlanetDef[] = [
  { id: "app", label: "App", href: "https://devcentr.app", rx: 0.2, ry: 0.09, tilt: -16, period: 18_000, phase: 0.08, fill: "hsl(173 48% 28%)" },
  { id: "apps", label: "Apps", href: "/apps", rx: 0.28, ry: 0.13, tilt: 12, period: 24_000, phase: 0.31, fill: "hsl(210 22% 28%)" },
  { id: "docs", label: "Docs", href: "https://docs.devcentr.org", rx: 0.34, ry: 0.15, tilt: -28, period: 32_000, phase: 0.57, fill: "hsl(198 38% 30%)" },
  { id: "news", label: "News", href: "/news", rx: 0.4, ry: 0.16, tilt: 22, period: 28_000, phase: 0.14, fill: "hsl(168 42% 26%)" },
  { id: "changelog", label: "Changelog", href: "/changelog", rx: 0.46, ry: 0.2, tilt: -8, period: 40_000, phase: 0.72, fill: "hsl(160 28% 26%)" },
  { id: "skills", label: "Skills", href: "/skills", rx: 0.38, ry: 0.22, tilt: 34, period: -36_000, phase: 0.44, fill: "hsl(186 40% 28%)" },
  { id: "advisor", label: "Advisor", href: "/toolchain-advisor", rx: 0.5, ry: 0.18, tilt: -34, period: 46_000, phase: 0.91, fill: "hsl(174 36% 24%)" },
  { id: "github", label: "GitHub", href: "https://github.com/dev-centr", rx: 0.54, ry: 0.24, tilt: 8, period: 52_000, phase: 0.22, fill: "hsl(210 12% 16%)" },
];

function Icon(props: { id: string }): JSX.Element {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "1.7",
    "stroke-linecap": "round" as const,
    "stroke-linejoin": "round" as const,
    "aria-hidden": "true" as const,
  };
  switch (props.id) {
    case "app":
      return (
        <svg {...common}>
          <rect x="8" y="8" width="8" height="8" rx="1.2" transform="rotate(45 12 12)" fill="currentColor" stroke="none" />
        </svg>
      );
    case "apps":
      return (
        <svg {...common}>
          <rect x="4.5" y="4.5" width="6" height="6" rx="1.2" />
          <rect x="13.5" y="4.5" width="6" height="6" rx="1.2" />
          <rect x="4.5" y="13.5" width="6" height="6" rx="1.2" />
          <rect x="13.5" y="13.5" width="6" height="6" rx="1.2" />
        </svg>
      );
    case "docs":
      return (
        <svg {...common}>
          <path d="M7 4.5h7.2L18.5 9v10.5H7z" />
          <path d="M14.2 4.5V9H18.5" />
          <path d="M9.5 13h5M9.5 16h5" />
        </svg>
      );
    case "news":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
          <path d="M12 5.2v2.1M12 16.7v2.1M5.2 12h2.1M16.7 12h2.1M7.1 7.1l1.5 1.5M15.4 15.4l1.5 1.5M16.9 7.1l-1.5 1.5M8.6 15.4l-1.5 1.5" />
        </svg>
      );
    case "changelog":
      return (
        <svg {...common}>
          <path d="M8 6.5h10M8 12h10M8 17.5h7" />
          <path d="M5 6.5h.01M5 12h.01M5 17.5h.01" />
        </svg>
      );
    case "skills":
      return (
        <svg {...common}>
          <path d="M12 4.5 13.6 9h4.7l-3.8 2.9 1.5 4.6L12 13.8 8 16.5l1.5-4.6L5.7 9h4.7z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "advisor":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="7.5" />
          <path d="M12 5.5v3M12 15.5v3M5.5 12h3M15.5 12h3" />
          <path d="M12 12 15.2 8.6" />
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
          />
        </svg>
      );
    default:
      return null;
  }
}

function ellipsePath(rx: number, ry: number, tilt: number): string {
  const a = (tilt * Math.PI) / 180;
  const steps = 72;
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const x = rx * Math.cos(t);
    const y = ry * Math.sin(t);
    const xr = x * Math.cos(a) - y * Math.sin(a);
    const yr = x * Math.sin(a) + y * Math.cos(a);
    pts.push(`${i === 0 ? "M" : "L"}${xr.toFixed(2)} ${yr.toFixed(2)}`);
  }
  pts.push("Z");
  return pts.join(" ");
}

export function SiteMap() {
  let root: HTMLDivElement | undefined;
  const bodies: (HTMLElement | undefined)[] = [];
  let raf = 0;

  const place = (now: number, freeze: boolean) => {
    if (!root) return;
    const w = root.clientWidth;
    const h = root.clientHeight;
    const cx = w / 2;
    const cy = h / 2;
    const unit = Math.min(w, h) * 0.5;
    const t = freeze ? 0 : now;

    PLANETS.forEach((p, i) => {
      const el = bodies[i];
      if (!el) return;
      const theta = p.phase * Math.PI * 2 + ((Math.PI * 2) / p.period) * t;
      const lx = p.rx * unit * Math.cos(theta);
      const ly = p.ry * unit * Math.sin(theta);
      const a = (p.tilt * Math.PI) / 180;
      const x = lx * Math.cos(a) - ly * Math.sin(a);
      const y = lx * Math.sin(a) + ly * Math.cos(a);
      const near = (Math.sin(theta) + 1) / 2;
      const scale = 0.5 + 0.5 * near;
      const opacity = 0.5 + 0.5 * near;
      const mag = Math.hypot(x, y) || 1;
      const litX = 50 + (-x / mag) * 42;
      const litY = 50 + (-y / mag) * 42;
      const z = near < 0.5 ? Math.round(2 + near * 16) : Math.round(22 + (near - 0.5) * 24);
      el.style.left = `${cx + x}px`;
      el.style.top = `${cy + y}px`;
      el.style.zIndex = String(z);
      el.style.setProperty("--near", String(near));
      el.style.setProperty("--scale", String(scale));
      el.style.setProperty("--opacity", String(opacity));
      el.style.setProperty("--lit-x", `${litX}%`);
      el.style.setProperty("--lit-y", `${litY}%`);
    });
  };

  onMount(() => {
    const freeze = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const origin = performance.now();
    const tick = (now: number) => {
      place(now - origin, freeze);
      if (!freeze) raf = requestAnimationFrame(tick);
    };
    const ro = new ResizeObserver(() => place(performance.now() - origin, freeze));
    if (root) ro.observe(root);
    raf = requestAnimationFrame(tick);
    onCleanup(() => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    });
  });

  return (
    <div class="solsys" ref={root} role="group" aria-label="DevCentr system">
      <svg class="solsys-orbits" viewBox="-1 -1 2 2" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        {PLANETS.map((p) => (
          <path d={ellipsePath(p.rx, p.ry, p.tilt)} />
        ))}
      </svg>

      <div class="solsys-star" aria-hidden="true">
        <span class="solsys-star-spikes" />
        <span class="solsys-star-core" />
        <span class="solsys-star-label">DevCentr</span>
      </div>

      {PLANETS.map((p, i) => (
        <a
          href={p.href}
          class="solsys-planet"
          ref={(el) => {
            bodies[i] = el;
          }}
          aria-label={p.label}
        >
          <span class="solsys-globe" style={{ "--fill": p.fill } as Record<string, string>}>
            <span class="solsys-icon">
              <Icon id={p.id} />
            </span>
            <span class="solsys-light" />
          </span>
          <span class="solsys-label">{p.label}</span>
        </a>
      ))}
    </div>
  );
}
