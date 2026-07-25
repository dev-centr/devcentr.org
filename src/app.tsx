import { ColorModeProvider, ColorModeScript, createLocalStorageManager } from "@kobalte/core";
import { MetaProvider } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";

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
              <Suspense
                fallback={<div class="flex min-h-dvh items-center justify-center text-muted-foreground">Loading…</div>}
              >
                {props.children}
              </Suspense>
            </MetaProvider>
          )}
        >
          <FileRoutes />
        </Router>
      </ColorModeProvider>
    </>
  );
}
