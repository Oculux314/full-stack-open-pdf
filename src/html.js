export function buildHtmlDoc(websiteContent) {
  const styles = `
  body {
    font-family: Calibri, sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: Calibri, sans-serif;
  }

  blockquote {
    background-color: #fff4de;
    border-left: 5px solid #ffdf9f;
    margin: 1.5em 10px;
    padding: 0.5em 10px;
  }

  pre {
    color: #fff;
    background-color: #333;
    padding: 10px;
    border-radius: 5px;
    font-family: consolas, monospace;
    overflow-x: auto;
    word-wrap: break-word;
  }

  img {
    max-width: 100%;
    height: auto;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  :not(pre)>code[class*=language-],pre[class*=language-] {
      background: #4d4033
  }

  pre[class*=language-] {
      padding: 1em;
      margin: .5em 0;
      overflow: auto;
      border: .3em solid #7a6652;
      border-radius: .5em;
      box-shadow: inset 1px 1px .5em #000
  }

  :not(pre)>code[class*=language-] {
      padding: .15em .2em .05em;
      border-radius: .3em;
      border: .13em solid #7a6652;
      box-shadow: inset 1px 1px .3em -.1em #000;
      white-space: normal
  }

  .token.cdata,.token.comment,.token.doctype,.token.prolog {
      color: #998066
  }

  .token.namespace,.token.punctuation {
      opacity: .7
  }

  .token.boolean,.token.constant,.token.number,.token.property,.token.symbol,.token.tag {
      color: #d1949e
  }

  .token.attr-name,.token.builtin,.token.char,.token.inserted,.token.selector,.token.string {
      color: #bde052
  }

  .language-css .token.string,.style .token.string,.token.entity,.token.operator,.token.url,.token.variable {
      color: #f5b83d
  }

  .token.atrule,.token.attr-value,.token.keyword {
      color: #d1949e
  }

  .token.important,.token.regex {
      color: #e90
  }

  .token.bold,.token.important {
      font-weight: 700
  }

  .token.italic {
      font-style: italic
  }

  .token.entity {
      cursor: help
  }

  .token.deleted {
      color: red
  }
  `;

  // console.log(websiteContent[0].sections);
  const sb = [];
  websiteContent.forEach((part) => {
    sb.push(`<h1>${part.number}: ${part.name}</h1>`);
    part.sections.forEach((section) => {
      sb.push(`<h2>${part.number}${section.letter}: ${section.title}</h2>`);
      sb.push(section.content);
    });
  });

  const bodyContent = processHtml(sb.join(""));

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
    const BASE_URL = "https://fullstackopen.com";
    return html.replaceAll("/static/", `${BASE_URL}/static/`);
  }

  function removeCopyCodeButtons(html) {
    return html.replace(/<button.*?copy.*?<\/button>/g, "");
  }

  return removeCopyCodeButtons(populateImages(html));
}
