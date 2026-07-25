/** Full-bleed orbital field for the hero plane. */
export function HeroOrbit(props: { class?: string }) {
  return (
    <div class={`pointer-events-none absolute inset-0 overflow-hidden ${props.class ?? ""}`} aria-hidden="true">
      <svg
        class="absolute -right-[18%] top-[-12%] h-[120%] w-auto max-w-none text-primary opacity-[0.22] dark:opacity-[0.28] md:-right-[8%] md:top-[-8%]"
        viewBox="0 0 800 800"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g class="orbit-spin" style={{ "transform-origin": "400px 400px" }}>
          <circle
            cx="400"
            cy="400"
            r="340"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-dasharray="8 18"
          />
          <circle cx="400" cy="60" r="7" fill="currentColor" />
        </g>
        <g class="orbit-spin-rev" style={{ "transform-origin": "400px 400px" }}>
          <circle
            cx="400"
            cy="400"
            r="250"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-dasharray="40 28"
            opacity="0.7"
          />
          <circle cx="650" cy="400" r="9" fill="currentColor" />
          <circle cx="150" cy="400" r="6" fill="currentColor" opacity="0.7" />
        </g>
        <circle
          cx="400"
          cy="400"
          r="160"
          fill="none"
          stroke="currentColor"
          stroke-width="1"
          opacity="0.45"
        />
        <g transform="translate(400 400) rotate(45)">
          <rect
            x="-28"
            y="-28"
            width="56"
            height="56"
            rx="8"
            fill="currentColor"
            class="hub-pulse"
            style={{ "transform-box": "fill-box", "transform-origin": "center" }}
          />
        </g>
        {/* Soft radial wash */}
        <defs>
          <radialGradient id="wash" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="currentColor" stop-opacity="0.12" />
            <stop offset="70%" stop-color="currentColor" stop-opacity="0" />
          </radialGradient>
        </defs>
        <circle cx="400" cy="400" r="380" fill="url(#wash)" />
      </svg>
    </div>
  );
}
