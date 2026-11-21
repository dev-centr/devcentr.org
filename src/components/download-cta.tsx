import { For, Show, createSignal, onMount } from "solid-js";

import {
  DISTROS,
  desktopDefault,
  detectKind,
  detectedLabel,
  type DetectedKind,
  type DistroId,
} from "~/lib/detect-platform";
import {
  fetchLatestRelease,
  pickInstaller,
  pickPortable,
  type LatestRelease,
} from "~/lib/github-release";

type Props = {
  /** Shown on the primary control, e.g. "Download DevCentr". */
  label: string;
  class?: string;
  /** Anchor for in-page Download links. Omit on secondary copies. */
  anchor?: string;
  /**
   * Canonical installer URLs (setup EXE) keyed by platform.
   * Used when GitHub API fails; ignored when the latest release has no installer.
   */
  downloads?: Partial<Record<DistroId, string>>;
  /** Canonical portable-archive URLs. Zip is never the primary button. */
  portables?: Partial<Record<DistroId, string>>;
  owner?: string;
  repo?: string;
};

export function DownloadCta(props: Props) {
  const [kind, setKind] = createSignal<DetectedKind | null>(null);
  const [chosen, setChosen] = createSignal<DistroId | null>(null);
  const [release, setRelease] = createSignal<LatestRelease | null | undefined>(undefined);
  const [error, setError] = createSignal<string | null>(null);

  onMount(() => {
    void (async () => {
      try {
        const detected = await detectKind();
        setKind(detected);
        setChosen((c) => c ?? desktopDefault(detected));
      } catch {
        setKind("unknown");
      }
      if (!props.owner || !props.repo) {
        setRelease(null);
        return;
      }
      try {
        setRelease(await fetchLatestRelease(props.owner, props.repo));
      } catch (e) {
        setError(e instanceof Error ? e.message : "Could not load releases");
        setRelease(null);
      }
    })();
  });

  const selected = () => chosen();
  const installerHref = () => {
    const id = selected();
    if (!id) return undefined;
    const rel = release();
    const fromRelease = pickInstaller(rel ?? null, id);
    if (fromRelease) return fromRelease.browser_download_url;
    if (rel === undefined) return undefined;
    if (rel === null) return props.downloads?.[id];
    return undefined;
  };
  const portableHref = () => {
    const id = selected();
    if (!id) return undefined;
    const rel = release();
    const fromRelease = pickPortable(rel ?? null, id);
    if (fromRelease) return fromRelease.browser_download_url;
    if (rel === undefined) return undefined;
    return props.portables?.[id];
  };
  const detectedLine = () => {
    const k = kind();
    if (!k) return "Detecting…";
    return `${detectedLabel(k)} detected`;
  };
  const ready = () => kind() !== null && release() !== undefined;
  const installerAvailable = (id: DistroId) => {
    const rel = release();
    if (rel === undefined) return false;
    if (pickInstaller(rel, id)) return true;
    return rel === null && !!props.downloads?.[id];
  };
  const missingRelease = () => ready() && release() === null && !props.downloads?.[selected() ?? "windows-x64"];
  const missingInstaller = () => ready() && selected() != null && !installerHref() && !!portableHref();
  const missingAsset = () => ready() && selected() != null && !installerHref() && !portableHref();

  const btnClass =
    "inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 font-mono text-xs font-medium uppercase tracking-[0.16em] text-primary-foreground transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50";

  return (
    <div id={props.anchor} class={`flex flex-col items-start gap-2 ${props.class ?? ""}`}>
      <Show
        when={installerHref()}
        fallback={
          <button type="button" class={btnClass} disabled>
            {props.label}
          </button>
        }
      >
        {(url) => (
          <a class={btnClass} href={url()} rel="noopener noreferrer">
            {props.label}
          </a>
        )}
      </Show>

      <p class="text-[11px] leading-snug text-muted-foreground">{detectedLine()}</p>

      <label class="flex flex-col gap-1 text-[11px] text-muted-foreground">
        <span>Another platform</span>
        <select
          class="h-8 min-w-[12rem] rounded-md border border-border/80 bg-background/70 px-2 font-mono text-[11px] text-foreground"
          value={selected() ?? ""}
          disabled={!ready()}
          onChange={(e) => {
            const v = e.currentTarget.value;
            setChosen((DISTROS.some((d) => d.id === v) ? v : null) as DistroId | null);
          }}
        >
          <Show when={!desktopDefault(kind() ?? "unknown")}>
            <option value="">Choose a platform</option>
          </Show>
          <For each={DISTROS}>
            {(d) => (
              <option value={d.id}>
                {d.label}
                {ready() && !installerAvailable(d.id) ? " — none yet" : ""}
              </option>
            )}
          </For>
        </select>
      </label>

      <Show when={portableHref()}>
        {(url) => (
          <p class="text-[11px] leading-snug text-muted-foreground">
            <a class="underline-offset-4 hover:underline" href={url()} rel="noopener noreferrer">
              Portable zip
            </a>
            {" — no installer"}
          </p>
        )}
      </Show>

      <Show when={missingInstaller()}>
        <p class="text-[11px] text-muted-foreground">Installer not in this release yet.</p>
      </Show>
      <Show when={missingRelease()}>
        <p class="text-[11px] text-muted-foreground">No release yet.</p>
      </Show>
      <Show when={missingAsset()}>
        <p class="text-[11px] text-muted-foreground">No build for that platform yet.</p>
      </Show>
      <Show when={error()}>
        {(msg) => <p class="text-[11px] text-muted-foreground">{msg()}</p>}
      </Show>
    </div>
  );
}
