/** Themeable toolchain architecture diagram (inline SVG; inherits CSS variables). */
export function ToolchainArchitectureDiagram(props: { class?: string }) {
  return (
    <figure class={`diagram-figure ${props.class ?? ""}`}>
      <svg
        class="diagram-svg"
        viewBox="0 0 720 420"
        role="img"
        aria-labelledby="tc-arch-title tc-arch-desc"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title id="tc-arch-title">Official toolchain architecture</title>
        <desc id="tc-arch-desc">
          Developer, IDE, or CI invokes an official entrypoint that owns pin resolve, install,
          re-exec, health, repair, and upgrade, then runs the correct runtime for the project
          without rewriting the machine default.
        </desc>

        <defs>
          <marker
            id="tc-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--diagram-edge)" />
          </marker>
        </defs>

        <rect
          x="16"
          y="16"
          width="688"
          height="388"
          rx="14"
          fill="var(--diagram-surface)"
          stroke="var(--diagram-border)"
        />

        {/* Actors */}
        <g font-family="var(--diagram-font, ui-sans-serif, system-ui, sans-serif)">
          <rect x="40" y="48" width="150" height="56" rx="10" fill="var(--diagram-card)" stroke="var(--diagram-border)" />
          <text x="115" y="74" text-anchor="middle" font-size="12" fill="var(--diagram-muted)">
            Actors
          </text>
          <text x="115" y="92" text-anchor="middle" font-size="14" font-weight="600" fill="var(--diagram-ink)">
            Dev · IDE · CI
          </text>

          {/* Control plane */}
          <rect
            x="230"
            y="40"
            width="260"
            height="200"
            rx="14"
            fill="var(--diagram-accent-soft)"
            stroke="var(--diagram-accent)"
            stroke-width="2"
          />
          <text x="360" y="68" text-anchor="middle" font-size="13" font-weight="700" fill="var(--diagram-accent)">
            Official entrypoint (TCoP)
          </text>

          <rect x="252" y="84" width="216" height="36" rx="8" fill="var(--diagram-card)" stroke="var(--diagram-border)" />
          <text x="360" y="107" text-anchor="middle" font-size="13" fill="var(--diagram-ink)">
            Resolve project pin
          </text>

          <rect x="252" y="130" width="100" height="36" rx="8" fill="var(--diagram-card)" stroke="var(--diagram-border)" />
          <text x="302" y="153" text-anchor="middle" font-size="12" fill="var(--diagram-ink)">
            Install if needed
          </text>

          <rect x="368" y="130" width="100" height="36" rx="8" fill="var(--diagram-card)" stroke="var(--diagram-border)" />
          <text x="418" y="153" text-anchor="middle" font-size="12" fill="var(--diagram-ink)">
            Re-exec
          </text>

          <rect x="252" y="176" width="216" height="44" rx="8" fill="var(--diagram-card)" stroke="var(--diagram-border)" />
          <text x="360" y="194" text-anchor="middle" font-size="11" fill="var(--diagram-muted)">
            Also owns
          </text>
          <text x="360" y="210" text-anchor="middle" font-size="12" fill="var(--diagram-ink)">
            Health · repair · upgrade
          </text>

          {/* Pin */}
          <rect x="530" y="48" width="150" height="56" rx="10" fill="var(--diagram-card)" stroke="var(--diagram-border)" />
          <text x="605" y="74" text-anchor="middle" font-size="12" fill="var(--diagram-muted)">
            Project declares
          </text>
          <text x="605" y="92" text-anchor="middle" font-size="13" font-weight="600" fill="var(--diagram-ink)">
            engines / pin file
          </text>

          {/* Runtime */}
          <rect
            x="250"
            y="280"
            width="220"
            height="56"
            rx="10"
            fill="var(--diagram-ok-soft)"
            stroke="var(--diagram-ok)"
            stroke-width="2"
          />
          <text x="360" y="306" text-anchor="middle" font-size="12" fill="var(--diagram-muted)">
            Correct major for this tree
          </text>
          <text x="360" y="324" text-anchor="middle" font-size="14" font-weight="600" fill="var(--diagram-ink)">
            Runtime / SDK
          </text>

          {/* Global default note */}
          <rect x="40" y="280" width="170" height="72" rx="10" fill="var(--diagram-card)" stroke="var(--diagram-border)" stroke-dasharray="5 4" />
          <text x="125" y="308" text-anchor="middle" font-size="12" fill="var(--diagram-muted)">
            Machine default
          </text>
          <text x="125" y="326" text-anchor="middle" font-size="13" font-weight="600" fill="var(--diagram-ink)">
            May stay on latest
          </text>
          <text x="125" y="342" text-anchor="middle" font-size="11" fill="var(--diagram-muted)">
            not mutated
          </text>

          {/* App */}
          <rect x="520" y="280" width="160" height="56" rx="10" fill="var(--diagram-card)" stroke="var(--diagram-border)" />
          <text x="600" y="314" text-anchor="middle" font-size="14" font-weight="600" fill="var(--diagram-ink)">
            Project / app
          </text>
        </g>

        {/* Edges */}
        <g fill="none" stroke="var(--diagram-edge)" stroke-width="1.75" marker-end="url(#tc-arrow)">
          <path d="M190 76 H230" />
          <path d="M530 76 H490" />
          <path d="M360 240 V280" />
          <path d="M470 308 H520" />
        </g>
        <text x="360" y="268" text-anchor="middle" font-size="11" fill="var(--diagram-muted)" font-family="var(--diagram-font, ui-sans-serif, system-ui, sans-serif)">
          auto-install + run
        </text>
      </svg>
      <figcaption class="diagram-caption">
        Official entrypoint owns pin resolve, install, re-exec, and lifecycle — global default can stay on latest.
      </figcaption>
    </figure>
  );
}
