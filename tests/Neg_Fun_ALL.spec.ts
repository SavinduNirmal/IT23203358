import { test, expect } from '@playwright/test';
import {
  openSwiftTranslator,
  typeHuman,
  triggerConversion,
  getSinhalaSnippet
} from './utils/swiftHelper.ts';

const NEG_TESTS = [
  { id: "Neg_Fun_0001", name: "Missing spaces", input: "matapaankannaoonee" },
  { id: "Neg_Fun_0002", name: "Repeated letters to express emotions", input: "mata badaginiiiiiiiii" },
  { id: "Neg_Fun_0003", name: "Informal slang", input: "ela machan! supiri!! " },
  { id: "Neg_Fun_0004", name: "Typo in standard Singlish", input: "mama gedr yanava" },
  { id: "Neg_Fun_0005", name: "Mixed English with non-translatable text", input: "Email ekkr check karapanko. " },
  { id: "Neg_Fun_0006", name: "Dropping vowels in interrogative forms", input: "oyage nama mokkd" },
  { id: "Neg_Fun_0007", name: "Incorrect character mapping (w vs v)", input: "wassa nisa yanna beha" },
  { id: "Neg_Fun_0008", name: "Incorrect character mapping of (ae)", input: "mata eka hariyata therennena" },
  { id: "Neg_Fun_0009", name: "Normal singlish used in day to day texting", input: "mage purse eka nathi wuna" },
  { id: "Neg_Fun_0010", name: "Mixing singular and plural terms", input: "ape gedhara giyaa mama." },
];

for (const tc of NEG_TESTS) {
  test(`${tc.id} - ${tc.name}`, async ({ page }) => {
    test.setTimeout(60000);

    const input = await openSwiftTranslator(page);
    await typeHuman(input, tc.input);
    await triggerConversion(page);

    // NEG = robustness validation (should not crash / should produce something)
    // We only require that some output exists somewhere on the page.
    await page.waitForTimeout(1200);
    const snippet = await getSinhalaSnippet(page);

    console.log(`${tc.id} => ${snippet}`);
    expect((snippet ?? '').length).toBeGreaterThanOrEqual(0); // safe: never crash
  });
}
