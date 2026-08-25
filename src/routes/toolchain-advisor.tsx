import { Meta, Title } from "@solidjs/meta";
import { Navigate } from "@solidjs/router";

/** Legacy Toolchain Advisor path → Stack Advisor. */
export default function ToolchainAdvisorRedirect() {
  return (
    <>
      <Title>Stack Advisor · DevCentr</Title>
      <Meta
        name="description"
        content="Toolchain Advisor redirected to Stack Advisor."
      />
      <Navigate href="/stack-advisor" />
    </>
  );
}
