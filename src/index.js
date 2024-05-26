import dotenv from "dotenv";
import { htmlToPdf } from "./pdf.js";

dotenv.config();

async function run() {
  await htmlToPdf("<h1>Hello, World!</h1>", "test.pdf");
  console.log("PDF created successfully.");
}

run();
