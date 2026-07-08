import { test, expect } from '@playwright/test';

import { DOCS_PUBLIC_ROUTES } from '../src/app/docs/docs-public-routes';

const PUBLIC_ROUTES = DOCS_PUBLIC_ROUTES.map((route) => route.path);

for (const route of PUBLIC_ROUTES) {
  test(`loads ${route}`, async ({ page }) => {
    // Act
    const response = await page.goto(route);

    // Assert
    expect(response?.ok()).toBeTruthy();
    await expect(page.locator('body')).toBeVisible();
    await expect(page.locator('body')).not.toContainText('404');
  });
}
