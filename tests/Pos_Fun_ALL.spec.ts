import { test, expect } from '@playwright/test';
import {
  openSwiftTranslator,
  typeHuman,
  triggerConversion,
  waitForSinhalaOnPage,
  getSinhalaSnippet,
  SINHALA_REGEX
} from './utils/swiftHelper.ts';

const POS_TESTS = [
  { id: "Pos_Fun_0001", name: "Convert simple daily usage sentence", input: "mama gedhara yanavaa" },
  { id: "Pos_Fun_0002", name: "Convert present tense daily sentence", input: "api raeta kaeema kanavaa" },
  { id: "Pos_Fun_0003", name: "Convert simple interrogative sentence", input: "oyaata nidhimathadha? " },
  { id: "Pos_Fun_0004", name: "Convert simple mixed Singlish–English sentence", input: "eyaa office ekata giyaa" },
  { id: "Pos_Fun_0005", name: "Convert compound sentence with condition", input: "mama kadeeta giyaa, eth vahinna gaththa" },
  { id: "Pos_Fun_0006", name: "Convert compound sentence with mixed English words", input: "mama presentation eka email karaa " },
  { id: "Pos_Fun_0007", name: "Convert complex sentence with condition", input: "oya enavaanam mama balan innavaa." },
  { id: "Pos_Fun_0008", name: "Convert complex sentence with dependency", input: "oya anivaarayenma enavaanam mama balagena innavaa" },
  { id: "Pos_Fun_0009", name: "Convert past tense sentence with English words", input: "venadhata vadaa adha traffic thibbath mama office giyaa" },
  { id: "Pos_Fun_0010", name: "Convert negative sentence with mixed English", input: "hodhatama vaessa unath api trip eka cancel kalea naehae" },
  { id: "Pos_Fun_0011", name: "Convert interrogative daily usage sentence", input: "oyaa kavadhadha enna hithan inne? " },
  { id: "Pos_Fun_0012", name: "Convert past tense sentence with meeting context", input: "oya kiyatadha meeting eka patan gaththea " },
  { id: "Pos_Fun_0013", name: "Convert interrogative sentence for system behavior", input: "meeka hariyata vaeda karanavaadha?" },
  { id: "Pos_Fun_0014", name: "Convert imperative command with English word", input: "vahaama eyaata call ekak ganna !" },
  { id: "Pos_Fun_0015", name: "Convert simple imperative daily command", input: "malli issarahata poddak yanna" },
  { id: "Pos_Fun_0016", name: "Convert polite imperative request", input: "karuNaakaralaa eeka mata dhenna puluvandha" },
  { id: "Pos_Fun_0017", name: "Convert future tense sentence", input: "api heta hike ekak yanavaa " },
  { id: "Pos_Fun_0018", name: "Convert past tense daily activity sentence", input: "mama ehe kalin gihin thiyenavaa " },
  { id: "Pos_Fun_0019", name: "Convert greeting with interrogative form", input: "aayuboovan, oyaata kohomadha? " },
  { id: "Pos_Fun_0020", name: "Convert polite request sentence", input: "mata podi udhavvak karanna puLuvandha " },
  { id: "Pos_Fun_0021", name: "Convert short present tense response", input: "hari, mama dhaen karannam " },
  { id: "Pos_Fun_0022", name: "Convert past tense sentence with location", input: "mama ada udhee bus stand ekata giyaa" },
  { id: "Pos_Fun_0023", name: "Converting informal / slangs", input: "ae bn mata ara video tika dhaapanko, thanks machan " },
  { id: "Pos_Fun_0024", name: "Converting numbers with interrogative form", input: "meeka Rs. 1500 dha?" },
];

for (const tc of POS_TESTS) {
  test(`${tc.id} - ${tc.name}`, async ({ page }) => {
    test.setTimeout(60000);

    const input = await openSwiftTranslator(page);
    await typeHuman(input, tc.input);
    await triggerConversion(page);

    await waitForSinhalaOnPage(page, 20000);

    const snippet = await getSinhalaSnippet(page);
    console.log(`${tc.id} => ${snippet}`);

    expect(snippet).toMatch(SINHALA_REGEX);
  });
}
