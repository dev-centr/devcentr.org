import { onCleanup, onMount, type JSX } from "solid-js";

/** Circular orbit in XZ, then inclination / node, then a pitched camera. */
type PlanetDef = {
  id: string;
  label: string;
  href: string;
  radius: number;
  incl: number;
  node: number;
  period: number;
  phase: number;
  fill: string;
};

const TAU = Math.PI * 2;
/** Look-from-horizon angle: 0 = edge-on, π/2 = top-down. */
const VIEW_PITCH = (56 * Math.PI) / 180;
const SIN_PITCH = Math.sin(VIEW_PITCH);
const COS_PITCH = Math.cos(VIEW_PITCH);

const PLANETS: PlanetDef[] = [
  { id: "apps", label: "Apps", href: "/apps", radius: 0.4, incl: -0.12, node: 1.1, period: 24_000, phase: 0.31, fill: "hsl(210 22% 28%)" },
  { id: "docs", label: "Docs", href: "https://docs.devcentr.org", radius: 0.52, incl: 0.32, node: 2.2, period: 32_000, phase: 0.57, fill: "hsl(198 38% 30%)" },
  { id: "news", label: "News", href: "/news", radius: 0.62, incl: -0.22, node: 3.6, period: 28_000, phase: 0.14, fill: "hsl(168 42% 26%)" },
  { id: "changelog", label: "Changelog", href: "/changelog", radius: 0.74, incl: 0.08, node: 5.1, period: 40_000, phase: 0.72, fill: "hsl(160 28% 26%)" },
  { id: "skills", label: "Skills", href: "/skills", radius: 0.82, incl: -0.38, node: 0.9, period: -36_000, phase: 0.44, fill: "hsl(186 40% 28%)" },
  { id: "advisor", label: "Advisor", href: "/toolchain-advisor", radius: 0.91, incl: 0.28, node: 4.4, period: 46_000, phase: 0.91, fill: "hsl(174 36% 24%)" },
  { id: "github", label: "GitHub", href: "https://github.com/dev-centr", radius: 1, incl: -0.16, node: 2.8, period: 52_000, phase: 0.22, fill: "hsl(210 12% 16%)" },
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
          <ellipse cx="6.8" cy="12" rx="2.7" ry="5.5" fill="currentColor" stroke="none" />
          <path d="M7.2 6.5h9c1.4 0 2.3 1.1 2.3 2.4v6.2c0 1.3-.9 2.4-2.3 2.4h-9" />
          <path d="M6.2 8.2c.9.7.9 6.9 0 7.6" />
          <path d="M10.8 9.4h6.2M10.8 12h6.6M10.8 14.6h5.5" />
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

type Vec3 = { x: number; y: number; z: number };

function worldOnOrbit(radius: number, theta: number, incl: number, node: number): Vec3 {
  let x = radius * Math.cos(theta);
  let y = 0;
  let z = radius * Math.sin(theta);
  const ci = Math.cos(incl);
  const si = Math.sin(incl);
  const y1 = y * ci - z * si;
  const z1 = y * si + z * ci;
  const cn = Math.cos(node);
  const sn = Math.sin(node);
  return {
    x: x * cn + z1 * sn,
    y: y1,
    z: -x * sn + z1 * cn,
  };
}

/** Orthographic view of a pitched XZ orbit. +z is far (top of the ellipse). */
function project(p: Vec3, cx: number, cy: number, k: number) {
  const sx = cx + p.x * k;
  const sy = cy - (p.y * COS_PITCH + p.z * SIN_PITCH) * k;
  const depth = p.z * COS_PITCH - p.y * SIN_PITCH;
  return { sx, sy, depth };
}

export function SiteMap() {
  let root: HTMLDivElement | undefined;
  let canvas: HTMLCanvasElement | undefined;
  const bodies: (HTMLElement | undefined)[] = [];
  let raf = 0;
  let origin = 0;

  const layout = () => {
    if (!root) return { w: 0, h: 0, cx: 0, cy: 0, rMax: 1 };
    const w = root.clientWidth;
    const h = root.clientHeight;
    const rMax = Math.min(w * 0.35, (h * 0.42) / SIN_PITCH);
    return { w, h, cx: w / 2, cy: h / 2, rMax };
  };

  const drawOrbits = () => {
    if (!canvas || !root) return;
    const { w, h, cx, cy, rMax } = layout();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(w * dpr));
    canvas.height = Math.max(1, Math.round(h * dpr));
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    const hue = getComputedStyle(root).getPropertyValue("--primary").trim() || "173 72% 32%";
    ctx.strokeStyle = `hsl(${hue} / 0.38)`;
    ctx.lineWidth = Math.max(1, w * 0.0014);
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    const steps = 192;
    for (const p of PLANETS) {
      ctx.beginPath();
      for (let i = 0; i <= steps; i++) {
        const theta = (i / steps) * TAU;
        const { sx, sy } = project(worldOnOrbit(p.radius * rMax, theta, p.incl, p.node), cx, cy, 1);
        if (i === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      }
      ctx.stroke();
    }
  };

  const place = (now: number, freeze: boolean) => {
    const { cx, cy, rMax } = layout();
    if (rMax <= 1) return;
    const t = freeze ? 0 : now;
    PLANETS.forEach((p, i) => {
      const el = bodies[i];
      if (!el) return;
      const theta = p.phase * TAU + (TAU / p.period) * t;
      const world = worldOnOrbit(p.radius * rMax, theta, p.incl, p.node);
      const { sx, sy, depth } = project(world, cx, cy, 1);
      const far = Math.max(-1, Math.min(1, depth / (p.radius * rMax * COS_PITCH || 1)));
      const near = (1 - far) / 2;
      const scale = 0.5 + 0.5 * near;
      const opacity = 0.5 + 0.5 * near;
      const mag = Math.hypot(world.x, world.y, world.z) || 1;
      const litX = 50 + (-world.x / mag) * 42;
      const litY = 50 + (world.z / mag) * 38;
      el.style.setProperty("--x", `${sx - cx}px`);
      el.style.setProperty("--y", `${sy - cy}px`);
      el.style.zIndex = String(near < 0.5 ? Math.round(2 + near * 16) : Math.round(22 + (near - 0.5) * 24));
      el.style.setProperty("--scale", String(scale));
      el.style.setProperty("--opacity", String(opacity));
      el.style.setProperty("--lit-x", `${litX}%`);
      el.style.setProperty("--lit-y", `${litY}%`);
    });
  };

  onMount(() => {
    const freeze = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    origin = performance.now();
    const tick = (now: number) => {
      place(now - origin, freeze);
      if (!freeze) raf = requestAnimationFrame(tick);
    };
    const ro = new ResizeObserver(() => {
      drawOrbits();
      place(performance.now() - origin, freeze);
    });
    if (root) ro.observe(root);
    drawOrbits();
    raf = requestAnimationFrame(tick);
    onCleanup(() => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    });
  });

  return (
    <div class="solsys" ref={root} role="group" aria-label="DevCentr system">
      <canvas class="solsys-orbits" ref={canvas} aria-hidden="true" />

      <a
        class="solsys-star"
        href="https://devcentr.app"
        aria-label="DevCentr app"
      >
        <span class="solsys-star-halo" aria-hidden="true" />
        <span class="solsys-star-core" />
        <span class="solsys-star-label">DEVCENTR</span>
        <span class="solsys-label">App</span>
      </a>

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
