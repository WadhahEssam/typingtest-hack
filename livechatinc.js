const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.setViewport({height: 1080, width: 1920});
  await page.goto('https://www.livechatinc.com/typing-speed-test/#/');


  while (true) {
    let word = await page.evaluate((sel) => {
      return document.querySelector('#app > div > div.app-header-wrapper > div > span > div.overflow-wrapper > span > div > div:nth-child(2) > div > span:nth-child(1)').textContent
    });
    if (word === '') {
      await page.keyboard.press("Space");
    } else {
      await page.keyboard.type(word);
    }
    await page.waitFor(10);
  }

  await page.screenshot({path: 'files/chatinc.png'});
  await browser.close();
})();
