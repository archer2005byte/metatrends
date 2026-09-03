import { test, expect } from '@playwright/test';

const sizes = [
  { width: 1920, height: 1080 },
  { width: 1600, height: 900 },
  { width: 1366, height: 768 },
  { width: 1280, height: 720 },
];

async function inViewport(locator, height) {
  const box = await locator.boundingBox();
  if (!box) return false;
  return box.y >= -2 && box.y + box.height <= height + 2;
}

for (const size of sizes) {
  test(`layout ${size.width}x${size.height}`, async ({ page }) => {
    await page.setViewportSize(size);
    await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('.slide-counter')).toContainText('/ 16');
    await expect(page.locator('.panel')).toHaveCount(16);

    const overflows = await page.locator('.panel').evaluateAll((els) => els
      .map((el) => ({ id: el.id, scroll: el.scrollHeight, client: el.clientHeight }))
      .filter((x) => x.scroll > x.client + 3));
    expect(overflows, JSON.stringify(overflows)).toEqual([]);

    await page.locator('#evidence').scrollIntoViewIfNeeded();
    await page.locator('#evidence').click({ position: { x: Math.floor(size.width * .55), y: Math.floor(size.height * .5) } });
    await expect(page.locator('#evidence .threshold-overlay')).toBeVisible();
    expect(await inViewport(page.locator('#evidence .threshold-overlay'), size.height)).toBeTruthy();

    await page.locator('#commodity').scrollIntoViewIfNeeded();
    await page.locator('#commodity').click({ position: { x: Math.floor(size.width * .55), y: Math.floor(size.height * .5) } });
    await expect(page.locator('#commodity .abundance-overlay')).toBeVisible();
    expect(await inViewport(page.locator('#commodity .abundance-overlay'), size.height)).toBeTruthy();

    await page.locator('#energy').scrollIntoViewIfNeeded();
    expect(await inViewport(page.locator('#energy .kardashev-footer'), size.height)).toBeTruthy();
    await page.locator('#energy').click({ position: { x: Math.floor(size.width * .55), y: Math.floor(size.height * .45) } });
    await expect(page.locator('#energy .planetary-overlay')).toBeVisible();
    expect(await inViewport(page.locator('#energy .planetary-overlay'), size.height)).toBeTruthy();
    await page.locator('#energy').click({ position: { x: Math.floor(size.width * .55), y: Math.floor(size.height * .45) } });
    await expect(page.locator('#energy .dyson-overlay')).toBeVisible();
    expect(await inViewport(page.locator('#energy .dyson-overlay'), size.height)).toBeTruthy();

    await page.goto('http://127.0.0.1:4173/resources', { waitUntil: 'networkidle' });
    await expect(page.getByText('The Hugging Face incident and the road ahead')).toBeVisible();
  });
}

test('keyboard and slide-number navigation', async ({ page }) => {
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
  const input = page.locator('#slide-number');
  await input.fill('10');
  await input.press('Enter');
  await page.waitForTimeout(700);
  await expect(input).toHaveValue('10');
  await page.keyboard.press('ArrowDown');
  await page.waitForTimeout(700);
  await expect(input).toHaveValue('11');
  await page.keyboard.press('ArrowUp');
  await page.waitForTimeout(700);
  await expect(input).toHaveValue('10');
});
