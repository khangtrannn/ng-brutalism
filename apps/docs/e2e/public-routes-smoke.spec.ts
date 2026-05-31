import { test, expect } from '@playwright/test';

import { DOCS_PUBLIC_ROUTES } from '../src/app/docs/docs-public-routes';

const PUBLIC_ROUTES = DOCS_PUBLIC_ROUTES.map((route) => route.path);

for (const route of PUBLIC_ROUTES) {
  test(`loads ${route}`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.ok()).toBeTruthy();
    await expect(page.locator('body')).toBeVisible();
    await expect(page.locator('body')).not.toContainText('404');
  });
}
