import { buildHtmlDoc } from "./html.js";
import { exportHtmlAsPdf } from "./pdf.js";
import { scrape } from "./scraper.js";

try {
  console.log("Script started.");
  const websiteTree = await scrape();
  console.log("Scraping finished successfully. Building PDF...");
  const html = buildHtmlDoc(websiteTree);
  console.log("PDF successfully built. Exporting... (est. 60s)");
  const { filename } = await exportHtmlAsPdf(html);
  console.log("PDF successfully created at", filename);
} catch (err) {
  console.log("Error creating PDF: ", err);
}
