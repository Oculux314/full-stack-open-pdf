import puppeteer from "puppeteer";

async function generatePDF(url, pdfPath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const textSelector = await page.waitForSelector("text/Google offered in");
  // await page.pdf({ path: pdfPath, format: "A4" });
  const fullText = await textSelector?.evaluate((elem) => elem.innerText);
  console.log(fullText);
  await browser.close();
}

generatePDF("https://google.com", "test.pdf")
  .then(() => {
    console.log("Successfully generated PDF.");
  })
  .catch((err) => {
    console.log("Error generating PDF: ", err);
  });
