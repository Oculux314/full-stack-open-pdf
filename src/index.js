import dotenv from "dotenv";
import { resolve } from "path";
import { buildHtmlDoc } from "./html.js";
import { exportHtmlAsPdf } from "./pdf.js";
import { scrape } from "./scraper.js";

dotenv.config();
const EXPORT_PATH = process.env.EXPORT_PATH;

try {
  console.log("Script started.");
  const websiteTree = await scrape();
  console.log("Scraping finished successfully. Building PDF...");
  const html = buildHtmlDoc(websiteTree);
  console.log("PDF successfully built. Exporting... (est. 60s)");
  await exportHtmlAsPdf(html);
  console.log("PDF successfully created at", resolve(EXPORT_PATH));
} catch (err) {
  console.log("Error creating PDF: ", err);
}
