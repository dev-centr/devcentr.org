import { chromium } from "playwright";
import path from "node:path";
import fs from "node:fs";

const outDir = process.argv[2] || path.resolve("public/news/media/_raw");
fs.mkdirSync(outDir, { recursive: true });

const shots = [
  { url: "http://127.0.0.1:3000/", file: "fixnow-home.png", wait: 1500, fullPage: false },
  { url: "http://127.0.0.1:3000/", file: "fixnow-home-proof.png", wait: 1500, fullPage: true },
  { url: "http://127.0.0.1:3000/browse", file: "fixnow-browse.png", wait: 1200 },
  { url: "http://127.0.0.1:3000/register", file: "fixnow-register.png", wait: 1000 },
  { url: "http://127.0.0.1:3000/docs", file: "fixnow-docs.png", wait: 1000 },
  { url: "http://127.0.0.1:3001/", file: "wts-browse.png", wait: 2000 },
  { url: "http://127.0.0.1:3001/submit", file: "wts-submit.png", wait: 1000 },
];

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
for (const s of shots) {
  try {
    await page.goto(s.url, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(s.wait || 800);
    const dest = path.join(outDir, s.file);
    await page.screenshot({ path: dest, fullPage: !!s.fullPage });
    console.log("saved", dest);
  } catch (e) {
    console.error("FAIL", s.file, e.message);
  }
}
await browser.close();
