You are absolutely correct. My attempt to synthesize the rules into "themes" inadvertently condensed the **list**, creating the appearance of reducing the **mandate**. That is unacceptable.

The **12 Foundational Rules** you laid out are the non-negotiable constitution. My role is not to erase them, but to **inject** the new high-level architectural standards (like Mutex logic, Amharic visual hierarchy, and Search Meta) **into** those exact 12 categories.

Here is the **Corrected and Expanded** Frontend Protocol. It preserves your exact 12-point structure but supercharges each rule with the "v2.0" technical sophistication we just defined.

***

# Addis Crown Frontend: UI Rendering & Interaction Protocol (v2.0)

**Effective Date:** Immediately
**Status:** **NON-NEGOTIABLE**
**Structure:** 12 Immutable Rules (Enhanced)

---

### 1. Header and Case Metadata (The Discovery Engine)
* **1.1. Relevancy & Search:** The "Bench/Division" dropdown MUST be dynamically filtered by court tier. **UPGRADE:** The sidebar and header must implement **Fuzzy Search Logic** utilizing the `meta.keywords` and `meta.aliases` from the backend. Searching for "Feta" must find "Divorce" templates.
* **1.2. Exhaustive Rendering:** All tiers/benches in `src/lib/data.ts` must be available. **UPGRADE:** Hovering over a template choice must display a **Metadata Chip** tooltip showing `meta.complexity` and `meta.jurisdictionType`.

### 2. Party Information (The Profile System)
* **2.1. Relevancy Check:** Party roles (Applicant/Respondent) must be sourced dynamically from `partyTitles`. **UPGRADE:** These titles must render in the **Amharic (English)** format (e.g., **ከሳሽ** (Plaintiff)).
* **2.2. Exhaustive Rendering:** All `HONORIFICS`, `REGIONS`, and `SUBCITIES` must be populated. **UPGRADE:** The "Honorific" dropdown must support the full range of Ethiopian legal titles (e.g., *Shambel*, *Dr.*, *W/rt*) as defined in research.

### 3. Procedural Introduction (The Jurisdiction Anchor)
* **3.1. Relevancy Check:** Jurisdiction text is sourced from the selected template. **UPGRADE:** The text must be injected into the preview header dynamically.
* **3.2. Exhaustive Rendering:** All procedural options (Summons/Representation) must be present. **UPGRADE:** If the backend `templateDescription` flags a **Statute of Limitation** (Period of Limitation), the procedural section must display a **Red/Amber Warning Alert** if the date selected is beyond the limit.

### 4. Document Title (The Visual Anchor)
* **4.1. Relevancy Check:** Title sourced from `documentTitle`.
* **4.2. Exhaustive Rendering:** Never blank. **UPGRADE:** The Title in the preview MUST follow the **Amharic Supreme** visual hierarchy: Amharic in **Bold Primary**, English in *Secondary Regular* below it.

### 5. Factual Grounds (The Logic Engine)
* **5.1. Relevancy Check:** Only display relevant fact groups. **UPGRADE:** The UI must detect the `mutexGroup` property in facts. If facts share a `mutexGroup`, they must be rendered as **Radio Buttons** (single select) to prevent legal contradictions.
* **5.2. Exhaustive Rendering:** Display all facts + Custom option. **UPGRADE:** Fact Groups must be rendered with clear, bold Amharic headings to break the "wall of text."

### 6. Reliefs and Judgments (The Prayer)
* **6.1. Relevancy Check:** Display relevant reliefs only.
* **6.2. Exhaustive Rendering:** List all reliefs + Custom option. **UPGRADE:** If a relief contains a calculation placeholder (e.g., `{{severanceTotal}}`), the UI must visually indicate that this relief is "Live" and dependent on the calculator.

### 7. Evidence Management (The Credential System)
* **7.1. Relevancy Check:** Link Auto/AI evidence to facts. **UPGRADE:** Visually connect the Fact to the Evidence with a link icon or arrow in the editor, showing the user *why* the evidence is required.
* **7.2. Dynamic Inputs:** **UPGRADE:** The UI MUST parse the `credentialLabel` and `credentialPlaceholder` from `_base.json`. If the evidence requires a "Police File Number," the input label must say exactly that in Amharic. Generic "Description" fields are forbidden for known evidence types.
* **7.3. Exhaustive Rendering:** Distinguish Required vs. Suggested vs. Manual.

### 8. Bilingual Consistency (The Language Protocol)
* **8.1. Relevancy Check:** N/A.
* **8.2. Exhaustive Rendering Check:** **UPGRADE:** All user-facing text (Sidebar, Labels, Buttons, Preview) MUST strictly follow the format: **"Amharic Text (English Text)"**. The Amharic is the functional UI; English is the accessibility layer.

### 9. Default Relief Selection (The Spoon-Feed)
* **9.1. Relevancy Check:** N/A.
* **9.2. Exhaustive Rendering Check:** Upon template load, any relief marked `isDefault: true` in the JSON MUST be auto-checked. **UPGRADE:** The UI should briefly highlight these auto-selected items (e.g., a subtle flash) so the user knows the system has assisted them.

### 10. Dynamic Template Guidance (The Strategy Card)
* **10.1. Relevancy Check:** Display `templateDescription`.
* **10.2. Markdown Rendering:** **UPGRADE:** The guidance must be rendered as a structured **Strategy Dashboard** at the top of the editor, parsing markdown headers (`###`) into clear sections like **"Prerequisites"** (rendered as a checklist) and **"Period of Limitation"** (rendered as an alert).

### 11. Dynamic Fact Construction (The Semantic Parser)
* **11.1. Placeholder-Driven UI:** Parse `[Date]`, `[Amount]`. **UPGRADE:** Implement **Semantic Parsing**.
    * `[Date]` -> Renders Ethiopian Calendar Date Picker.
    * `[Amount]` -> Renders Currency Input (Birr).
    * `[City]` -> Renders Dropdown.
* **11.2. Stateful Fact Data:** Store values in reducer.
* **11.3. Interactive Preview:** **UPGRADE:** As the user types in the input field, the text in the Preview pane must update **instantaneously** (Real-time WYSIWYG), highlighting the inserted variable in **Bold Blue** to show context.

### 12. Interactive Relief Calculation (The Math Engine)
* **12.1. Dynamic UI Rendering:** Detect `calculations` object. **UPGRADE:** Render a dedicated **Calculator Widget** (e.g., Severance Calculator) inside the Reliefs tab if the template requires it.
* **12.2. Stateful Calculation:** Store inputs.
* **12.3. Interactive Preview:** **UPGRADE:** The Preview text must dynamically replace placeholders like `{{principal}}` with the live calculated result. The UI should optionally show a "Math Breakdown" tooltip to explain the result.