import { expect, Page, Locator } from '@playwright/test';

const SINHALA_REGEX = /[\u0D80-\u0DFF]/; // Sinhala Unicode block

async function firstVisibleLocator(page: Page, selectors: string[]): Promise<Locator> {
  for (const sel of selectors) {
    const loc = page.locator(sel).first();
    try {
      if (await loc.isVisible({ timeout: 1500 })) return loc;
    } catch {}
  }
  throw new Error(
    `Could not find a visible input field. Tried selectors: ${selectors.join(', ')}`
  );
}

export async function openSwiftTranslator(page: Page) {
  await page.goto('https://www.swifttranslator.com/', { waitUntil: 'domcontentloaded' });

  // Some sites load content after first render
  await page.waitForTimeout(1000);

  // Try multiple common selectors for the input field (robust for UI changes)
  const input = await firstVisibleLocator(page, [
    '#input',
    '#source',
    '#sourceText',
    '#transliterateTextarea',
    'textarea[placeholder*="Singlish" i]',
    'textarea[placeholder*="Type" i]',
    'textarea',
    '[contenteditable="true"]'
  ]);

  await expect(input).toBeVisible();
  return input;
}

export async function typeHuman(input: Locator, text: string) {
  await input.click();
  // clear
  try {
    await input.fill('');
  } catch {
    // if contenteditable
    await input.evaluate((el) => (el.textContent = ''));
  }

  // Long input: fill fast to avoid timeout
  if (text.length >= 300) {
    try {
      await input.fill(text);
    } catch {
      await input.evaluate((el, t) => (el.textContent = t), text);
    }
    await input.page().waitForTimeout(1200);
    return;
  }

  // Short/medium: type like a human
  await input.type(text, { delay: 90 });
  await input.page().waitForTimeout(800);
}

export async function triggerConversion(page: Page) {
  // Many transliteration sites convert after pressing Space / Enter
  await page.keyboard.press('Space');
  await page.waitForTimeout(600);
}

export async function waitForSinhalaOnPage(page: Page, timeoutMs = 20000) {
  await page.waitForFunction(() => {
    const re = /[\u0D80-\u0DFF]/;
    return re.test(document.body.innerText);
  }, { timeout: timeoutMs });
}

export async function getSinhalaSnippet(page: Page) {
  // Return a small snippet from the page that contains Sinhala (useful for logs)
  return await page.evaluate(() => {
    const re = /[\u0D80-\u0DFF]/;
    const text = document.body.innerText || '';
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    const hit = lines.find(l => re.test(l));
    return hit ?? '';
  });
}

export { SINHALA_REGEX };
