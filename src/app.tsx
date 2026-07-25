import { ColorModeProvider, ColorModeScript, createLocalStorageManager } from "@kobalte/core";
import { MetaProvider } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";

import { SiteHeader } from "~/components/site-header";
import { ThemeSystemSync } from "~/components/theme-system-sync";

import "./app.css";

const storageManager = createLocalStorageManager("devcentr-theme");

export default function App() {
  return (
    <>
      <ColorModeScript
        storageType={storageManager.type}
        storageKey="devcentr-theme"
        initialColorMode="system"
      />
      <ColorModeProvider storageManager={storageManager} initialColorMode="system">
        <ThemeSystemSync />
        <Router
          root={(props) => (
            <MetaProvider>
              {/*
                Persistent shell: SiteHeader mounts once outside Suspense so logo
                CSS animations keep running across client-side navigations.
              */}
              <div class="plane-surface relative min-h-dvh">
                <div class="relative z-10 flex min-h-dvh min-w-0 flex-col">
                  <SiteHeader />
                  <Suspense
                    fallback={
                      <div class="flex flex-1 items-center justify-center text-muted-foreground">Loading…</div>
                    }
                  >
                    {props.children}
                  </Suspense>
                </div>
              </div>
            </MetaProvider>
          )}
        >
          <FileRoutes />
        </Router>
      </ColorModeProvider>
    </>
  );
}
