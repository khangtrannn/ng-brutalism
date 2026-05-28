import { test, expect } from '@playwright/test';

test('loads the docs home page', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', {
      name: 'The neo-brutalist Angular UI library',
    })
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Install', exact: true })
  ).toBeVisible();
});

test('navigates to component docs', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('link', { name: 'Browse components' }).click();

  await expect(page).toHaveURL(/\/components\/button$/);
  await expect(page.getByRole('heading', { name: 'Button' })).toBeVisible();
});
