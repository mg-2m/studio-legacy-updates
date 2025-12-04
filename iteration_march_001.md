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

### 2.2. Requirement (B): Pre-constructed Evidence Formatting
The evidence section on the preview page (`page-two.tsx`) must be refactored to present evidence in a grammatically correct, full-sentence format, as a lawyer would draft it. The system should automatically construct these sentences, leaving only specific credentials for the user to fill in.

- **Example (Target State):**
  > ሀ. የሰነድ ማስረጃዎች
  > 1.  በተማሪ ኤልያስ ሰይድ ጥርስ ላይ የደረሰውን ጉዳት የሚያስረዳልን ከ **[ቲጂ ኤች የጥርስ ህክምና ክሊኒክ]** የተሰጠ የህክምና ማስረጃ በእንግዚዘኛ የተፃፈ ከነትርጉሙ **[2 (ሁለት)]** ገጽ ፎቶ ኮፒ ዋናው በ **[ከሳሽ]** እጅ የሚገኝ፣
- **Implementation:** This requires a new, more descriptive schema in `_base.json` for each evidence type, including template sentences with placeholders that the frontend can parse and render.

### 2.3. Files to Update
- `src/components/preview/page-one.tsx` and `src/components/preview/page-two.tsx`: To update rendering logic.
- `src/components/editor/evidence-tab.tsx`: To adjust input fields to the new schema.
- `src/legal_branches/_base.json`: To introduce the new, descriptive evidence schema.
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
