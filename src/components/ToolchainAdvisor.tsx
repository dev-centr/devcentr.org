import { ToolchainBrowser } from "@dev-centr/toolchain-browser";
import "@dev-centr/toolchain-browser/styles.css";

/** Site embed of the standalone Toolchain Browser package. */
export function ToolchainAdvisor() {
  return <ToolchainBrowser embed="site" catalogPath="/catalog/advisor.json" />;
}
