import dotenv from "dotenv";
dotenv.config();

// Probably bad practice...
export const styles = `
  body {
    font-family: Calibri, sans-serif;
    font-size: ${process.env.FONT_SIZE || "16px"};
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: Calibri, sans-serif;
  }

  a {
    color: #0093bf;
    text-decoration: none;
  }

  blockquote {
    background-color: #fff4de;
    border-left: 5px solid #ffdf9f;
    margin: 1.5em 10px;
    padding: 0.5em 10px;
  }

  pre {
    color: #fff;
    font-weight: bold;
    background-color: #000;
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

  .gatsby-highlight-code-line {
    background-color: hsla(0,0%,88.2%,.3);
    display: block;
    margin-right: -1em;
    margin-left: -1em;
    padding-right: 1em;
    padding-left: 1em
  }
`;
