import { strict as assert } from "node:assert";
import { createServer } from "node:http";
import { existsSync, readFileSync, statSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";
import { DOMParser } from "@xmldom/xmldom";

const root = resolve(import.meta.dirname, "..");
const output = join(root, ".output", "public");
const media = join(root, "public", "news", "media");
const provenance = JSON.parse(readFileSync(join(media, "playtime-diagrams.provenance.json"), "utf8"));
const source = readFileSync(
  join(root, "content", "news", "2026-08-13-intents-not-shell-translation.adoc"),
  "utf8",
);
const siteCss = readFileSync(join(root, "src", "app.css"), "utf8");
const packageJson = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const migratedReferences = [
  "playtime-argv",
  "playtime-attic-basement",
  "playtime-bootstrap",
  "playtime-growth-ratchet",
  "playtime-layers",
  "playtime-sibling-home",
  "playtime-venn",
];

function validateSvg(artifact) {
  const path = join(root, artifact.publicPath);
  const text = readFileSync(path, "utf8");
  const parsed = new DOMParser().parseFromString(text, "image/svg+xml");
  const svg = parsed.documentElement;
  assert.equal(svg.localName, "svg", `${artifact.publicPath}: XML root`);
  assert.equal(svg.namespaceURI, "http://www.w3.org/2000/svg", `${artifact.publicPath}: namespace`);
  assert.ok(svg.getAttribute("viewBox"), `${artifact.publicPath}: viewBox`);
  assert.ok(
    svg.getAttribute("preserveAspectRatio") === "xMidYMid meet" ||
      (artifact.variant === "fixed" && !svg.hasAttribute("preserveAspectRatio")),
    `${artifact.publicPath}: explicit or SVG-default xMidYMid meet scaling`,
  );
  assert.equal(svg.getAttribute("role"), "img", `${artifact.publicPath}: image role`);
  assert.ok(svg.getElementsByTagName("title").length, `${artifact.publicPath}: title`);
  assert.ok(svg.getElementsByTagName("desc").length, `${artifact.publicPath}: description`);
  assert.doesNotMatch(
    text,
    /<(?:script|foreignObject|iframe|object|embed|audio|video)\b|\son[a-z]+\s*=|(?:href|src)\s*=\s*["'](?:https?:|data:|javascript:)|url\(\s*["']?(?:https?:|data:|javascript:)/i,
    `${artifact.publicPath}: active or external content`,
  );

  if (artifact.variant === "standalone-adaptive") {
    assert.match(text, /@media\s*\(prefers-color-scheme:dark\)/, `${artifact.publicPath}: dark preset`);
    for (const variable of text.matchAll(/var\((--[^,\s)]+),\s*([^)]+)\)/g)) {
      assert.ok(variable[2].trim(), `${artifact.publicPath}: concrete fallback for ${variable[1]}`);
    }
  } else if (artifact.variant === "host") {
    assert.doesNotMatch(text, /prefers-color-scheme/, `${artifact.publicPath}: host owns mode`);
    assert.match(text, /var\(--themed-svg-diagram-/, `${artifact.publicPath}: semantic host variables`);
  } else {
    assert.doesNotMatch(text, /var\(|@media/, `${artifact.publicPath}: resolved fixed output`);
  }
}

assert.equal(provenance.artifacts.length, 30, "ten diagrams must each have three variants");
for (const artifact of provenance.artifacts) validateSvg(artifact);
for (const name of migratedReferences) {
  assert.match(
    source,
    new RegExp(`\\[\\.themed-svg\\]\\r?\\nimage::https://devcentr\\.org/news/media/${name}\\.svg\\[`),
    `${name}: source marker`,
  );
}
for (const unchanged of ["playtime-wrong-translator", "playtime-two-doors"]) {
  assert.doesNotMatch(
    source,
    new RegExp(`\\[\\.themed-svg\\]\\r?\\nimage::https://devcentr\\.org/news/media/${unchanged}\\.svg\\[`),
    `${unchanged}: must not be runtime-upgraded`,
  );
}
for (const forbidden of [".mmd", ".theme.json"]) {
  assert.ok(
    !provenance.artifacts.some((artifact) => artifact.publicPath.endsWith(forbidden)),
    `${forbidden} remains canonical in General Knowledge`,
  );
}
assert.equal(packageJson.dependencies["@dev-centr/themed-svg"], "0.1.1", "runtime version must stay pinned");
for (const role of [
  "canvas",
  "surface-primary",
  "surface-secondary",
  "text-primary",
  "border-primary",
  "edge",
  "accent-primary",
  "accent-on-primary",
  "status-warning",
  "status-warning-border",
  "status-danger",
  "status-danger-border",
]) {
  assert.match(siteCss, new RegExp(`--themed-svg-diagram-color-${role}:`), `${role}: host palette mapping`);
}
console.log("Validated XML, accessibility, safety, variants, and source markers for 30 artifacts.");

if (!process.argv.includes("--browser")) process.exit(0);
assert.ok(existsSync(output), "Run the site build before browser diagram tests.");
const { chromium } = await import("@playwright/test");
const mimeTypes = {
  ".css": "text/css",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".json": "application/json",
  ".svg": "image/svg+xml",
};
const server = createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  let path = normalize(join(output, pathname));
  if (!path.startsWith(output)) {
    response.writeHead(403).end();
    return;
  }
  if (existsSync(path) && statSync(path).isDirectory()) path = join(path, "index.html");
  if (!existsSync(path)) {
    response.writeHead(404).end();
    return;
  }
  response.writeHead(200, { "content-type": mimeTypes[extname(path)] || "application/octet-stream" });
  response.end(readFileSync(path));
});
await new Promise((resolveListen) => server.listen(0, "127.0.0.1", resolveListen));
const address = server.address();
const base = `http://127.0.0.1:${address.port}`;
const browser = await chromium.launch();

