import { test, expect } from '@playwright/test';

test.describe('nbText docs page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components/text');
  });

  test('page loads with correct heading and description', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Text', exact: true })).toBeVisible();
    await expect(page.getByText('nbText', { exact: true }).first()).toBeVisible();
  });

  test('stat tiles show correct counts', async ({ page }) => {
    const header = page.locator('header#overview');

    // 4 data tiles + 1 source tile (also uses nb-stat-tile)
    await expect(header.locator('.nb-stat-tile')).toHaveCount(5);

    await expect(header.locator('.nb-stat-tile--yellow .nb-stat-tile__label')).toHaveText('Sizes');
    await expect(header.locator('.nb-stat-tile--mint .nb-stat-tile__label')).toHaveText('Weights');
    await expect(header.locator('.nb-stat-tile--pink .nb-stat-tile__label')).toHaveText('Tones');
    await expect(header.locator('.nb-stat-tile--yellow .nb-stat-tile__value')).toHaveText('5');
    await expect(header.locator('.nb-stat-tile--mint .nb-stat-tile__value')).toHaveText('6');
    await expect(header.locator('.nb-stat-tile--pink .nb-stat-tile__value')).toHaveText('10');
    // Inputs tile: two lavender tiles (data + source), filter by label
    await expect(
      header.locator('.nb-stat-tile--lavender').filter({ hasText: 'Inputs' }).locator('.nb-stat-tile__value')
    ).toHaveText('8');
  });

  test('preview section renders brand text, description, and label', async ({ page }) => {
    const preview = page.locator('section#preview');
    await expect(preview.getByText('Roam & Go')).toBeVisible();
    await expect(preview.getByText(/Explore iconic neighborhoods/)).toBeVisible();
    await expect(preview.getByText('New release')).toBeVisible();
  });

  test('sizes section renders all 5 size variants', async ({ page }) => {
    const sizes = page.locator('section#sizes [nbText]');
    await expect(sizes).toHaveCount(5);

    // Verify visual progression: xl text should be taller than xs text
    const xsBox = await sizes.nth(0).boundingBox();
    const xlBox = await sizes.nth(4).boundingBox();
    expect(xsBox).not.toBeNull();
    expect(xlBox).not.toBeNull();
    expect(xlBox!.height).toBeGreaterThanOrEqual(xsBox!.height);
  });

  test('weights section renders all 6 weight variants', async ({ page }) => {
    const weights = page.locator('section#weights [nbText]');
    await expect(weights).toHaveCount(6);
    await expect(weights.filter({ hasText: 'Build loud. Stay sharp.' })).toHaveCount(6);
  });

  test('tones section renders all 10 tone variants', async ({ page }) => {
    const tones = page.locator('section#tones [nbText]');
    await expect(tones).toHaveCount(10);
  });

  test('transform section renders all 4 transform variants', async ({ page }) => {
    const transforms = page.locator('section#transform [nbText]');
    await expect(transforms).toHaveCount(4);

    // The uppercase variant is identified by its data-transform attribute
    const upperText = page.locator('section#transform [data-transform="uppercase"]');
    await expect(upperText).toBeVisible();
  });

  test('tracking section renders all 4 tracking variants', async ({ page }) => {
    const trackings = page.locator('section#tracking [nbText]');
    await expect(trackings).toHaveCount(4);
  });

  test('measure section renders all 5 measure variants', async ({ page }) => {
    const measures = page.locator('section#measure [nbText]');
    await expect(measures).toHaveCount(5);

    // Wider measure means wider max-width — check that md is wider than xs
    const xsBox = await measures.nth(1).boundingBox();
    const mdBox = await measures.nth(3).boundingBox();
    expect(xsBox).not.toBeNull();
    expect(mdBox).not.toBeNull();
    // md measure (36rem) should allow a wider rendered width than xs (20rem)
    // given the paragraph is long enough to hit the cap
    expect(mdBox!.width).toBeGreaterThanOrEqual(xsBox!.width);
  });

  test('leading section renders all 4 leading variants', async ({ page }) => {
    const leadings = page.locator('section#leading [nbText]');
    await expect(leadings).toHaveCount(4);

    // relaxed leading should produce taller paragraph than tight leading
    const tightBox = await leadings.nth(1).boundingBox();
    const relaxedBox = await leadings.nth(3).boundingBox();
    expect(tightBox).not.toBeNull();
    expect(relaxedBox).not.toBeNull();
    expect(relaxedBox!.height).toBeGreaterThan(tightBox!.height);
  });

  test('composition section renders Display, chips, and callout together', async ({ page }) => {
    const section = page.locator('section#composition');
    await expect(section.getByText('Build loud.')).toBeVisible();
    await expect(section.getByText('Flight included')).toBeVisible();
    await expect(section.getByText('Hotel')).toBeVisible();
    await expect(section.getByText('$799')).toBeVisible();
  });

  test('API table has 8 input rows with correct headings', async ({ page }) => {
    const table = page.locator('section#api table');
    await expect(table).toBeVisible();

    const headers = table.locator('thead th');
    await expect(headers).toHaveCount(4);
    await expect(headers.nth(0)).toHaveText('Input');
    await expect(headers.nth(1)).toHaveText('Type');
    await expect(headers.nth(2)).toHaveText('Default');
    await expect(headers.nth(3)).toHaveText('Description');

    const rows = table.locator('tbody tr');
    await expect(rows).toHaveCount(8);

    const inputNames = ['size', 'weight', 'tone', 'transform', 'tracking', 'measure', 'leading', 'reset'];
    for (const [i, name] of inputNames.entries()) {
      await expect(rows.nth(i).locator('td').first()).toHaveText(name);
    }
  });

  test('source tile link points to the text library', async ({ page }) => {
    const sourceLink = page.locator('docs-source-tile a');
    await expect(sourceLink).toBeVisible();
    const href = await sourceLink.getAttribute('href');
    expect(href).toContain('ng-brutalism');
    expect(href).toContain('text');
  });

  test('page has no horizontal overflow at desktop width', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 2); // 2px rounding tolerance
  });

  test('page renders correctly at mobile width', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await expect(page.getByRole('heading', { name: 'Text', exact: true })).toBeVisible();
    const preview = page.locator('section#preview');
    await expect(preview).toBeVisible();
  });
});
