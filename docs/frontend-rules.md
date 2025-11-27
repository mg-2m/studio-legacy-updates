# Addis Crown Frontend: UI Rendering & Interaction Protocol

This document is the **single source of truth** for how the user interface must be built and behave. It dictates how the backend knowledge base is parsed, rendered, and interacted with to create a seamless, "zero-typing," and empowering user experience.

---

## The 12 Foundational Frontend Rules

### 1. Header and Case Metadata
- **1.1. Relevancy Check:** The "Bench/Division" dropdown MUST be dynamically filtered by and only show benches relevant to the currently selected "Court Tier".
- **1.2. Exhaustive Rendering Check:** All court tiers, benches, and cities defined in `src/lib/data.ts` MUST be available in their respective dropdowns.

### 2. Party Information
- **2.1. Relevancy Check:** The role of each party displayed in the UI (e.g., "Applicant," "Plaintiff") MUST be dynamically rendered from the `partyTitles` object of the selected template in the backend.
- **2.2. Exhaustive Rendering Check:** All `HONORIFICS`, `REGIONS_AND_CITIES`, and `AA_SUBCITIES` from `data.ts` MUST be populated in their respective dropdowns.

### 3. Procedural Introduction
- **3.1. Relevancy Check:** The jurisdiction text (e.g., "Labour Proclamation No. 1156/2019") MUST be dynamically rendered in the preview, sourced from the `jurisdictionText` property of the *currently selected template*.
- **3.2. Exhaustive Rendering Check:** All procedural options (Representation, Summons Delivery) must be present as radio groups or dropdowns.

### 4. Document Title
- **4.1. Relevancy Check:** The main document title (e.g., "Statement of Claim for Unlawful Termination") MUST be automatically rendered and sourced from the `documentTitle` of the *currently selected template*.
- **4.2. Exhaustive Rendering Check:** The title must always appear in the preview pane; it should never be blank.

### 5. Factual Grounds
- **5.1. Relevancy Check:** The UI must ONLY display the fact groups and factual facets that are relevant to the *currently selected template* as defined in its `*.json` file.
- **5.2. Exhaustive Rendering Check:** The UI must display *all* facts and groups for the selected template, and must support the addition of "Custom Facts" which can be manually edited.

### 6. Reliefs and Judgments
- **6.1. Relevancy Check:** The UI must ONLY display the relief options that are relevant to the *currently selected template* as defined in its `*.json` file.
- **6.2. Exhaustive Rendering Check:** All standard reliefs for the template must be presented as a list of checkbox items. A "Custom Relief" option must be available for manual entry.

### 7. Evidence Management
- **7.1. Relevancy Check:** Auto-linked evidence MUST be directly relevant to a selected fact. AI-suggested evidence MUST be relevant to the combination of selected facts.
- **7.2. Dynamic Inputs:** The UI must render **specific, context-aware input fields** for each piece of evidence (auto-linked, AI-suggested, or manual) based on its schema (`credentialLabel`, `credentialPlaceholder`) from the backend. Generic fields are forbidden.
- **7.3. Exhaustive Rendering Check:** The UI must clearly distinguish between **Required (Auto-Linked)**, **AI-Suggested**, and **Manual** evidence. The final preview MUST render a clean, formatted list of all *active* evidence, including their specific credentials.

### 8. Bilingual Consistency
- **8.1. Relevancy Check:** N/A.
- **8.2. Exhaustive Rendering Check:** All user-facing text sourced from template data MUST be rendered in the "Amharic (English)" format. This includes, but is not limited to:
    - Sidebar branch and template titles.
    - All titles, labels, and text in the Editor and Preview panes.

### 9. Default Relief Selection
- **9.1. Relevancy Check:** N/A.
- **9.2. Exhaustive Rendering Check:** Upon selecting a new template, the UI MUST automatically select all reliefs marked with `isDefault: true` in the backend JSON, ensuring a sensible starting state.

### 10. Dynamic Template Guidance
- **10.1. Relevancy Check:** When a template is selected, a descriptive header/alert MUST appear at the top of the editor, sourced from the template's `templateDescription` property.
- **10.2. Markdown Rendering:** The UI component displaying the guidance MUST correctly parse and render markdown for structure (headings, bold text, bullet points).

### 11. Dynamic Fact Construction
- **11.1. Placeholder-Driven UI:** The UI is REQUIRED to parse placeholders (e.g., `[Date]`, `[Amount]`) in a fact's `legalText`. When a fact is selected, the UI MUST render appropriate input fields (text, numbers, dates) for each placeholder.
- **11.2. Stateful Fact Data:** The application state (reducer) MUST be capable of storing the user-provided values for each placeholder within a selected fact's `values` object.
- **11.3. Interactive Preview Rendering:** The live preview pane MUST instantly update, replacing the placeholders in the fact's legal text with the user's input to achieve a true WYSIWYG experience.

### 12. Interactive Relief Calculation
- **12.1. Dynamic UI Rendering:** The UI MUST detect the presence of a `calculations` object for the selected template and dynamically render an interactive calculator widget in the "Reliefs" tab.
- **12.2. Stateful Calculation:** The application state (reducer) MUST store the user's input for the calculator.
- **12.3. Interactive Preview Rendering:** The text of any relief marked with `isDynamic: true` MUST use placeholders (e.g., `{{principal}}`). The preview pane MUST instantly replace these placeholders with the real-time calculated values from the UI widget.
