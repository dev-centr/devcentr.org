import { Meta, Title } from "@solidjs/meta";
import { Navigate } from "@solidjs/router";

export default function ToolchainAdvisorRedirect() {
  return (
    <>
      <Title>Toolchain Browser · DevCentr</Title>
      <Meta
        name="description"
        content="Toolchain Advisor redirected to Toolchain Browser."
      />
      <Navigate href="/toolchain-browser" />
    </>
  );
}
