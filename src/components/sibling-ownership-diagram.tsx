import { ProgressiveDiagram } from "./progressive-diagram";

export function SiblingOwnershipDiagram(props: { class?: string }) {
  return (
    <ProgressiveDiagram
      class={props.class}
      src="/media/diagrams/sibling-ownership.svg"
      alt="DevCentr owns toolchain lifecycle policy while OpenShellOrg owns entrypoint resolution, installation, and re-execution."
      caption="Same pathology, two altitudes — cross-link, do not fork competing essays."
    />
  );
}
