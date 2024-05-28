import dotenv from "dotenv";
import fs from "fs";
import pdf from "html-pdf";
import path from "path";

dotenv.config();
const { EXPORT_PATH, TIMEOUT } = process.env;

export async function exportHtmlAsPdf(html) {
  const options = {
    format: "A4",
    border: {
      top: "15mm",
      right: "15mm",
      bottom: "0",
      left: "15mm",
    },
    footer: {
      height: "15mm",
      contents: {
        default:
          '<div style="text-align: center; font-size: 10px; color: #444;">{{page}}/{{pages}}</div>',
      },
    },
    timeout: TIMEOUT,
  };

  return new Promise((resolve, reject) => {
    fs.mkdirSync(path.dirname(EXPORT_PATH), { recursive: true });
    fs.writeFile(`${EXPORT_PATH}.html`, html, (err) => {
      if (err) reject(err);
    });
    pdf.create(html, options).toFile(EXPORT_PATH, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}
