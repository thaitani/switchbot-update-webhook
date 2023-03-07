import { chromium } from "playwright";
import { NGROK_HOST } from "./env";

async function getNgrokUrl(): Promise<string | null> {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(`http://${NGROK_HOST}:4040/status`);

  const urlContent = await page.$("text=/https(.+).ngrok.io/i");
  const url = await urlContent?.textContent();

  await browser.close();
  return url ?? null;
}

export { getNgrokUrl };
