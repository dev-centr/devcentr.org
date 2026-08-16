import { For, Show } from "solid-js";

export type TrailCrumb = {
  label: string;
  href?: string;
};

/** Access-path crumb: Homeward left, current page last. Tags are not crumbs. */
export function PageTrail(props: { crumbs: TrailCrumb[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      class="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground"
    >
      <ol class="flex flex-wrap items-center">
        <For each={props.crumbs}>
          {(crumb, index) => (
            <li class="flex items-center">
              <Show when={index() > 0}>
                <span class="mx-2 opacity-40" aria-hidden="true">
                  /
                </span>
              </Show>
              <Show
                when={crumb.href}
                fallback={
                  <span aria-current="page">{crumb.label}</span>
                }
              >
                <a href={crumb.href} class="hover:text-foreground">
                  {crumb.label}
                </a>
              </Show>
            </li>
          )}
        </For>
      </ol>
    </nav>
  );
}
