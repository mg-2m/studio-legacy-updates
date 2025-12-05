# Addis Crown - Iteration March 001

**Status:** ACTIVE
**Objective:** Transition from generic QA to a targeted, branch-specific enhancement protocol. This document replaces the previous pass/fail screening method and establishes a new standard for UI rendering, backend data structure, and linguistic precision.

---

## 1. Dynamic "Subject of Claim" Title (`የክሱ ምክንያት`)

### 1.1. Requirement
The static document title in the preview must be supplemented with a dynamic "Subject of Claim" section. This section must be contextually generated based on the selected template and user inputs.

### 1.2. Implementation
- **Structure:** `የክሱ ምክንያት ፡- [Purpose] [Value] [Pleader].`
- **Purpose Placeholder `[Purpose]`:** A dynamic phrase describing the core reason for the claim (e.g., "ለደረሰ የአካል ጉዳት ካሳ ከውል ውጭ በሆነ ኃላፊነት"). This needs to be added to the backend `meta` object of each template.
- **Value Placeholder `[Value]`:**
    - If the template has a calculator, this must display the primary output value in both number and written-out Amharic format (e.g., `ብር 39550.00 (ሰላሳ ዘጠኝ ሺህ አምስት መቶ አምሳ ብር)`).
    - If no calculator exists, it should render a placeholder `(በብር ****** ግምት የቀረበ ክስ ነው)`.
- **Pleader Placeholder `[Pleader]`:** Dynamically identify the initiating party (e.g., `በከሳሽ የቀረበ ክስ ነው`).

### 1.3. Files to Update
- `src/components/preview/page-one.tsx`: To add the new rendering logic.
- All `src/legal_branches/*.json` files: To add the new `purpose` field to the `meta` object for each template.

---

## 2. Comprehensive Amharic Translation and Presentation

### 2.1. Requirement (A): Full UI Translation
All user-facing English text must be removed from the final rendered output and replaced with professional, legal-grade Amharic. This applies to:
- Jurisdiction text (e.g., "Art. 1776 of the Civil Code").
- In-line citations within facts.
- All labels and placeholder text within the evidence sections, including both auto-linked and manual evidence forms.
- **Rule 2.1.1: Modern Numeral Standard:** All numbers, especially legal article and proclamation numbers, must be rendered using modern Arabic numerals (e.g., "123", "2024") instead of traditional Geez numerals (e.g., "፻፳፫", "፪ሺ፳፬"). This ensures consistency and modern readability across the entire platform.

### 2.2. Requirement (B): The WYSIWYG "Prophetic Editor" Mandate
To ensure clarity, grammatical correctness, and an intuitive user experience, the editor UI must, wherever possible, mirror the final rendered output. This "What You See Is What You Get" approach serves as a core principle for the platform's design.

*   **Rule 2.2.1: Sentence-Based UI Construction:** For complex data entry sections like Evidence, Facts, and Reliefs, the UI shall be constructed using pre-defined, grammatically correct Amharic sentence templates sourced from the backend (`_base.json`, `*.json`).
    *   **Sub-rule 2.2.1.1: Comprehensive Templates:** Sentence templates must be fully descriptive and include all necessary variables (e.g., `documentType`, `originalLocation`) to ensure the auto-generated sentences are as complete and legally robust as manually crafted ones.
*   **Rule 2.2.2: Embedded Inputs:** Standard input fields (`Input`, `Select`) must be embedded directly within these sentence templates at the appropriate placeholder locations. This transforms the editor into an interactive, fill-in-the-blanks version of the final document.
*   **Rule 2.2.3: Contextual Placeholders:** All embedded input fields must use watermarked placeholders to guide the user with clear examples of the required information.
    *   **Sub-rule 2.2.3.1: Amharic First:** All watermarks and placeholder text must be in clear, guiding Amharic (e.g., "የሰነዱ ገለጻ") rather than English or technical jargon.
*   **Rule 2.2.4: Unobtrusive Pre-defined Options:** When providing pre-defined choices (e.g., a list of document issuers), the UI should favor compact, "key-like" tags or minimal dropdown triggers that do not clutter the "one-line railway" flow of the sentence.
*   **Rule 2.2.5: Universal Application:** This WYSIWYG logic must be applied consistently across all data types within a section, including auto-generated, AI-suggested, and manual entries, to create a unified and predictable user experience.

### 2.3. Files to Update
- `src/components/preview/page-one.tsx` and `src/components/preview/page-two.tsx`: To update rendering logic.
- `src/components/editor/evidence-tab.tsx`, `facts-tab.tsx`, `relief-tab.tsx`: To implement the WYSIWYG interface.
- `src/legal_branches/_base.json`: To introduce new sentence templates and descriptive schemas.
- All `src/legal_branches/*.json` files: To ensure `jurisdictionText` and `citation` fields are pure Amharic.

---

## 3. Court & Address Data Expansion

### 3.1. Requirement
The list of available courts must be updated to include the **Addis Ababa City Administration Courts**. Additionally, all location-based dropdowns (e.g., Courts, Cities) must include a "ሌላ (Other)" option to allow for manual entry, ensuring the platform can handle any jurisdiction.

### 3.2. Files to Update
- `src/lib/data.ts`: To update the `COURT_HIERARCHY`, `REGIONS_AND_CITIES`, and `AA_SUBCITIES` constants.
- `src/components/editor/header-parties-tab.tsx`: To ensure UI components correctly handle the "Other" option and display a manual input field when it is selected.
- `src/components/editor/party-form.tsx`: To handle manual entry for addresses.

---
