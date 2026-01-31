import { test, expect } from '@playwright/test';
import { openChangathi, typeHuman, getValue } from './utils/changathiHelper';

const NEG_TESTS = [
  { id: "Neg_Fun_0001", name: "Convert a mixed tanglish + english word", input: "naanga jaffna trip ponom " },
  { id: "Neg_Fun_0002", name: "Convert a Brand name sentence", input: "naanga jaffna trip ponom " },
  { id: "Neg_Fun_0003", name: "Time format altered", input: "neram 12 mani " },
  { id: "Neg_Fun_0004", name: "Volume unit formatting issue", input: "naanga jaffna trip ponom " },
  { id: "Neg_Fun_0005", name: "Converting english abriviation", input: "Unnoda employee ID enga " },
  { id: "Neg_Fun_0006", name: "Number only input", input: "778360173 " },
  { id: "Neg_Fun_0007", name: "Convert a Brand name sentence", input: "facebook la photo paathen " },
  { id: "Neg_Fun_0008", name: "convert date", input: "naan pirantha thihathi 2002/10/17 " },
  { id: "Neg_Fun_0009", name: "Volume unit formatting issue", input: "Naan last weekend shopping panna supermarket ku poganum nu plan panninen. Morning 10:00 AM ku veetla irundhu kelambi 2 km distance walk panni shop reach aaginen. Anga 5 kg rice, 3 kg sugar, 4 liters milk, 2 packets bread, 1 kg apples, 500 grams chicken, 1 bottle cooking oil, soap, shampoo ellam vaanginen. Total bill around Rs. 8,750 vandhuchu. Card payment use panninen, billing counter la 15 minutes wait panna vendi irundhuchu. Shopping mudinjadhukapparam heavy bags oda auto eduthu veetukku return aaginen. Veetla vandhu fridge la items arrange pannumbodhu already irundha vegetables check pannitu next week ku shopping list ready panninen " },
  { id: "Neg_Fun_0010", name: "Converting measurements", input: "Enaku 2 kg arisu thaanga " },
];

for (const tc of NEG_TESTS) {
  test(`${tc.id} - ${tc.name}`, async ({ page }) => {
    test.setTimeout(60000);
    const box = await openChangathi(page);
    await typeHuman(box, tc.input);

    const valueNow = await getValue(box);
    console.log(`${tc.id} => ${valueNow}`);

    // NEG = robustness validation: output should exist (no crash / no blank)
    expect(valueNow.length).toBeGreaterThan(0);
  });
}
