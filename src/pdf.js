import pdf from "html-pdf";

export async function htmlToPdf(html, pdfPath) {
  return new Promise((resolve, reject) => {
    pdf.create(html).toFile(pdfPath, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
}
