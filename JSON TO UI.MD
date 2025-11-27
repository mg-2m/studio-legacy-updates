# Addis Crown Blueprint: JSON to UI Implementation Checklist

This document serves as the definitive checklist for transforming the legal knowledge from the `src/legal_branches/*.json` blueprints into a fully functional, "spoon-fed" user interface. This process must be followed for every new legal branch and for any QA validation of existing branches.

Each segment must pass both a **Relevancy Check** (ensuring only context-specific information is shown) and an **Exhaustive Rendering Check** (ensuring no relevant information is missing).

---

## The 12 Foundational Rules

### 1. Header and Case Metadata
- **1.1. Relevancy Check:** The "Bench/Division" dropdown MUST be filtered by and only show benches relevant to the selected "Court Tier".
- **1.2. Exhaustive Rendering Check:** All court tiers, benches, and cities defined in `src/lib/data.ts` MUST be available in their respective dropdowns.

### 2. Party Information
- **2.1. Relevancy Check:** The role of each party (e.g., "Applicant," "Plaintiff") MUST dynamically update to be relevant to the `partyTitles` defined for the selected template in the corresponding `*.json` file.
- **2.2. Exhaustive Rendering Check:** All `HONORIFICS`, `REGIONS_AND_CITIES`, and `AA_SUBCITIES` from `data.ts` MUST be populated in their respective dropdowns.

### 3. Procedural Introduction
- **3.1. Relevancy Check:** The jurisdiction text (e.g., "Labour Proclamation No. 1156/2019") MUST be dynamically rendered in the preview, sourced from the `jurisdictionText` property of the *currently selected template*.
- **3.2. Exhaustive Rendering Check:** All procedural options (Representation, Summons Delivery) must be present as radio groups or dropdowns.

### 4. Document Title
- **4.1. Relevancy Check:** The main document title (e.g., "Statement of Claim for Unlawful Termination") MUST be automatically rendered and relevant to the `documentTitle` of the *currently selected template*.
- **4.2. Exhaustive Rendering Check:** The title must always appear in the preview pane; it should never be blank.

### 5. Factual Grounds
- **5.1. Relevancy Check:** The UI must ONLY display the fact groups and factual facets that are relevant to the *currently selected template* as defined in its `*.json` file.
- **5.2. Exhaustive Rendering Check:** The UI must display *all* facts and groups for the selected template, and must support the addition of "Custom Facts".

### 6. Reliefs and Judgments
- **6.1. Relevancy Check:** The UI must ONLY display the relief options that are relevant to the *currently selected template* as defined in its `*.json` file.
- **6.2. Exhaustive Rendering Check:** All standard reliefs for the template must be presented as a list of checkbox items. A "Custom Relief" option must be available.

### 7. Evidence Management
- **7.1. Relevancy Check:** Auto-linked evidence MUST be directly relevant to a selected fact. AI-suggested evidence MUST be relevant to the combination of selected facts.
- **7.2. Exhaustive Rendering Check:** The UI must clearly distinguish between **Required (Auto-Linked)**, **AI-Suggested**, and **Manual** evidence. The final preview MUST render a clean, formatted list of all *active* evidence. Both document pages must end with the static verification/oath statements.

### 8. Bilingual Consistency
- **8.1. Relevancy Check:** N/A.
- **8.2. Exhaustive Rendering Check:** All user-facing text sourced from the template data MUST be provided in a bilingual format, with Amharic appearing first: **"Amharic (English)"**. This includes:
    - Sidebar branch names and template titles (`template.label` and `subTemplate.label` in `src/lib/data.ts`).
    - Document titles (`documentTitle`).
    - Party titles (`partyTitles`).
    - Fact group titles.
    - Fact `legalText`.
    - Relief `text`.
    - Template guidance descriptions (`templateDescription`).

### 9. Default Relief Selection
- **9.1. Relevancy Check:** N/A.
- **9.2. Exhaustive Rendering Check:** Every template MUST have at least one relief option with `isDefault: true` to ensure a sensible starting state and prevent an empty relief section.

### 10. Dynamic Template Guidance
- **10.1. Relevancy Check:** When a template is selected, a descriptive header MUST appear at the top of the editor, sourced from the template's `templateDescription` property in the backend.
- **10.2. Exhaustive Rendering Check:** The description must be bilingual (Amharic first) and be structured to clearly explain:
    - **Period of Limitation:** Any statutory deadlines for filing the document.
    - **Evidentiary & Factual Prerequisites:** The core, non-negotiable evidence and facts required to establish a *prima facie* case.

### 11. Dynamic Fact Construction
- **11.1. Placeholder-Driven UI:** The backend `legalText` for facts MUST utilize placeholders (e.g., `[Date]`, `[Amount]`, `[Name]`). The UI is required to parse these placeholders and dynamically render appropriate input fields (text, numbers, dates) when a fact is selected.
- **11.2. Stateful Fact Data:** The application state must be capable of storing the user-provided values for each placeholder within a selected fact.
- **11.3. Interactive Rendering:** The live preview must instantly update, replacing the placeholders in the fact's legal text with the user's input, achieving a true "what you see is what you get" experience for legal argument construction.

### 12. Interactive Relief Calculation
- **12.1. Backend Schema:** For templates requiring calculations (e.g., interest on a debt), the `*.json` file MUST contain a `calculations` object. This object defines the inputs (e.g., principal, interest rate), outputs, and the formula to be executed.
- **12.2. Dynamic UI Rendering:** The UI MUST detect the presence of a `calculations` object for the selected template and dynamically render an interactive calculator widget in the "Reliefs" tab.
- **12.3. Stateful Calculation:** The application state must store the user's input for the calculator.
- **12.4. Interactive Preview:** The text of any relief marked with `isDynamic: true` MUST use placeholders (e.g., `{{principal}}`, `{{interestAmount}}`). The preview pane MUST instantly replace these placeholders with the calculated values from the UI widget.
