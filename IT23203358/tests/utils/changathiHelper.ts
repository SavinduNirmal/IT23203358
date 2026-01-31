import { expect, Page } from '@playwright/test';

export async function openChangathi(page: Page) {
  await page.goto('https://tamil.changathi.com/', { waitUntil: 'load' });
  const box = page.locator('#transliterateTextarea');
  await expect(box).toBeVisible();
  return box;
}

export async function typeHuman(box: any, text: string) {
  await box.click();
  await box.fill('');

  // If input is long, use fill() (fast) to avoid timeout
  if (text.length >= 300) {
    await box.fill(text);
    await box.page().waitForTimeout(1200);
    return;
  }

  // Otherwise, type slowly like a human
  await box.type(text, { delay: 120 });
  await box.page().waitForTimeout(900);
}

export async function getValue(box: any) {
  return await box.inputValue();
}
