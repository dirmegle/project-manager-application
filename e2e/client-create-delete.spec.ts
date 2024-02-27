import { test, expect } from '@playwright/test';

test('clients can be added through client view and through project creation', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Add a client through client view
  await page.getByRole('link', { name: '󰀎 Clients' }).click();
  await page.getByRole('button', { name: 'Add new' }).click();
  await expect(page.getByRole('button', {name: 'Save client'})).toBeDisabled()
  await page.getByLabel('Client name*').click();
  await page.getByLabel('Client name*').fill('Awesome company 1');
  await expect(page.getByRole('button', {name: 'Save client'})).toBeEnabled()
  await page.getByLabel('Client description').click();
  await page.getByLabel('Client description').fill('Recommended by name');
  await page.getByLabel('Client description').click();
  await page.getByLabel('Client description').fill('Ecom');
  await page.getByLabel('Logo URL').click();
  await page.getByLabel('Logo URL').fill('https://i.pinimg.com/736x/ff/30/8d/ff308d171f019620f412c409024d25b0.jpg');
  await page.getByLabel('Notes').click();
  await page.getByLabel('Notes').fill('They like to get invoiced twice a month. Prefer for me to do everything in gdrive.');
  await page.getByRole('button', { name: 'Save client' }).click();
  await expect(page.locator('.client-item')).toHaveCount(1)

  // Add a client while creating a project
  await page.getByRole('link', { name: '󱓞 Projects' }).click();
  await page.getByRole('button', { name: 'Add new' }).click();
  await page.getByRole('tab', { name: 'Create client' }).click();
  await page.getByLabel('Client name*').click();
  await page.getByLabel('Client name*').fill('Awesome company 2');
  await page.getByLabel('Client description').click();
  await page.getByLabel('Client description').fill('Seem nice');
  await page.getByRole('button', { name: 'Save client' }).click();
  await page.getByRole('button', { name: '󰅖' }).click();
  await page.getByRole('link', { name: '󰀎 Clients' }).click();
  await expect(page.locator('.client-item')).toHaveCount(2)

  await page.getByRole('button', { name: 'client-logo Awesome company 1' }).click();
  await page.getByRole('button', { name: 'Delete client' }).click();
  await page.getByRole('button', { name: 'Confirm' }).nth(1).click();
  await expect(page.locator('.client-item')).toHaveCount(1)
});