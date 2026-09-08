import { hostSvgSource, upgradeThemedSvgImages } from "@dev-centr/themed-svg/register";
import { onMount } from "solid-js";

export function ThemedNewsContent(props: { html: string }) {
  let content: HTMLDivElement | undefined;

  onMount(() => {
    if (content) {
      for (const image of content.querySelectorAll<HTMLImageElement>(".themed-svg img")) {
        const source = new URL(image.src);
        image.dataset.themedSvgSrc = hostSvgSource(source.pathname);
      }
      upgradeThemedSvgImages(content, { selector: ".themed-svg img" });
    }
  });

  return <div ref={content} class="news-prose mt-10" innerHTML={props.html} />;
}
