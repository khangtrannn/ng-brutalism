import { test, expect } from '@playwright/test';

test.describe('nbText docs page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components/text');
  });

  test('page loads with correct heading and description', async ({ page }) => {
    // Assert
    await expect(page.getByRole('heading', { name: 'Text', exact: true })).toBeVisible();
    await expect(page.getByText('nbText', { exact: true }).first()).toBeVisible();
  });

  test('stat tiles show correct counts', async ({ page }) => {
    // Arrange
    const header = page.locator('header#overview');

    // Assert
    await expect(header.locator('.nb-stat-tile')).toHaveCount(5);

    await expect(header.locator('.nb-stat-tile--yellow .nb-stat-tile__label')).toHaveText('Sizes');
    await expect(header.locator('.nb-stat-tile--mint .nb-stat-tile__label')).toHaveText('Weights');
    await expect(header.locator('.nb-stat-tile--pink .nb-stat-tile__label')).toHaveText('Tones');
    await expect(header.locator('.nb-stat-tile--yellow .nb-stat-tile__value')).toHaveText('5');
    await expect(header.locator('.nb-stat-tile--mint .nb-stat-tile__value')).toHaveText('6');
    await expect(header.locator('.nb-stat-tile--pink .nb-stat-tile__value')).toHaveText('10');
    await expect(
      header.locator('.nb-stat-tile--lavender').filter({ hasText: 'Inputs' }).locator('.nb-stat-tile__value')
    ).toHaveText('8');
  });

  test('preview section renders brand text, description, and label', async ({ page }) => {
    // Arrange
    const preview = page.locator('section#preview');

    // Assert
    await expect(preview.getByText('Roam & Go')).toBeVisible();
    await expect(preview.getByText(/Explore iconic neighborhoods/)).toBeVisible();
    await expect(preview.getByText('New release')).toBeVisible();
  });

  test('sizes section renders all 5 size variants', async ({ page }) => {
    // Arrange
    const sizes = page.locator('section#sizes [nbText]');

    // Assert
    await expect(sizes).toHaveCount(5);

    const xsBox = await sizes.nth(0).boundingBox();
    const xlBox = await sizes.nth(4).boundingBox();
    expect(xsBox).not.toBeNull();
    expect(xlBox).not.toBeNull();
    expect(xlBox!.height).toBeGreaterThanOrEqual(xsBox!.height);
  });

  test('weights section renders all 6 weight variants', async ({ page }) => {
    // Arrange
    const weights = page.locator('section#weights [nbText]');

    // Assert
    await expect(weights).toHaveCount(6);
    await expect(weights.filter({ hasText: 'Build loud. Stay sharp.' })).toHaveCount(6);
  });

  test('tones section renders all 10 tone variants', async ({ page }) => {
    // Arrange
    const tones = page.locator('section#tones [nbText]');

    // Assert
    await expect(tones).toHaveCount(10);
  });

  test('transform section renders all 4 transform variants', async ({ page }) => {
    // Arrange
    const transforms = page.locator('section#transform [nbText]');

    // Assert
    await expect(transforms).toHaveCount(4);

    const upperText = page.locator('section#transform [data-transform="uppercase"]');
    await expect(upperText).toBeVisible();
  });

  test('tracking section renders all 4 tracking variants', async ({ page }) => {
    // Arrange
    const trackings = page.locator('section#tracking [nbText]');

    // Assert
    await expect(trackings).toHaveCount(4);
  });

  test('measure section renders all 5 measure variants', async ({ page }) => {
    // Arrange
    const measures = page.locator('section#measure [nbText]');

    // Assert
    await expect(measures).toHaveCount(5);

    const xsBox = await measures.nth(1).boundingBox();
    const mdBox = await measures.nth(3).boundingBox();
    expect(xsBox).not.toBeNull();
    expect(mdBox).not.toBeNull();
    expect(mdBox!.width).toBeGreaterThanOrEqual(xsBox!.width);
  });

  test('leading section renders all 4 leading variants', async ({ page }) => {
    // Arrange
    const leadings = page.locator('section#leading [nbText]');

    // Assert
    await expect(leadings).toHaveCount(4);

    const tightBox = await leadings.nth(1).boundingBox();
    const relaxedBox = await leadings.nth(3).boundingBox();
    expect(tightBox).not.toBeNull();
    expect(relaxedBox).not.toBeNull();
    expect(relaxedBox!.height).toBeGreaterThan(tightBox!.height);
  });

  test('composition section renders Display, chips, and callout together', async ({ page }) => {
    // Arrange
    const section = page.locator('section#composition');

    // Assert
    await expect(section.getByText('Build loud.')).toBeVisible();
    await expect(section.getByText('Flight included')).toBeVisible();
    await expect(section.getByText('Hotel')).toBeVisible();
    await expect(section.getByText('$799')).toBeVisible();
  });

  test('API table has 8 input rows with correct headings', async ({ page }) => {
    // Arrange
    const table = page.locator('section#api table');

    // Assert
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
    // Arrange
    const sourceLink = page.locator('docs-source-tile a');

    // Assert
    await expect(sourceLink).toBeVisible();
    const href = await sourceLink.getAttribute('href');
    expect(href).toContain('ng-brutalism');
    expect(href).toContain('text');
  });

  test('page has no horizontal overflow at desktop width', async ({ page }) => {
    // Act
    await page.setViewportSize({ width: 1280, height: 900 });

    // Assert
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 2); // 2px rounding tolerance
  });

  test('page renders correctly at mobile width', async ({ page }) => {
    // Act
    await page.setViewportSize({ width: 375, height: 812 });

    // Assert
    await expect(page.getByRole('heading', { name: 'Text', exact: true })).toBeVisible();
    const preview = page.locator('section#preview');
    await expect(preview).toBeVisible();
  });
});
