# full-stack-open-pdf

Scrapes https://fullstackopen.com and creates a pdf (as well as a simplified html version) you can read on a Kindle.

A pre-built version of the pdf can be found in the root directory.

## I want to build the pdf myself (e.g. to use a different language)

You will need [Node.js](https://nodejs.org).

1. Edit the `.env` file to your preference
1. Ensure you have cd'd into the correct folder (the one with `package.json` in it)
1. Run `npm install`
1. Run `npm start`

The default export location is `/export/fullstackopen.pdf`.

## Experimental

To run `npm run test-formatted`, you'll first need to grant puppeteer permission to create PDF files.

```bash
icacls $HOME/.cache/puppeteer/chrome /grant "ALL APPLICATION PACKAGES:(OI)(CI)(RX)"
```
