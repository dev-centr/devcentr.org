import { StackAdvisor } from "@dev-centr/stack-advisor";
import "@dev-centr/stack-advisor/styles.css";

/** Site embed of the standalone Stack Advisor package. */
export function StackAdvisorEmbed() {
  return <StackAdvisor embed="site" catalogPath="/catalog/advisor.json" />;
}

/** @deprecated Use StackAdvisorEmbed */
export function ToolchainAdvisor() {
  return <StackAdvisorEmbed />;
}
