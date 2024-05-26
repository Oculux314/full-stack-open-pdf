import pdf from "html-pdf";
import puppeteer from "puppeteer";

let browser;

async function generatePDF(url, pdfPath) {
  browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  page.on("console", (msg) => console.log("PAGE LOG:", msg.text()));
  await page.setViewport({ width: 1920, height: 1080 });
  console.log("Navigating to URL: ", url);
  await page.goto(url, { waitUntil: "networkidle0" });
  console.log("Page loaded successfully.")
  const html = await page
    .locator("#course-contents")
    .map((elem) => elem.childNodes[0].childNodes[0].innerHTML)
    .wait();
  console.log(html);
  console.log("Creating PDF...");
  // await page.pdf({ path: pdfPath, format: "a4" });
  pdf.create(html).toFile(pdfPath, (err, res) => {
    if (err) {
      console.log("Error creating PDF: ", err);
    }
    console.log("PDF created successfully.");
  });
  console.log("PDF created successfully.");
  await browser.close();
}

generatePDF("https://fullstackopen.com/en/", "test.pdf")
  .then(() => {
    console.log("Successfully generated PDF.");
  })
  .catch((err) => {
    console.log("Error generating PDF: ", err);
  })
  .finally(() => {
    browser.close();
  });
