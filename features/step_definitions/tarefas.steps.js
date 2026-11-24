const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('node:assert/strict');

// Espera um estado visível, em vez de depender de pausas fixas.
async function verifyEmpty(page) {
  await page.getByText('Nenhuma tarefa cadastrada.', { exact: true }).waitFor({ state: 'visible' });
  assert.equal(await page.getByTestId('task-count').innerText(), '0 tarefas');
  assert.equal(await page.getByRole('listitem').count(), 0);
}

Given('que acesso a lista de tarefas vazia', async function () {
  await this.page.goto(this.url);
  await verifyEmpty(this.page);
});

When('informo o título {string}', async function (title) {
  await this.page.getByLabel('Título da tarefa').fill(title);
});

When('deixo o título em branco', async function () {
  await this.page.getByLabel('Título da tarefa').fill('');
});

When('clico em adicionar tarefa', async function () {
  await this.page.getByRole('button', { name: 'Adicionar tarefa' }).click();
});

Then('vejo a mensagem de sucesso {string}', async function (message) {
  const status = this.page.getByRole('status');
  await status.waitFor({ state: 'visible' });
  assert.equal(await status.innerText(), message);
  await this.attach(await this.page.screenshot({ fullPage: true }), 'image/png');
});

Then('vejo a mensagem de erro {string}', async function (message) {
  const alert = this.page.getByRole('alert');
  await alert.waitFor({ state: 'visible' });
  assert.equal(await alert.innerText(), message);
  await this.attach(await this.page.screenshot({ fullPage: true }), 'image/png');
});

Then('a lista contém apenas a tarefa {string}', async function (title) {
  const items = this.page.getByRole('listitem');
  await items.first().waitFor({ state: 'visible' });
  assert.equal(await items.count(), 1);
  assert.equal(await items.first().innerText(), title);
  assert.equal(await this.page.getByTestId('task-count').innerText(), '1 tarefa');
});

When('recarrego a página', async function () {
  await this.page.reload();
});

Then('a lista permanece vazia', async function () {
  await verifyEmpty(this.page);
});
