const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { startServer } = require('../../app/server');

setDefaultTimeout(30000);

// Novo servidor e navegador a cada cenário: não há dependência de ordem.
Before(async function () {
  const { server, url } = await startServer();
  this.server = server;
  this.url = url;
  const visible = process.env.BROWSER_VISIBLE === '1';
  this.browser = await chromium.launch({ headless: !visible, slowMo: visible ? 250 : 0 });
  this.context = await this.browser.newContext({ viewport: { width: 1100, height: 760 } });
  this.page = await this.context.newPage();
  this.page.setDefaultTimeout(10000);
});

After(async function () {
  try {
    // A captura é anexada ao relatório real do Cucumber, inclusive em falhas.
    if (this.page && !this.page.isClosed()) {
      await this.attach(await this.page.screenshot({ fullPage: true }), 'image/png');
    }
  } finally {
    try {
      if (this.browser) await this.browser.close();
    } finally {
      if (this.server) await new Promise(resolve => this.server.close(resolve));
    }
  }
});
