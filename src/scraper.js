import puppeteer from "puppeteer";

const BASE_URL = "https://fullstackopen.com/en/";
let browser;

export async function scrape() {
  try {
    browser = await puppeteer.launch({ headless: true });

    const partNames = await getPartNames();
    console.log(`Found ${partNames.length} parts.`);

    const parts = await Promise.all(partNames.map(createPart));
    parts.forEach(({ number, sections }) =>
      console.log(`Part ${number}: Found ${sections.length} sections.`)
    );

    console.log(parts[13]);
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
    await select(page, "div[class^=arrow__container] a", (el) => el.href)
  ).slice(1); // Slice to remove the contents page link
  page.close();

  const sections = sectionUrls.map((url) => ({ url }));

  return {
    name,
    number,
    sections,
  };
}
