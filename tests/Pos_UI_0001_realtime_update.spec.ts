import { test, expect } from '@playwright/test';
import {
  openSwiftTranslator,
  SINHALA_REGEX,
  waitForSinhalaOnPage
} from './utils/swiftHelper.ts';

test('Pos_UI_0001 - Sinhala output updates automatically in real-time', async ({ page }) => {
  test.setTimeout(60000);

  const input = await openSwiftTranslator(page);

  await input.click();
  try { await input.fill(''); } catch {}

  // Type slowly to simulate real-time conversion behavior
  await input.type('man gedhara yanavaa', { delay: 120 });

  // Before triggering conversion, the raw typed text is still Latin in many sites
  const before = await input.evaluate((el: any) => (el.value ?? el.textContent ?? '') as string);

  await page.keyboard.press('Space');

  // Sinhala should appear somewhere on the page (real-time output)
  await waitForSinhalaOnPage(page, 20000);

  const afterHasSinhala = await page.evaluate(() => /[\u0D80-\u0DFF]/.test(document.body.innerText));

  console.log('Before:', before);
  console.log('After Sinhala Exists:', afterHasSinhala);

  expect(before).toMatch(/[a-zA-Z]/);
  expect(afterHasSinhala).toBeTruthy();
  expect(page.locator('body')).toContainText(SINHALA_REGEX);
});
