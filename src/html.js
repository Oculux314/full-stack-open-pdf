import { styles } from "./css.js";

export function buildHtmlDoc(websiteContent) {
  const sb = [];
  websiteContent.forEach((part) => {
    sb.push(`<h1>${part.number}: ${part.name}</h1>`);
    part.sections.forEach((section) => {
      sb.push(`<h2>${part.number}${section.letter}: ${section.title}</h2>`);
      sb.push(section.content);
    });
  });

  const bodyContent = processHtml(sb.join(""));

  // Who needs JSX when you can write raw HTML?
  return `<!DOCTYPE html>
  <html>
    <head>
      <title>Full Stack Open</title>
      <style>
        ${styles}
      </style>
    </head>
    <body>
      ${bodyContent}
    </body>
  </html>`;
}

function processHtml(html) {
  function populateImages(html) {
    const BASE_URL = "https://fullstackopen.com"; // Hard-coded as static images don't work with /en/ url suffix
    return html.replaceAll("/static/", `${BASE_URL}/static/`);
  }

  function removeCopyCodeButtons(html) {
    return html.replace(/<button.*?copy.*?<\/button>/g, "");
  }

  return removeCopyCodeButtons(populateImages(html));
}
