import { LogoMark } from "~/components/logo-mark";
import { SLACK_INVITE_URL } from "~/lib/site-links";

const footLink =
  "text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline";

export function SiteFooter() {
  return (
    <footer class="mx-auto max-w-6xl px-6 pb-14 md:px-10">
      <div class="flex flex-col gap-8 border-t border-border/70 pt-8 sm:flex-row sm:items-start sm:justify-between">
        <div class="flex items-center gap-3">
          <LogoMark class="size-7 text-primary" />
          <span class="font-display text-sm font-semibold tracking-tight">DevCentr</span>
        </div>
        <div class="flex flex-wrap gap-x-10 gap-y-6 font-mono text-[10px] uppercase tracking-[0.22em]">
          <nav class="flex flex-col gap-2" aria-label="Product">
            <span class="text-muted-foreground/70">Product</span>
            <a href="/news" class={footLink}>
              News
            </a>
            <a href="/changelog" class={footLink}>
              Changelog
            </a>
            <a href="https://docs.devcentr.org" class={footLink}>
              Docs
            </a>
            <a href="https://github.com/dev-centr" class={footLink}>
              GitHub
            </a>
          </nav>
          <nav class="flex flex-col gap-2" aria-label="Community">
            <span class="text-muted-foreground/70">Community</span>
            <a href="/help" class={footLink}>
              Help
            </a>
            <a href="/status" class={footLink}>
              Status
            </a>
            <a href={SLACK_INVITE_URL} class={footLink} target="_blank" rel="noreferrer">
              Slack
            </a>
          </nav>
          <nav class="flex flex-col gap-2" aria-label="Related projects">
            <span class="text-muted-foreground/70">Related</span>
            <a href="https://openshellorg.github.io/" class={footLink}>
              OpenShellOrg
            </a>
            <a
              href="https://openshellorg.github.io/open-shell-org/"
              class={footLink}
            >
              OSO Docs
            </a>
            <a href="https://github.com/openshellorg" class={footLink}>
              OSO GitHub
            </a>
            <a href="https://github.com/dlang-supplemental" class={footLink}>
              dlang-supplemental
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
