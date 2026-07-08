import { test, expect } from '@playwright/test';

test.describe('podcast card recipe', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/recipes/podcast-card');
  });

  test('renders the podcast card', async ({ page }) => {
    // Arrange
    const card = page.locator('recipe-podcast-card');

    // Assert
    await expect(card).toBeVisible();

    await expect(card.getByText('Build Loud FM')).toBeVisible();
    await expect(
      card.getByRole('heading', { name: /DESIGN.*SYSTEMS.*THAT SCALE/s })
    ).toBeVisible();
    await expect(card.getByRole('button', { name: /Listen Now/i })).toBeVisible();
  });

  test('"Podcast" chip uses padding="lg"', async ({ page }) => {
    // Arrange
    const chip = page.locator('[nbChip]', { hasText: 'Podcast' }).first();

    // Assert
    await expect(chip).toBeVisible();
    await expect(chip).toHaveAttribute('data-padding', 'lg');

    const padding = await chip.evaluate((el) => {
      const s = getComputedStyle(el);
      return {
        left: s.paddingLeft,
        right: s.paddingRight,
        top: s.paddingTop,
        bottom: s.paddingBottom,
      };
    });

    expect(padding.left).toBe('16px');
    expect(padding.right).toBe('16px');
    expect(padding.top).toBe('8px');
    expect(padding.bottom).toBe('8px');
  });

  test('default chips render with padding="md" (smaller than lg)', async ({
    page,
  }) => {
    // Arrange
    const chip = page.locator('[nbChip]', { hasText: '45 MIN' }).first();

    // Assert
    await expect(chip).toBeVisible();
    await expect(chip).toHaveAttribute('data-padding', 'md');

    const padding = await chip.evaluate((el) => {
      const s = getComputedStyle(el);
      return { left: s.paddingLeft, top: s.paddingTop };
    });

    expect(padding.left).toBe('10px');
    expect(padding.top).toBe('2px');
  });
});
