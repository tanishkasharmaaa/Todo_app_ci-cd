import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('textbox', { name: 'Enter your todo...' }).fill('Gym Training');
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Delete Gym Training' }).click();
});