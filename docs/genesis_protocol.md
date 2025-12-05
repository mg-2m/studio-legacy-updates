# The Genesis Protocol: Addis Crown's Unified Development Mandate

## PREAMBLE: THE GUIDING PHILOSOPHY

This project is architected to create **"an expert machine that swallows all relevant laws, proclamations, precedents, and procedures and makes them available through highly thought-scripted programming through its own UI for users."**

Each legal template is not merely a document; it is a semi-autonomous expert system designed to function as:
*   **A Lawyer:** Guiding a user to build a case by selecting legally sound facts and evidence.
*   **A Registrar:** Enforcing procedural prerequisites and warning users of potential filing defects.
*   **A Judge:** Assisting vulnerable parties by clarifying legal standards and the importance of each factual element.

Our goal is to build a **"truly living museum of exhaustively completed legal documents,"** where each template provides a splendid menu of legal arguments and circumstantial facts, empowering users with outstanding clarity and persuasiveness.

---

## Pillar I: Backend Architecture & Data Integrity

This pillar governs the structure, content, and logic of all `.json` data files within the `src/legal_branches/` directory.

### 1.1. The Granular, File-per-Template Architecture
- **1.1.1. Branch Folders:** The backend is organized into folders, one for each major legal branch (e.g., `src/legal_branches/contract_law/`).
- **1.1.2. File-per-Template:** Within each branch folder, every legal template MUST exist in its own dedicated `.json` file (e.g., `debt_recovery.json`). Monolithic branch files are forbidden.
- **1.1.3. ID Namespacing:** All IDs within a file MUST be prefixed with a branch and template shorthand to prevent collisions (e.g., `con_debt_rec_fact_...`).

### 1.2. The Fact-Facet Taxonomy
- **1.2.1. Atomicity:** A single fact (`fact` object) must represent a single, atomic legal argument. Do not bundle multiple arguments.
- **1.2.2. Mutually Exclusive Logic (`mutexGroup`):** Facts that are legally contradictory must be assigned the same `mutexGroup` string ID. The frontend will render these as single-choice radio buttons.
- **1.2.3. The Rhetorical Layer (`rhetoric` object):** Every fact MUST contain a `rhetoric` object to enable persuasive narrative construction.
    -   `"intro"`: An Amharic phrase to introduce a fact group (e.g., "በመጀመሪያ ደረጃ፣").
    -   `"transition"`: An Amharic phrase to connect subsequent facts (e.g., "በተጨማሪም፣").
    -   `"summary_keyword"`: A short Amharic noun phrase describing the fact's essence for summarization (e.g., "የማይታረቅ ልዩነት").

### 1.3. The "Cassation-Ready" Research Standard
- **1.3.1. Statute of Limitations (`Period of Limitation`):** Every `templateDescription` MUST contain a section titled `### የጊዜ ገደብ (Period of Limitation)` citing the specific article that dictates the claim's expiration.
- **1.3.2. Preconditions (`Prerequisites`):** Every `templateDescription` MUST contain a section titled `### ቅድመ ሁኔታዎች (Prerequisites)` detailing mandatory requirements before filing. This includes the exhaustion of internal remedies for administrative law cases.
- **1.3.3. Cassation Binding Precedent:** If a legal principle is based on a binding Cassation Bench decision, the `jurisdictionText` or `citation` MUST reference the file number (መዝገብ ቁጥር) and volume (ቅጽ).

### 1.4. Dynamic "Subject of Claim" (`የክሱ ምክንያት`)
- **1.4.1. The `purpose` Meta Field:** Every template's `meta` object must contain a `purpose` field in Amharic that describes the core reason for the claim (e.g., "ለተሰጠ የብድር ዕዳ").
- **1.4.2. Structure:** The final rendered title will follow the structure: `የክሱ ምክንያት ፡- [Purpose] [Value] [Pleader].`

### 1.5. Smart Evidence & Data Topology
- **1.5.1. Entity Standardization:** Evidence keys in `_base.json` must be generic enough for reuse but specific enough for clarity (e.g., `ProofOfMarriage` is better than `MarriageCertificate`).
- **1.5.2. Credential Enforceability:** The `credentialPlaceholder` must guide the user to the exact data point required (e.g., "Registration No. & Date of Issue").