function hostState() {
  const element = [...document.querySelectorAll("themed-svg")].find((candidate) =>
    candidate.getAttribute("src")?.endsWith("/playtime-layers.host.svg"),
  );
  const mount = element?.shadowRoot?.querySelector('[part="themed-svg-container"]');
  const svg = mount?.shadowRoot?.querySelector("svg");
  return {
    found: Boolean(element),
    loaded: Boolean(svg) && mount?.hidden === false,
    background: svg ? getComputedStyle(svg).backgroundColor : "",
    fallbackHidden: element?.shadowRoot?.querySelector("slot")?.hidden,
    fallbackConnected: Boolean(element?.querySelector("img")?.isConnected),
  };
}

try {
  const adaptive = await browser.newPage();
  await adaptive.emulateMedia({ colorScheme: "light" });
  await adaptive.goto(`${base}/news/media/playtime-layers.svg`);
  const light = await adaptive.evaluate(() => getComputedStyle(document.documentElement).backgroundColor);
  await adaptive.emulateMedia({ colorScheme: "dark" });
  await adaptive.reload();
  const dark = await adaptive.evaluate(() => getComputedStyle(document.documentElement).backgroundColor);
  assert.notEqual(light, dark, "adaptive SVG must respond to light/dark OS preference");
  await adaptive.close();

  const host = await browser.newPage();
  await host.goto(`${base}/news/2026-08-13-intents-not-shell-translation/`);
  await host.waitForFunction(() => {
    const element = [...document.querySelectorAll("themed-svg")].find((candidate) =>
      candidate.getAttribute("src")?.endsWith("/playtime-layers.host.svg"),
    );
    const mount = element?.shadowRoot?.querySelector('[part="themed-svg-container"]');
    return mount?.hidden === false && Boolean(mount.shadowRoot?.querySelector("svg"));
  });
  await host.evaluate(() => {
    document.documentElement.classList.remove("dark");
    document.documentElement.dataset.kbTheme = "light";
  });
  const hostLight = await host.evaluate(hostState);
  await host.evaluate(() => {
    document.documentElement.classList.add("dark");
    document.documentElement.dataset.kbTheme = "dark";
  });
  await host.waitForFunction((previous) => {
    const element = [...document.querySelectorAll("themed-svg")].find((candidate) =>
      candidate.getAttribute("src")?.endsWith("/playtime-layers.host.svg"),
    );
    const svg = element?.shadowRoot
      ?.querySelector('[part="themed-svg-container"]')
      ?.shadowRoot?.querySelector("svg");
    return svg && getComputedStyle(svg).backgroundColor !== previous;
  }, hostLight.background);
  const hostDark = await host.evaluate(hostState);
  assert.notEqual(hostLight.background, hostDark.background, "manual host mode must change semantic colors");
  assert.equal(hostDark.fallbackHidden, true, "fallback hides only after host load");
  await host.evaluate(() => {
    const element = [...document.querySelectorAll("themed-svg")].find((candidate) =>
      candidate.getAttribute("src")?.endsWith("/playtime-layers.host.svg"),
    );
    element.remove();
    document.body.append(element);
  });
  await host.waitForFunction(() => {
    const element = [...document.querySelectorAll("themed-svg")].find((candidate) =>
      candidate.getAttribute("src")?.endsWith("/playtime-layers.host.svg"),
    );
    const mount = element?.shadowRoot?.querySelector('[part="themed-svg-container"]');
    return mount?.hidden === false && Boolean(mount.shadowRoot?.querySelector("svg"));
  });
  await host.close();

  const failure = await browser.newPage();
  await failure.route("**/playtime-layers.host.svg", (route) =>
    route.fulfill({ status: 500, contentType: "text/plain", body: "intentional test failure" }),
  );
  await failure.goto(`${base}/news/2026-08-13-intents-not-shell-translation/`);
  await failure.waitForFunction(() => {
    const element = [...document.querySelectorAll("themed-svg")].find((candidate) =>
      candidate.getAttribute("src")?.endsWith("/playtime-layers.host.svg"),
    );
    return Boolean(element) && element.shadowRoot?.querySelector("slot")?.hidden === false;
  });
  const failed = await failure.evaluate(hostState);
  assert.equal(failed.loaded, false, "failed host SVG must not mount");
  assert.equal(failed.fallbackConnected, true, "adaptive fallback remains connected after failure");
  await failure.close();

  console.log("Verified adaptive light/dark, manual host modes, reconnect, and failure fallback in Chromium.");
} finally {
  await browser.close();
  await new Promise((resolveClose) => server.close(resolveClose));
}
