# IT3040 – Assignment 1  
## Automated Testing of Singlish to  sinhala Translator using Playwright

---

## 📌 Assignment Overview

This project is developed for **IT3040 – ITPM (Semester 1)** Assignment 1.  
The objective of this assignment is to test a real-world **Singlish-to-sinhala transliteration website** and evaluate:

- Functional correctness of transliteration (Singlish → sinhala)
- Robustness when inputs are messy or unusual
- User Interface (UI) behavior under real user interaction

All identified scenarios are **automated using Playwright**.

---

## 🌐 System Under Test

**Website:** https://www.swifttranslator.com/

- **Input:** Singlish (sinhala words written using English letters)
- **Output:** sinhala script
- Conversion is triggered automatically by user interaction (for example, pressing the Space key)

---

## ✅ Testing Scope

### Included
- Functional testing (Positive and Negative scenarios)
- UI behavior testing
- Automation with Playwright

### Not Included
- Backend API testing
- Performance testing
- Security testing

---

## 🧪 Test Case Summary

| Test Type | Count |
|----------|------:|
| Positive Functional Tests | 24 |
| Negative Functional Tests | 10 |
| UI Test Scenarios | 1 |
| **Total Automated Tests** | **35** |

All test cases are documented in the provided Excel sheet using the Appendix 2 template.

---

## 🛠 Technologies Used

- Playwright
- TypeScript
- Node.js & npm
- Chromium Browser
- Visual Studio Code

---

## 📁 Project Structure

```
IT3040_Assignment1_Playwright/
│
├── tests/
│   ├── Pos_Fun_ALL.spec.ts
│   ├── Neg_Fun_ALL.spec.ts
│   ├── Pos_UI_0001_realtime_update.spec.ts
│   └── utils/
│       └── changathiHelper.ts
│
├── playwright.config.ts
├── package.json
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Prerequisites
Ensure the following are installed:
- Node.js (v16 or later)
- npm
- Visual Studio Code (recommended)

---

### 2️⃣ Install Dependencies

Open the project folder in VS Code and run:

```bash
npm install
```

---

### 3️⃣ Install Playwright Browsers

```bash
npx playwright install
```

---

## ▶️ How to Run Tests

### Run ALL test cases

```bash
npx playwright test --project=chromium
```

This runs:
- All positive functional tests
- All negative functional tests
- The UI test scenario

---

### Run UI test only (with browser view)

```bash
npx playwright test tests/Pos_UI_0001_realtime_update.spec.ts --project=chromium --headed
```

This visibly demonstrates:
- Typing Singlish text
- Pressing Space
- Automatic conversion to sinhala

---

### View HTML Report

```bash
npx playwright show-report
```

---

## 🧠 Test Design Strategy

### Positive Functional Tests
- Validate correct Singlish to sinhala conversion
- Assertion: Output contains sinhala Unicode characters

### Negative Functional Tests
- Validate robustness for messy or edge-case inputs
- Assertion: Output exists and system does not crash
- Translation failures are documented in the Excel sheet

### UI Test
- Validates automatic conversion triggered by user interaction
- Confirms usability without a manual Convert button

---

## 📄 Notes

- Tests are executed only on **Chromium** for consistent behavior
- Automation detection is minimized for reliable transliteration
- Long inputs are optimized to avoid timeout issues

---

## ✅ Conclusion

This project demonstrates:
- Practical automation testing using Playwright
- Functional, robustness, and UI-focused testing
- Clear documentation aligned with assignment requirements

# IT23203358
# IT23203358
