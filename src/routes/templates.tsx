import { Navigate } from "@solidjs/router";
import { Meta, Title } from "@solidjs/meta";

/** Legacy /templates — canonical page is /skills?cat=bootstrap */
export default function TemplatesRedirect() {
  return (
    <>
      <Title>Bootstrap skills · DevCentr</Title>
      <Meta
        name="description"
        content="Named SDL bootstrap profiles — redirected to Agent skills."
      />
      <Meta name="robots" content="noindex" />
      <Navigate href="/skills?cat=bootstrap" />
    </>
  );
}
