import { IdeaDetail } from "~/components/idea-detail";

/** File route so GitHub Pages emits `/ideas/uniconfig/index.html` (dynamic `[slug]` prerender misses new slugs). */
export default function UniConfigIdeaPage() {
  return <IdeaDetail slug="uniconfig" />;
}
