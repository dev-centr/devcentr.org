// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

import spaceGroteskLatin from "@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2?url";
import sourceCodeLatin400 from "@fontsource/source-code-pro/files/source-code-pro-latin-400-normal.woff2?url";
import sourceCodeLatin500 from "@fontsource/source-code-pro/files/source-code-pro-latin-500-normal.woff2?url";

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
          <link rel="preload" as="font" type="font/woff2" href={spaceGroteskLatin} crossorigin="anonymous" />
          <link rel="preload" as="font" type="font/woff2" href={sourceCodeLatin500} crossorigin="anonymous" />
          <link rel="preload" as="font" type="font/woff2" href={sourceCodeLatin400} crossorigin="anonymous" />
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
