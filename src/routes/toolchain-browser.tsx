import { Meta, Title } from "@solidjs/meta";
import { Navigate } from "@solidjs/router";

/** Legacy Toolchain Browser path → Stack Advisor. */
export default function ToolchainBrowserRedirect() {
  return (
    <>
      <Title>Stack Advisor · DevCentr</Title>
      <Meta
        name="description"
        content="Toolchain Browser redirected to Stack Advisor."
      />
      <Navigate href="/stack-advisor" />
    </>
  );
}
