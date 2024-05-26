export function buildHtmlDoc(websiteContent) {
  console.log(websiteContent);

  const test = "<p>Hello World</p>"

  return `<!DOCTYPE html>
  <html>
    <head>
      <title>Full Stack Open</title>
    </head>
    <body>
      ${test}
    </body>
  </html>`;
}
