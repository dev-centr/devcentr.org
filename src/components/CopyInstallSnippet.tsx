import { createSignal, type Component } from "solid-js";
import { Button } from "~/components/ui/button";

/** Plain-English agent prompt block: monospace text + copy-all. */
export const CopyInstallSnippet: Component<{ label?: string; text: string }> = (props) => {
  const [copied, setCopied] = createSignal(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(props.text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div class="install-snippet">
      <div class="install-snippet-head">
        <span class="install-snippet-label">{props.label ?? "Agent prompt"}</span>
        <Button
          variant="outline"
          class="rounded-md font-mono text-xs uppercase tracking-[0.16em]"
          onClick={() => void copy()}
        >
          {copied() ? "Copied" : "Copy"}
        </Button>
      </div>
      <pre class="install-snippet-body">
        <code>{props.text}</code>
      </pre>
    </div>
  );
};
