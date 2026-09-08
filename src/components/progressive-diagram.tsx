import { hostSvgSource, upgradeThemedSvgImages } from "@dev-centr/themed-svg/register";
import { onMount } from "solid-js";

export function ProgressiveDiagram(props: {
  alt: string;
  caption: string;
  class?: string;
  src: string;
}) {
  let figure: HTMLElement | undefined;

  onMount(() => {
    const image = figure?.querySelector("img");
    if (!image || !figure) return;
    image.dataset.themedSvgSrc = hostSvgSource(new URL(image.src).pathname);
    upgradeThemedSvgImages(figure, { selector: "img" });
  });

  return (
    <figure ref={figure} class={`diagram-figure themed-svg ${props.class ?? ""}`}>
      <img class="diagram-svg" src={props.src} alt={props.alt} loading="lazy" />
      <figcaption class="diagram-caption">{props.caption}</figcaption>
    </figure>
  );
}
