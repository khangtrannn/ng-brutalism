import { test, expect } from '@playwright/test';

test('sticker face eyes are vertically aligned', async ({ page }) => {
  await page.goto('/components/sticker');

  const face = page.locator('nb-sticker-face').first();
  await expect(face).toBeVisible();

  const eyes = face.locator('.nb-sticker-face__eye');
  await expect(eyes).toHaveCount(2);

  const [leftBox, rightBox] = await Promise.all([
    eyes.nth(0).boundingBox(),
    eyes.nth(1).boundingBox(),
  ]);

  expect(leftBox).not.toBeNull();
  expect(rightBox).not.toBeNull();

  const leftCenterY = leftBox!.y + leftBox!.height / 2;
  const rightCenterY = rightBox!.y + rightBox!.height / 2;

  expect(Math.abs(leftCenterY - rightCenterY)).toBeLessThan(2);
});

test('sticker face is centered within the star sticker', async ({ page }) => {
  await page.goto('/components/sticker');

  // Use the star in the shapes section (has fixed size, easier to measure)
  const starSticker = page.locator('[data-shape="star"]').first();
  const face = starSticker.locator('nb-sticker-face');

  await expect(starSticker).toBeVisible();
  await expect(face).toBeVisible();

  const [stickerBox, faceBox] = await Promise.all([
    starSticker.boundingBox(),
    face.boundingBox(),
  ]);

  expect(stickerBox).not.toBeNull();
  expect(faceBox).not.toBeNull();

  const stickerCenterX = stickerBox!.x + stickerBox!.width / 2;
  const stickerCenterY = stickerBox!.y + stickerBox!.height / 2;
  const faceCenterX = faceBox!.x + faceBox!.width / 2;
  const faceCenterY = faceBox!.y + faceBox!.height / 2;

  // Face should be within 8% of the sticker's center in both axes
  const toleranceX = stickerBox!.width * 0.08;
  const toleranceY = stickerBox!.height * 0.08;

  expect(Math.abs(faceCenterX - stickerCenterX)).toBeLessThan(toleranceX);
  expect(Math.abs(faceCenterY - stickerCenterY)).toBeLessThan(toleranceY);
});