### 1.6. Standard Reliefs and Default Selections
- **1.6.1. Default Cost Relief:** Every template that involves a dispute SHOULD include a standard, non-dynamic, selectable relief option for the payment of court costs and advocate fees (`"ተከሳሹ የዚህን ክስ ወጪ እና ኪሳራ እንዲከፍል እንዲወሰን"`).
- **1.6.2. Default Selection (`isDefault`):** Any relief marked with `isDefault: true` in the JSON must be automatically selected by the UI upon template load.

---

## Pillar II: Frontend UI/UX & The "Prophetic Editor" Mandate

This pillar governs how the React components render the UI and handle user interaction, based on the rules defined in the backend JSON files.

### 2.1. The WYSIWYG "Prophetic Editor"
- **2.1.1. Sentence-Based UI Construction:** The editor UI (especially for Facts, Reliefs, and Evidence) MUST be constructed using the pre-defined, grammatically correct Amharic sentence templates sourced from the backend. The UI is not a collection of labels and inputs; it is an interactive, fill-in-the-blanks document.
- **2.1.2. Embedded Inputs:** Input fields (`Input`, `Select`, `DatePicker`) MUST be embedded directly within these sentence templates at placeholder locations (e.g., `[Date]`, `[Amount]`).
- **2.1.3. Guiding Amharic Placeholders:** All embedded input fields must use watermarked Amharic placeholders that provide clear examples (e.g., "ለምሳሌ፦ 10,000", "ቀን ያስገቡ").

### 2.2. The Gallery of Arguments & Exhaustive Scenarios
- **2.2.1. Maxim of Exhaustive Scenarios:** The backend data for each template MUST strive to anticipate and provide selectable options for all common real-world facts, scenarios, and circumstantial variations relevant to that legal matter.
- **2.2.2. Gallery Presentation:** The UI must present this comprehensive list of pre-constructed arguments, allowing users to select the narrative that best fits their specific circumstances.

### 2.3. Dynamic & Interactive Preview
- **2.3.1. Real-time WYSIWYG:** As a user types into an embedded input in the editor, the corresponding text in the Preview Pane MUST update instantaneously.
- **2.3.2. Placeholder Highlighting:** The inserted variable in the preview should be visually distinguished (e.g., **`bold blue`**) to show context.
- **2.3.3. Calculator Integration:** The Preview Pane must dynamically replace calculator placeholders (e.g., `{{principal}}`) in reliefs with the live calculated result from the corresponding calculator widget.

### 2.4. Persona-Driven UI Behavior
*(This implements the semi-autonomous "expert machine" concept)*
- **2.4.1. Registrar Persona (Procedural Checks):** The UI can use a `proceduralChecks` object in the JSON to enforce preconditions. Before allowing a "Generate/Print" action, it can check if mandatory evidence is attached and display a warning if it is not.
- **2.4.2. Judge Persona (Guidance):** The UI can use a `judicialGuidance` property in the JSON to provide contextual help via tooltips or alerts, explaining the legal significance of a particular fact or relief.
- **2.4.3. Default Selection Feedback:** When default reliefs are auto-selected upon template load (per Rule 1.6.2), the UI MUST provide a brief visual cue (e.g., a highlight or flash) to inform the user that the system has assisted them.

### 2.5. The "Amharic First" Content & Output Standard
- **2.5.1. Legal Amharic:** All user-facing text (`documentTitle`, `legalText`, `label`, etc.) MUST use formal, legal-grade Amharic terminology found in the official Codes.
- **2.5.2. Rhetorical Citation Blending:** Legal citations (`citation` field) MUST NOT be rendered as bracketed annexes in the UI. The `legalText` itself must be written to naturally incorporate the citation in a lawyerly flow (e.g., "...በፍትሐ ብሔር ሕግ 1772 መሰረት...").
- **2.5.3. Amharic-Only Final Output:** The final rendered document must be 100% Amharic. No English words or symbols (e.g., "%") are permitted. Numerical values must be spelled out in Amharic script within parentheses.
- **2.5.4. Modern Numerals:** All numbers in the backend data and rendered UI, especially for legal articles (`Art. 123`) and proclamations (`Proc. 1183/2020`), MUST use modern Arabic numerals.

### 2.6. Search, Discovery, and Metadata
- **2.6.1. Fuzzy Search:** The sidebar/header search MUST use the `meta.keywords` and `meta.aliases` from the backend to implement fuzzy search logic (e.g., searching for "Feta" finds "Divorce").
- **2.6.2. Metadata Tooltips:** Hovering over a template choice in the UI should display a tooltip showing `meta.complexity` and `meta.jurisdictionType`.
