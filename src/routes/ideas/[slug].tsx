import { useParams } from "@solidjs/router";

import { IdeaDetail } from "~/components/idea-detail";

export default function IdeaPage() {
  const params = useParams();
  return <IdeaDetail slug={params.slug ?? ""} />;
}
