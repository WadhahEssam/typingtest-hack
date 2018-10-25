const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.setViewport({height: 1080, width: 1920});
  await page.goto('https://www.keybr.com/');

  await page.waitFor(1000);
  await page.click('body > div:nth-child(4) > div > div.Tour.Popup > a');
  await page.waitFor(100);
  await page.click('#root > section > div.Practice-textInput.l--normal > div > div.TextInput-label');

  while(true) {
    let letter = await page.evaluate((sel) => {
      let currentLetter = document.querySelector('#root > section > div.Practice-textInput.l--normal > div > div.TextInput--blink > div > span.TextInput-item.TextInput-item--cursor'); 
      if( currentLetter === null) {
        currentLetter = document.querySelector('');
      } else {
        return currentLetter.textContent;
      }
    });
    console.log(letter);
    if (letter == '␣') {
      await page.keyboard.press('Space');
    } else {
      await page.keyboard.type(letter);
    }
    await page.waitFor(10);
  }


  await page.screenshot({path: 'files/keybr.png'});
  await browser.close();

})();
