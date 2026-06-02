import { expect, test } from '@playwright/test';

test.describe('composition docs page', () => {
  test('underlined display headings shrink-wrap percentage underline widths', async ({
    page,
  }) => {
    await page.goto('/composition/stack-and-cluster');

    const heading = page
      .locator('section#stack-example h2[nbDisplay]')
      .filter({ hasText: 'Open role' });
    await expect(heading).toBeVisible();

    const metrics = await heading.evaluate((el) => {
      const host = getComputedStyle(el);
      const after = getComputedStyle(el, '::after');
      const stack = el.parentElement;

      return {
        alignSelf: host.alignSelf,
        headingWidth: el.getBoundingClientRect().width,
        stackWidth: stack?.getBoundingClientRect().width ?? 0,
        underlineWidth: Number.parseFloat(after.width),
      };
    });

    expect(metrics.alignSelf).toBe('flex-start');
    expect(metrics.headingWidth).toBeLessThan(metrics.stackWidth * 0.6);
    expect(metrics.underlineWidth).toBeCloseTo(metrics.headingWidth * 0.45, 0);
  });
});
