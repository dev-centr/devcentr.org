import { For, createSignal, onMount, Show } from "solid-js";
import { Meta, Title } from "@solidjs/meta";

import { SiteFooter } from "~/components/site-footer";
import { STATUS_MONITOR_URL } from "~/lib/site-links";

type ProbeResult = {
  id: string;
  name: string;
  url: string;
  detail: string;
  state: "checking" | "up" | "down" | "reachable";
  statusText: string;
  ms: number | null;
};

const SERVICES: Omit<ProbeResult, "state" | "statusText" | "ms">[] = [
  {
    id: "site",
    name: "devcentr.org",
    url: "https://devcentr.org/",
    detail: "Org landing · GitHub Pages",
  },
  {
    id: "news",
    name: "News",
    url: "https://devcentr.org/news/",
    detail: "Chronicle / engineering blog",
  },
  {
    id: "changelog",
    name: "Changelog",
    url: "https://devcentr.org/changelog/",
    detail: "Product & docs shipping notes",
  },
  {
    id: "skills",
    name: "Agent skills",
    url: "https://devcentr.org/skills/",
    detail: "Cursor skills · bootstrap profiles",
  },
  {
    id: "advisor",
    name: "Stack Advisor",
    url: "https://devcentr.org/stack-advisor/",
    detail: "Host · target · language · toolchain stack",
  },
  {
    id: "rss",
    name: "News RSS",
    url: "https://devcentr.org/news/rss.xml",
    detail: "Feed endpoint",
  },
  {
    id: "docs",
    name: "docs.devcentr.org",
    url: "https://docs.devcentr.org/",
    detail: "Antora documentation hub",
  },
  {
    id: "app",
    name: "devcentr.app",
    url: "https://devcentr.app/",
    detail: "Flagship app homepage",
  },
  {
    id: "github",
    name: "GitHub org",
    url: "https://github.com/dev-centr",
    detail: "Source and issues",
  },
];

async function probe(url: string): Promise<{ state: ProbeResult["state"]; statusText: string; ms: number }> {
  const started = performance.now();
  try {
    const res = await fetch(url, {
      method: "GET",
      mode: "cors",
      cache: "no-store",
      redirect: "follow",
    });
    const ms = Math.round(performance.now() - started);
    if (res.ok) {
      return { state: "up", statusText: `${res.status} ${res.statusText || "OK"}`, ms };
    }
    return { state: "down", statusText: `${res.status} ${res.statusText || "Error"}`, ms };
  } catch {
    // Cross-origin sites often block CORS reads even when healthy.
    try {
      const t2 = performance.now();
      await fetch(url, { method: "GET", mode: "no-cors", cache: "no-store" });
      const ms = Math.round(performance.now() - t2);
      return {
        state: "reachable",
        statusText: "Reachable (CORS opaque)",
        ms,
      };
    } catch (err) {
      const ms = Math.round(performance.now() - started);
      return {
        state: "down",
        statusText: err instanceof Error ? err.message : "Unreachable",
        ms,
      };
    }
  }
}

function stateTone(state: ProbeResult["state"]) {
  switch (state) {
    case "up":
      return "text-primary";
    case "reachable":
      return "text-foreground/80";
    case "down":
      return "text-destructive";
    default:
      return "text-muted-foreground";
  }
}

function stateLabel(state: ProbeResult["state"]) {
  switch (state) {
    case "up":
      return "Operational";
    case "reachable":
      return "Reachable";
    case "down":
      return "Down / blocked";
    default:
      return "Checking…";
  }
}

export default function StatusPage() {
  const [rows, setRows] = createSignal<ProbeResult[]>(
    SERVICES.map((s) => ({
      ...s,
      state: "checking",
      statusText: "Pending",
      ms: null,
    })),
  );
  const [checkedAt, setCheckedAt] = createSignal<string | null>(null);
  const [running, setRunning] = createSignal(false);

  const runChecks = async () => {
    setRunning(true);
    setRows((prev) =>
      prev.map((r) => ({
        ...r,
        state: "checking",
        statusText: "Checking…",
        ms: null,
      })),
    );

    const next = await Promise.all(
      SERVICES.map(async (s) => {
        const result = await probe(s.url);
        return {
          ...s,
          state: result.state,
          statusText: result.statusText,
          ms: result.ms,
        } satisfies ProbeResult;
      }),
    );

    setRows(next);
    setCheckedAt(new Date().toISOString());
    setRunning(false);
  };

  onMount(() => {
    void runChecks();
  });

  const summary = () => {
    const list = rows();
    if (list.some((r) => r.state === "checking")) return "Checking services…";
    if (list.some((r) => r.state === "down")) return "Some services need attention";
    if (list.every((r) => r.state === "up" || r.state === "reachable")) return "All probed services look healthy";
    return "Status unknown";
  };

  return (
    <>
      <Title>Status · DevCentr</Title>
      <Meta
        name="description"
        content="Live status of DevCentr public services — landing site, docs, app, news feeds, and GitHub."
      />
      <Meta name="keywords" content="DevCentr, status, uptime, health, blog, news" />
      <main class="mx-auto max-w-6xl px-6 pb-10 pt-6 md:px-10 md:pt-10">
          <p class="eyebrow text-primary">Status</p>
          <h1 class="mt-3 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Status
          </h1>
          <p class="mt-4 max-w-2xl text-muted-foreground">
            Client-side probes of public Dev-Centr endpoints. Same-origin checks report HTTP status; third-party hosts
            may only show as reachable when CORS blocks reading the response.
          </p>

          <a
            href={STATUS_MONITOR_URL}
            class="mt-6 flex flex-col gap-1 border-y border-border/70 py-5 no-underline transition-colors hover:border-primary/40 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
            target="_blank"
            rel="noreferrer"
          >
            <span class="font-display text-lg font-semibold tracking-tight text-foreground md:text-xl">
              Uptime monitor
            </span>
            <span class="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              Incidents &amp; history · status.devcentr.org →
            </span>
          </a>

          <div class="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              class="rounded-md border border-border/70 bg-background/50 px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-foreground transition-colors hover:border-primary/40 hover:text-primary disabled:opacity-50"
              disabled={running()}
              onClick={() => void runChecks()}
            >
              {running() ? "Checking…" : "Re-check"}
            </button>
            <p class={`font-display text-sm font-medium ${rows().some((r) => r.state === "down") ? "text-destructive" : "text-primary"}`}>
              {summary()}
            </p>
            <Show when={checkedAt()}>
              <p class="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Last run {checkedAt()}
              </p>
            </Show>
          </div>

          <ul class="mt-12 divide-y divide-border/70 border-y border-border/70">
            <For each={rows()}>
              {(row) => (
                <li class="grid gap-3 py-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_7rem] md:items-baseline md:gap-8">
                  <div>
                    <a
                      href={row.url}
                      class="font-display text-lg font-semibold tracking-tight text-foreground no-underline hover:text-primary"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {row.name}
                    </a>
                    <p class="mt-1 text-sm text-muted-foreground">{row.detail}</p>
                  </div>
                  <div>
                    <p class={`font-mono text-xs uppercase tracking-[0.16em] ${stateTone(row.state)}`}>
                      {stateLabel(row.state)}
                    </p>
                    <p class="mt-1 font-mono text-[11px] text-muted-foreground">{row.statusText}</p>
                  </div>
                  <p class="font-mono text-[11px] text-muted-foreground md:text-right">
                    {row.ms == null ? "—" : `${row.ms} ms`}
                  </p>
                </li>
              )}
            </For>
          </ul>
      </main>
      <SiteFooter />
    </>
  );
}
