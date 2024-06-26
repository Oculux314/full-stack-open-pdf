import dotenv from "dotenv";
import puppeteer from "puppeteer";

dotenv.config();
const BASE_URL = process.env.URL;
const START_PART = +process.env.START_PART || 0;
const END_PART = +process.env.END_PART || undefined;
let browser;

export async function scrape() {
  try {
    console.log(`Opening connection to ${BASE_URL}`);
    browser = await puppeteer.launch({ headless: true });

    const partNames = (await getPartNames()).slice(START_PART, END_PART);
    console.log(`Found ${partNames.length} parts.`);
    console.log("Scraping... (est. 30s)");

    const parts = await Promise.all(
      partNames.map((part, num) => createPart(part, START_PART + num))
    );
    parts.forEach(({ number, sections }) =>
      console.log(`Part ${number}: Found ${sections.length} sections.`)
    );

    return parts;
  } finally {
    browser?.close();
  }
}

async function select(page, selector, evaluator) {
  const elements = await page.$$(selector);
  return Promise.all(elements.map((elem) => elem.evaluate(evaluator)));
}

async function getPartNames() {
  const page = await browser.newPage();
  await page.goto(BASE_URL, { waitUntil: "networkidle0" });
  const names = await select(
    page,
    "h2::-p-text(Part ) + p",
    (el) => el.textContent
  );
  page.close();
  return names;
}

async function createPart(name, number) {
  const page = await browser.newPage();
  const url = `${BASE_URL}/part${number}`;
  await page.goto(url, { waitUntil: "networkidle0" });

  const sectionUrls = (
    await select(page, "div.arrow__container a", (el) => el.href)
  ).slice(1); // Slice to remove the contents page link
  page.close();

  const sections = await Promise.all(sectionUrls.map(createSection));

  return {
    name,
    number,
    sections,
  };
}

async function createSection(url) {
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle0" });

  const title = await page.$eval("h1.sub-header", (el) => el.textContent);
  const letter = await page.$eval("p.col-1.letter", (el) => el.textContent);
  const content = (
    await select(page, "div.course-content-inner", (el) => el.innerHTML)
  )
    .slice(1) // Remove the title
    .join(""); // Selector can be used multiple times

  page.close();
  return { title, letter, content };
}
