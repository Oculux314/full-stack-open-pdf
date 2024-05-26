import dotenv from "dotenv";
import { resolve } from "path";
import { buildHtmlDoc } from "./html.js";
import { exportHtmlAsPdf } from "./pdf.js";
import { scrape } from "./scraper.js";

console.log("Script started.");
dotenv.config();
const pdfPath = process.env.EXPORT_PATH;

try {
  const websiteTree = await scrape();
  console.log("Scraping finished successfully. Building PDF...");
  const html = buildHtmlDoc(websiteTree);
  console.log("PDF successfully built. Exporting... (est. 30s)");
  await exportHtmlAsPdf(html, pdfPath);
  console.log("PDF successfully created at", resolve(pdfPath));
} catch (err) {
  console.log("Error creating PDF: ", err);
}
