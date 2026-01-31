import { test, expect } from '@playwright/test';
import { openChangathi } from './utils/changathiHelper';

test('Pos_UI_0001 - Auto conversion triggers after pressing Space (UI behavior)', async ({ page }) => {
  const box = await openChangathi(page);

  await box.click();
  await box.fill('');

  await box.type('mama gedhara yanavaa', { delay: 150 });
  const before = await box.inputValue();

  await page.keyboard.press('Space');
  await page.waitForTimeout(800);

  const after = await box.inputValue();
  console.log('Before:', before);
  console.log('After:', after);

  expect(before).toMatch(/[a-zA-Z]/);
  expect(after).toMatch(/[\u0B80-\u0BFF]/);
});
