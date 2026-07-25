import { Navigate } from "@solidjs/router";
import { Meta, Title } from "@solidjs/meta";

/** Legacy path — keep so old /health links still resolve. */
export default function HealthRedirect() {
  return (
    <>
      <Title>Status · DevCentr</Title>
      <Meta name="description" content="DevCentr status — redirected to /status." />
      <Meta name="robots" content="noindex" />
      <Navigate href="/status" />
    </>
  );
}
