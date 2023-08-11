const portfinder = require('portfinder');
const puppeteer = require('puppeteer');

const app = require('../meadowlark.js');

let server = null;
let port = null;

beforeEach(async () => {
  port = await portfinder.getPortPromise(); // using portfind to use a open port
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

test('should home page link work to about page', async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`http://localhost:${port}`);
  await Promise.all([
    page.waitForNavigation(),
    page.click('[data-test-id="about"]'),
  ]);
  expect(page.url()).toBe(`http://localhost:${port}/about`);
  await browser.close();
});
