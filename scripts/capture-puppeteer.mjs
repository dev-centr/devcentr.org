import puppeteer from "puppeteer-core";
import path from "node:path";
import fs from "node:fs";

const outDir = process.argv[2] || path.resolve("public/news/media/_raw");
fs.mkdirSync(outDir, { recursive: true });
const chrome =
  process.env.CHROME_PATH ||
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const shots = [
  { url: "http://127.0.0.1:3000/", file: "fixnow-home.png" },
  { url: "http://127.0.0.1:3000/browse", file: "fixnow-browse.png" },
  { url: "http://127.0.0.1:3000/register", file: "fixnow-register.png" },
  { url: "http://127.0.0.1:3000/docs", file: "fixnow-docs.png" },
  {
    url: "file:///" + path.resolve("scripts/wts-static.html").replace(/\\/g, "/"),
    file: "wts-browse.png",
  },
];

const browser = await puppeteer.launch({
  executablePath: chrome,
  headless: true,
  args: ["--hide-scrollbars", "--window-size=1440,900", "--disable-gpu"],
  defaultViewport: { width: 1440, height: 900 },
});

for (const s of shots) {
  const page = await browser.newPage();
  try {
    await page.goto(s.url, { waitUntil: "domcontentloaded", timeout: 45000 });
    await sleep(4000);
    const dest = path.join(outDir, s.file);
    await page.screenshot({ path: dest, fullPage: false });
    console.log("saved", dest, fs.statSync(dest).size);
  } catch (e) {
    console.error("FAIL", s.file, e.message);
  } finally {
    await page.close();
  }
}

// submit placeholder page
{
  const page = await browser.newPage();
  await page.setContent(`<!doctype html><html><body style="font-family:Segoe UI,sans-serif;padding:2.5rem;background:#f4f7fb;color:#142033">
    <h1>Submit a workflow template</h1>
    <p style="color:#4b5b73">Not implemented yet — GitHub login will land here.</p>
    <p><a href="#">← Back to templates</a></p>
  </body></html>`);
  const dest = path.join(outDir, "wts-submit.png");
  await page.screenshot({ path: dest });
  console.log("saved", dest, fs.statSync(dest).size);
  await page.close();
}

await browser.close();
