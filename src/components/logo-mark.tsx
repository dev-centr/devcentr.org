/** Inline brand mark used in nav / hero. */
export function LogoMark(props: { class?: string; title?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      class={props.class}
      role="img"
      aria-label={props.title ?? "DevCentr"}
    >
      <title>{props.title ?? "DevCentr"}</title>
      <g class="orbit-spin" style={{ "transform-box": "fill-box", "transform-origin": "center" }}>
        <circle
          cx="256"
          cy="256"
          r="198"
          fill="none"
          stroke="currentColor"
          stroke-width="18"
          stroke-dasharray="42 28"
          opacity="0.55"
        />
        <circle cx="256" cy="58" r="16" fill="currentColor" />
      </g>
      <g class="orbit-spin-rev" style={{ "transform-box": "fill-box", "transform-origin": "center" }}>
        <circle
          cx="256"
          cy="256"
          r="138"
          fill="none"
          stroke="currentColor"
          stroke-width="14"
          stroke-dasharray="56 36"
          stroke-linecap="round"
          opacity="0.85"
        />
        <circle cx="430" cy="340" r="14" fill="currentColor" opacity="0.75" />
        <circle cx="82" cy="340" r="14" fill="currentColor" opacity="0.75" />
      </g>
      <circle
        cx="256"
        cy="256"
        r="82"
        fill="none"
        stroke="currentColor"
        stroke-width="10"
        opacity="0.45"
      />
      <g transform="translate(256 256) rotate(45)">
        <g class="hub-pulse" style={{ "transform-box": "fill-box", "transform-origin": "center" }}>
          <rect x="-36" y="-36" width="72" height="72" rx="10" fill="currentColor" />
        </g>
      </g>
    </svg>
  );
}
