import { ToolchainAdvisor } from "~/components/ToolchainAdvisor";
import "~/toolchain-advisor.css";

export default function ToolchainAdvisorPage() {
  return (
    <main class="advisor-page">
      <header class="page-header">
        <h1>Toolchain Advisor</h1>
        <p>
          Choose your host environment, target platform, language, and toolchain. The same
          definitions power DevCentr desktop and this site.
        </p>
      </header>
      <ToolchainAdvisor />
    </main>
  );
}
