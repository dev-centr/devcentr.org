// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

import montserratLatin from "@fontsource-variable/montserrat/files/montserrat-latin-wght-normal.woff2?url";
import plexLatin400 from "@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2?url";
import plexLatin500 from "@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2?url";
import jetbrainsLatin500 from "@fontsource/jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff2?url";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/brand/logo-on-dark-256.png" />
          <link rel="preload" as="font" type="font/woff2" href={montserratLatin} crossorigin="anonymous" />
          <link rel="preload" as="font" type="font/woff2" href={plexLatin500} crossorigin="anonymous" />
          <link rel="preload" as="font" type="font/woff2" href={jetbrainsLatin500} crossorigin="anonymous" />
          <link rel="preload" as="font" type="font/woff2" href={plexLatin400} crossorigin="anonymous" />
          {assets}
        </head>
        <body>
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
