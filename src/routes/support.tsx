import { Navigate } from "@solidjs/router";
import { Meta, Title } from "@solidjs/meta";

/** Alias — support is a kind of help; canonical page is /help. */
export default function SupportRedirect() {
  return (
    <>
      <Title>Help · DevCentr</Title>
      <Meta name="description" content="DevCentr help — redirected to /help." />
      <Meta name="robots" content="noindex" />
      <Navigate href="/help#support" />
    </>
  );
}
