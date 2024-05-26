import fs from "fs";
import pdf from "html-pdf";

export async function exportHtmlAsPdf(html, pdfPath) {
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
  };

  return new Promise((resolve, reject) => {
    fs.writeFileSync(`${pdfPath}.html`, html);
    pdf.create(html, options).toFile(pdfPath, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
}
