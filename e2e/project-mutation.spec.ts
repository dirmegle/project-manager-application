import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: '󱓞 Projects' }).click();
  await page.getByRole('button', { name: 'Add new' }).click();
  await page.getByRole('tab', { name: 'Create client' }).click();
  await page.getByLabel('Client name*').click();
  await page.getByLabel('Client name*').fill('Awesome company 1');
  await page.getByLabel('Client description').click();
  await page.getByLabel('Client description').fill('Dog food');
  await page.getByRole('button', { name: 'Save client' }).click();
  await page.getByRole('tab', { name: 'Choose client' }).click();
  await page.locator('.v-field__input').first().click();
  await page.getByText('Awesome company').click();
  await page.getByLabel('Project name*').click();
  await page.getByLabel('Project name*').fill('Write an ad brief');
  await page.getByLabel('Project description').click();
  await page.getByLabel('Project description').fill('For 2 new ad campaigns. ');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('link', { name: 'Write an ad brief Awesome' }).click();
});

test.describe('Manipulate project and its data', () => {
  test('Change project name', async({ page }) => {
    await page.getByRole('button', { name: '󰏫' }).click();
    await page.getByLabel('New project name').click();
    await page.getByLabel('New project name').fill('Write an awesome ad brief');
    await page.getByRole('button', { name: 'Confirm' }).click();
    await expect(page.getByTestId('project-details-name')).toContainText('Write an awesome ad brief')
  })

  test('Change project description', async({ page }) => {
    await page.getByTestId('project-details-description').click();
    await page.locator('.v-field__input').fill('For 3 new ad campaigns.');
    await page.locator('body').click();
    await page.locator('.container-nav-desktop').click();
    await page.getByRole('link', { name: '󱓞 Projects' }).click();
    await page.getByRole('link', { name: 'Write an ad brief' }).click();
    await expect(page.locator('.v-field__input')).toHaveValue('For 3 new ad campaigns.')
  })



  test('Add line items, check relating dashboard numbers', async({ page }) => {
    // Add and check line items
    // Check planned income and project numbers in in dashboard
    await page.locator('div').filter({ hasText: /^NameUnitQuantityPriceTotal€0\.00$/ }).getByPlaceholder('Name').click();
    await page.locator('div').filter({ hasText: /^NameUnitQuantityPriceTotal€0\.00$/ }).getByPlaceholder('Name').fill('perform research');
    await page.locator('div').filter({ hasText: /^NameUnitQuantityPriceTotal€0\.00$/ }).getByPlaceholder('Unit').click();
    await page.locator('div').filter({ hasText: /^NameUnitQuantityPriceTotal€0\.00$/ }).getByPlaceholder('Unit').fill('hour');
    await page.locator('div').filter({ hasText: /^NameUnitQuantityPriceTotal€0\.00$/ }).getByPlaceholder('Quantity').click();
    await page.locator('div').filter({ hasText: /^NameUnitQuantityPriceTotal€0\.00$/ }).getByPlaceholder('Quantity').fill('2');
    await page.locator('div').filter({ hasText: /^NameUnitQuantityPriceTotal€0\.00$/ }).getByPlaceholder('Price').click();
    await page.locator('div').filter({ hasText: /^NameUnitQuantityPriceTotal€0\.00$/ }).getByPlaceholder('Price').fill('50');
    await page.getByRole('button', { name: '󰐕' }).click();
    await expect(page.getByTestId('project-item')).toHaveCount(1)
    await page.getByRole('link', { name: '󰕮 Dashboard' }).click();
    await expect(page.getByTestId('display-number').nth(2)).toContainText('€100.00')
    await expect(page.getByTestId('display-number').nth(1)).toContainText('1')
    await expect(page.getByTestId('display-number').nth(0)).toContainText('0')

    // Go to remove line items
    // Mark project as completed
    // Check if planned income in dashboard changed
    await page.getByRole('link', { name: '󱓞 Projects' }).click();
    await page.getByRole('link', { name: 'Write an ad brief Awesome' }).click();
    await page.getByTestId('project-item').getByRole('button', { name: '󰅖' }).click();
    await expect(page.getByTestId('project-item')).toHaveCount(0)
    await page.getByRole('button', { name: 'Mark project as completed' }).click();
    await page.getByRole('button', { name: 'Confirm' }).click();
    await page.getByRole('link', { name: '󰕮 Dashboard' }).click();
    await expect(page.getByTestId('display-number').nth(2)).toContainText('€0.00')
    await expect(page.getByTestId('display-number').nth(1)).toContainText('0')
    await expect(page.getByTestId('display-number').nth(0)).toContainText('1')
  })

  test('Complete project and check actual income', async({ page }) => {
    await page.locator('div').filter({ hasText: /^NameUnitQuantityPriceTotal€0\.00$/ }).getByPlaceholder('Name').click();
    await page.locator('div').filter({ hasText: /^NameUnitQuantityPriceTotal€0\.00$/ }).getByPlaceholder('Name').fill('perform research');
    await page.locator('div').filter({ hasText: /^NameUnitQuantityPriceTotal€0\.00$/ }).getByPlaceholder('Unit').click();
    await page.locator('div').filter({ hasText: /^NameUnitQuantityPriceTotal€0\.00$/ }).getByPlaceholder('Unit').fill('hour');
    await page.locator('div').filter({ hasText: /^NameUnitQuantityPriceTotal€0\.00$/ }).getByPlaceholder('Quantity').click();
    await page.locator('div').filter({ hasText: /^NameUnitQuantityPriceTotal€0\.00$/ }).getByPlaceholder('Quantity').fill('2');
    await page.locator('div').filter({ hasText: /^NameUnitQuantityPriceTotal€0\.00$/ }).getByPlaceholder('Price').click();
    await page.locator('div').filter({ hasText: /^NameUnitQuantityPriceTotal€0\.00$/ }).getByPlaceholder('Price').fill('50');
    await page.getByRole('button', { name: '󰐕' }).click();
    await expect(page.getByTestId('project-item')).toHaveCount(1)
    await page.getByRole('button', { name: 'Mark project as completed' }).click();
    await page.getByRole('button', { name: 'Confirm' }).click();
    await page.getByRole('link', { name: '󰕮 Dashboard' }).click();
  })
})