import puppeteer from "puppeteer";

const BASE_URL = "https://fullstackopen.com/en/";
let browser;

export async function scrape() {
  try {
    const page = await init();
    const partNames = await getPartNames(page);
    console.log("Part titles: ", partNames);
  } finally {
    browser?.close();
  }
}

async function init() {
  browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  page.on("console", (msg) => console.log("PAGE LOG:", msg.text()));
  await page.setViewport({ width: 1920, height: 1080 });
  return page;
}

async function getPartNames(page) {
  await page.goto(BASE_URL, { waitUntil: "networkidle0" });
  const elements = await page.$$("h2::-p-text(Part ) + p");
  const names = Promise.all(
    elements.map((header) => header.evaluate((h) => h.textContent))
  );
  return names;
}
