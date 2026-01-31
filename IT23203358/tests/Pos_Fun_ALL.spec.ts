import { test, expect } from '@playwright/test';
import { openChangathi, typeHuman, getValue } from './utils/changathiHelper';

const POS_TESTS = [
  { id: "Pos_Fun_0001", name: "Convert a short daily greeting phrase", input: "naan oorukku poren" },
  { id: "Pos_Fun_0002", name: "compound", input: "naan vilayadanum aanal parichai irukkadhal pokalla " },
  { id: "Pos_Fun_0003", name: "Complex sentences", input: "nee varuvai enral naan kaathukondiruppen " },
  { id: "Pos_Fun_0004", name: "Convert a Interrogative word", input: "neegal sugama " },
  { id: "Pos_Fun_0005", name: "Convert a Imperative word", input: "anke pogadhe " },
  { id: "Pos_Fun_0006", name: "Convert a positive form", input: "nee vetri adaivai " },
  { id: "Pos_Fun_0007", name: "Convert a negative form", input: "naan varamaaten " },
  { id: "Pos_Fun_0008", name: "Convert a common greeting phrase", input: "kaalai vanakkam " },
  { id: "Pos_Fun_0009", name: "Convert request phrase", input: "idha avan kitta kodukkelumaa " },
  { id: "Pos_Fun_0010", name: "Convert a request", input: "sari, naan idha avan kitta solluren " },
  { id: "Pos_Fun_0011", name: "Convert polite request", input: "Thayavu seithu enakku udhava mudiyuma? " },
  { id: "Pos_Fun_0012", name: "Convert informal greeting", input: "Machan, eppadi irukka? " },
  { id: "Pos_Fun_0013", name: "Convert present tense", input: "naan ippo thoonga poren " },
  { id: "Pos_Fun_0014", name: "Convert daily language usage", input: "enakku velai irukku naan poran " },
  { id: "Pos_Fun_0015", name: "Convert future tense", input: "naalaikku iravu naan oorukku poren " },
  { id: "Pos_Fun_0016", name: "Convert daily need sentence", input: "enakkusaapaduvaanganum " },
  { id: "Pos_Fun_0017", name: "Convert formatting instruction", input: "idaiveli vittu vittu eludhu " },
  { id: "Pos_Fun_0018", name: "Convert past tense", input: "naan netru vaithiyasalai ponen " },
  { id: "Pos_Fun_0019", name: "Convert future negative", input: "naan naalai varamaaten " },
  { id: "Pos_Fun_0020", name: "Convert inability statement", input: "ennala seiya mudiyadhu " },
  { id: "Pos_Fun_0021", name: "Convert interrogative", input: "nee varuviya " },
  { id: "Pos_Fun_0022", name: "Convert interrogative (polite)", input: "neenga vaariyaa " },
  { id: "Pos_Fun_0023", name: "Convert polite request (long)", input: "thayavu seidhu thevayana thakavalgalai valangi engalukku udhavungal " },
  { id: "Pos_Fun_0024", name: "Convert request phrase", input: "Ungal prachinai allathu thevaiyai thelivagavum muzhuvagavum vilakkumaaru kettukkolgirom, athanaal viraivana theervu vazhanga iyalum " },
];

for (const tc of POS_TESTS) {
  test(`${tc.id} - ${tc.name}`, async ({ page }) => {
    const box = await openChangathi(page);
    await typeHuman(box, tc.input);

    const valueNow = await getValue(box);
    console.log(`${tc.id} => ${valueNow}`);

    // POS = must show Tamil letters
    expect(valueNow).toMatch(/[\u0B80-\u0BFF]/);
  });
}
