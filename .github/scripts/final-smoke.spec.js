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
  return box.y >= -3 && box.y + box.height <= height + 3;
}

async function scrollAndCheck(page, selector, height) {
  const locator = page.locator(selector);
  await locator.scrollIntoViewIfNeeded();
  await page.waitForTimeout(120);
  expect(await inViewport(locator, height), `${selector} outside viewport`).toBeTruthy();
}

for (const size of sizes) {
  test(`layout ${size.width}x${size.height}`, async ({ page }) => {
    await page.setViewportSize(size);
    await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('.slide-counter')).toContainText('/ 16');
    await expect(page.locator('.panel')).toHaveCount(16);

    // Base-state content at the bottom of the denser slides must remain visible.
    await scrollAndCheck(page, '#evidence .source-note', size.height);
    await scrollAndCheck(page, '#crowd .crowd-payoff', size.height);
    await scrollAndCheck(page, '#embodiment .field-caption', size.height);
    await scrollAndCheck(page, '#energy .kardashev-footer', size.height);
    await scrollAndCheck(page, '#navigator .environment-workspace', size.height);
    await scrollAndCheck(page, '#markets .market-payoff', size.height);
    await scrollAndCheck(page, '#consulting .value-chain-payoff', size.height);
    await scrollAndCheck(page, '#bet .bet-grid', size.height);

    // Slide 3 reveal.
    const evidence = page.locator('#evidence');
    await evidence.scrollIntoViewIfNeeded();
    await evidence.click({ position: { x: 420, y: 300 } });
    await expect(page.locator('#evidence .threshold-overlay')).toBeVisible();
    expect(await inViewport(page.locator('#evidence .threshold-overlay'), size.height)).toBeTruthy();
    await expect(page.locator('#evidence .threshold-thesis')).toBeVisible();

    // Slide 4 reveal.
    const commodity = page.locator('#commodity');
    await commodity.scrollIntoViewIfNeeded();
    await commodity.click({ position: { x: 420, y: 300 } });
    await expect(page.locator('#commodity .abundance-overlay')).toBeVisible();
    expect(await inViewport(page.locator('#commodity .abundance-overlay'), size.height)).toBeTruthy();
    await expect(page.locator('#commodity .abundance-thesis')).toBeVisible();

    // Energy base plus planetary and Dyson reveal states.
    const energy = page.locator('#energy');
    await energy.scrollIntoViewIfNeeded();
    expect(await inViewport(page.locator('#energy .kardashev-footer'), size.height)).toBeTruthy();
    await energy.click({ position: { x: 420, y: 280 } });
    await expect(page.locator('#energy .planetary-overlay')).toBeVisible();
    expect(await inViewport(page.locator('#energy .planetary-overlay'), size.height)).toBeTruthy();
    await expect(page.locator('#energy .planetary-next')).toBeVisible();
    await energy.click({ position: { x: 420, y: 280 } });
    await expect(page.locator('#energy .dyson-overlay')).toBeVisible();
    expect(await inViewport(page.locator('#energy .dyson-overlay'), size.height)).toBeTruthy();
    await expect(page.locator('#energy .dyson-overlay-copy small')).toBeVisible();

    // Resources route resolves and carries the primary incident source.
    await page.goto('http://127.0.0.1:4173/resources', { waitUntil: 'networkidle' });
    await expect(page.getByText('The Hugging Face incident and the road ahead')).toBeVisible();
  });
}

test('slide-number and keyboard navigation', async ({ page }) => {
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
  const input = page.locator('#slide-number');
  await input.fill('10');
  await input.press('Enter');
  await page.waitForTimeout(700);
  await expect(input).toHaveValue('10');

  // Arrow navigation is a canvas-level interaction, so move focus off the input first.
  await input.blur();
  await page.keyboard.press('ArrowDown');
  await page.waitForTimeout(700);
  await expect(input).toHaveValue('11');
  await page.keyboard.press('ArrowUp');
  await page.waitForTimeout(700);
  await expect(input).toHaveValue('10');
});
