import { test, expect } from '@playwright/test';

// Public docs routes that should be prerendered and load successfully.
// Keep in sync with apps/docs/src/app/docs/docs-public-routes.ts
const PUBLIC_ROUTES = [
  '/',
  '/docs/introduction',
  '/docs/installation',
  '/docs/inspired-designs',
  '/docs/faq',
  '/components/button',
  '/components/card',
  '/components/dialog',
  '/components/accordion',
  '/components/input',
  '/components/input-group',
  '/components/avatar',
  '/components/avatar-group',
  '/components/badge',
  '/components/callout',
  '/components/checkbox',
  '/components/chip',
  '/components/cluster',
  '/components/display',
  '/components/halftone',
  '/components/icon',
  '/components/icon-button',
  '/components/image-card',
  '/components/label',
  '/components/marquee',
  '/components/media-frame',
  '/components/media-item',
  '/components/progress',
  '/components/rating',
  '/components/select',
  '/components/separator',
  '/components/section',
  '/components/split',
  '/components/stack',
  '/components/stat',
  '/components/status-dot',
  '/components/sticker',
  '/components/surface',
  '/components/text',
  '/components/textarea',
  '/components/title',
  '/recipes/travel-card',
  '/recipes/job-card',
  '/showcase/portfolio',
];

for (const route of PUBLIC_ROUTES) {
  test(`loads ${route}`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.ok()).toBeTruthy();
    await expect(page.locator('body')).toBeVisible();
    await expect(page.locator('body')).not.toContainText('404');
  });
}
