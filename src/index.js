import dotenv from "dotenv";
import { htmlToPdf } from "./pdf.js";
import { scrape } from "./scraper.js";

dotenv.config();
const pdfPath = process.env.EXPORT_PATH;

await scrape();
await htmlToPdf("<h1>Hello, World!</h1>", pdfPath);
console.log("PDF created successfully.");
