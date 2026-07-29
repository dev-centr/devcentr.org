/** Sibling ownership: DevCentr lifecycle vs OpenShellOrg entrypoint dispatch. */
export function SiblingOwnershipDiagram(props: { class?: string }) {
  return (
    <figure class={`diagram-figure ${props.class ?? ""}`}>
      <svg
        class="diagram-svg"
        viewBox="0 0 720 280"
        role="img"
        aria-labelledby="sib-title sib-desc"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title id="sib-title">DevCentr and OpenShellOrg ownership split</title>
        <desc id="sib-desc">
          DevCentr owns toolchain lifecycle philosophy and control plane. OpenShellOrg owns
          auto-install and re-exec at the shell entrypoint.
        </desc>

        <rect x="16" y="16" width="688" height="248" rx="14" fill="var(--diagram-surface)" stroke="var(--diagram-border)" />

        <g font-family="var(--diagram-font, ui-sans-serif, system-ui, sans-serif)">
          <rect x="40" y="48" width="280" height="180" rx="12" fill="var(--diagram-accent-soft)" stroke="var(--diagram-accent)" stroke-width="2" />
          <text x="180" y="78" text-anchor="middle" font-size="14" font-weight="700" fill="var(--diagram-accent)">
            DevCentr
          </text>
          <text x="180" y="108" text-anchor="middle" font-size="13" fill="var(--diagram-ink)">
            Toolchain Management
          </text>
          <text x="180" y="132" text-anchor="middle" font-size="12" fill="var(--diagram-muted)">
            Pattern → Protocol → TCoP → TCF
          </text>
          <text x="180" y="164" text-anchor="middle" font-size="12" fill="var(--diagram-ink)">
            Pin · health · repair · upgrade
          </text>
          <text x="180" y="188" text-anchor="middle" font-size="12" fill="var(--diagram-muted)">
            Lifecycle ownership
          </text>

          <rect x="400" y="48" width="280" height="180" rx="12" fill="var(--diagram-ok-soft)" stroke="var(--diagram-ok)" stroke-width="2" />
          <text x="540" y="78" text-anchor="middle" font-size="14" font-weight="700" fill="var(--diagram-ok)">
            OpenShellOrg
          </text>
          <text x="540" y="108" text-anchor="middle" font-size="13" fill="var(--diagram-ink)">
            Entrypoint Dispatch
          </text>
          <text x="540" y="132" text-anchor="middle" font-size="12" fill="var(--diagram-muted)">
            Resolve → install → re-exec
          </text>
          <text x="540" y="164" text-anchor="middle" font-size="12" fill="var(--diagram-ink)">
            Shell / CLI process boundary
          </text>
          <text x="540" y="188" text-anchor="middle" font-size="12" fill="var(--diagram-muted)">
            Invocation honesty
          </text>

          <text x="360" y="140" text-anchor="middle" font-size="18" fill="var(--diagram-edge)">
            ↔
          </text>
        </g>
      </svg>
      <figcaption class="diagram-caption">
        Same pathology, two altitudes — cross-link, do not fork competing essays.
      </figcaption>
    </figure>
  );
}
