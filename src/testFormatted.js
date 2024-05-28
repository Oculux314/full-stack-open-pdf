import dotenv from "dotenv";
import fs from "fs";
import puppeteer from "puppeteer";

dotenv.config();
const { URL } = process.env;

async function printPDF() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(URL, {
    waitUntil: "networkidle0",
  });
  const pdf = await page.pdf({ format: "A4", printBackground: true });

  await browser.close();
  return pdf;
}

printPDF().then((pdf) => {
  console.log(pdf);
  fs.writeFileSync("export/test-formatted.pdf", pdf);
});
