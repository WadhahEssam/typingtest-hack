const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.setViewport({height: 1080, width: 1920});
  await page.goto('https://typing-speed-test.aoeu.eu/');


  let firstWord = await page.evaluate((sel) => {
    return document.querySelector('#currentword').textContent
  });
  await page.click('#all-inner > .testui > #border > #wordsbox > #input');
  await page.keyboard.type(firstWord);
  await page.keyboard.press('Space');

  await page.waitFor(30);

  let secondWord = await page.evaluate((sel) => {
    return document.querySelector('#currentword').textContent
  });
  await page.click('#all-inner > .testui > #border > #wordsbox > #input');
  await page.keyboard.type(secondWord);
  await page.keyboard.press('Space');

  await page.screenshot({path: 'files/typing.png'});
  await browser.close();
})();
