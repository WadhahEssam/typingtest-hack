const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.setViewport({height: 1080, width: 1920});
  await page.goto('https://typing-speed-test.aoeu.eu/');

  await page.click('#all-inner > .testui > #border > #wordsbox > #input');

  while (true) {
    let word = await page.evaluate((sel) => {
      return document.querySelector('#currentword').textContent
    });
    await page.keyboard.type(word);
    await page.keyboard.press('Space');
    await page.waitFor(10);
  }

  await page.screenshot({path: 'files/typing.png'});
  await browser.close();
})();
