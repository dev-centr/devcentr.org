import { ProgressiveDiagram } from "./progressive-diagram";

export function ToolchainArchitectureDiagram(props: { class?: string }) {
  return (
    <ProgressiveDiagram
      class={props.class}
      src="/media/diagrams/toolchain-architecture.svg"
      alt="The official entrypoint resolves a project pin, installs and re-executes the correct runtime, and leaves the machine default unchanged."
      caption="Official entrypoint owns pin resolve, install, re-exec, and lifecycle — global default can stay on latest."
    />
  );
}
