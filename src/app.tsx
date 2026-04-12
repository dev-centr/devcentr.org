import { ColorModeProvider, ColorModeScript, createLocalStorageManager } from "@kobalte/core";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";

import "./app.css";

const storageManager = createLocalStorageManager("devcentr-theme");

export default function App() {
  return (
    <>
      <ColorModeScript
        storageType={storageManager.type}
        storageKey="devcentr-theme"
        initialColorMode="dark"
      />
      <ColorModeProvider storageManager={storageManager} initialColorMode="dark">
        <Router
          root={(props) => (
            <Suspense
              fallback={<div class="flex min-h-dvh items-center justify-center text-muted-foreground">Loading…</div>}
            >
              {props.children}
            </Suspense>
          )}
        >
          <FileRoutes />
        </Router>
      </ColorModeProvider>
    </>
  );
}
