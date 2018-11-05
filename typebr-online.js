const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.setViewport({height: 1080, width: 1920});
  await page.goto('https://www.keybr.com/multiplayer');

  await page.waitForSelector('.TextInput-label');
  await page.click('.TextInput-label');
  
  while (true) {
    let letter = await page.evaluate((sel) => {
      var letterDiv = document.querySelector('#App > div > div > div.TextInput.TextInput--sizeX0 > div:nth-child(2) > div > span.TextInput-item.TextInput-item--cursor');
      if (letterDiv !== null) {
        return letterDiv.textContent;
      } else {
        return '';
      }
    });
    console.log(letter);
    if (Math.floor(Math.random() * 30) == 0) {
      await page.keyboard.type('A');
    } 
    if (letter == '␣') {
      await page.keyboard.press('Space');
    } else if (letter == '↵') {
      await page.keyboard.press('Enter')
    } else {
      await page.keyboard.type(letter);
    } 
    await page.waitFor(10);
  }

  await page.waitFor(1000);
  await page.screenshot({path: 'files/chatinc2.png'});
  await browser.close();
})();
