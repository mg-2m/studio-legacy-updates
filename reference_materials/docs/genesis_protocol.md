# The Genesis Protocol: Addis Crown's Unified Development Mandate

## PREAMBLE: THE GUIDING PHILOSOPHY

This project is architected to create **"an expert machine that swallows all relevant laws, proclamations, precedents, and procedures and makes them available through highly thought-scripted programming through its own UI for users."**

This "expert machine" is designed to function as:
*   **A Lawyer:** Guiding a user to build a case by selecting legally sound facts and evidence, composing them into a persuasive narrative.
*   **A Registrar:** Enforcing procedural prerequisites and warning users of potential filing defects *before* they generate a document.
*   **A Judge:** Assisting vulnerable or less-privileged parties by clarifying legal standards and explaining the importance of each factual element required to build a strong case.

Our goal is to build a **"truly living museum of exhaustively completed legal documents,"** where each template provides a splendid menu of legal arguments and circumstantial facts, empowering users with outstanding clarity and persuasiveness.

---

## Pillar I: Backend Architecture & Data Integrity

### 1.1. The Fact-Facet Taxonomy
- **Atomicity:** A single `fact` object must represent a single, atomic legal argument.
- **Mutually Exclusive Logic (`mutexGroup`):** Contradictory facts must share the same `mutexGroup`.
- **Rhetorical Layer (`rhetoric` object):** Every fact MUST contain `intro`, `transition`, and `summary_keyword` in Amharic.

### 1.2. The "Cassation-Ready" Research Standard
- **Period of Limitation:** Mandatory inclusion of `### የጊዜ ገደብ`.
- **Prerequisites:** Mandatory inclusion of `### ቅድመ ሁኔታዎች`.
- **Cassation Binding Precedent:** Reference file number and volume.

### 1.3. Dynamic "Subject of Claim" (`የክሱ ምክንያት`)
- **Purpose Meta Field:** Amharic description of claim purpose.
- **Structure:** Title format `የክሱ ምክንያት ፡- [Purpose] [Value] [Pleader].`

### 1.4. Smart Evidence & Data Topology
- **Entity Standardization:** Generic yet clear evidence keys.
- **Credential Enforceability:** Placeholders guide exact data points.
- **Sentence-Based Templates:** Full `sentenceTemplate` strings for WYSIWYG.

### 1.5. Search, Discovery, and Metadata
- **Meta Object:** Include `keywords` and `aliases`.
- **ID Namespacing:** Prefix IDs with branch shorthand.

### 1.6. Standard Reliefs and Default Selections
- **Default Cost Relief:** Include standard relief for costs.
- **Default Selection:** Auto-select reliefs marked `isDefault: true`.

---

## Pillar II: Frontend UI/UX & The "Prophetic Editor" Mandate

### 2.1. The WYSIWYG "Prophetic Editor"
- **Sentence-Based UI Construction:** Use grammatically correct Amharic templates.
- **Embedded Inputs:** Inputs embedded in sentence templates.
- **Guiding Amharic Placeholders:** Clear examples in placeholders.

### 2.2. The Gallery of Arguments & Exhaustive Scenarios
- **Exhaustive Scenarios:** Anticipate all common variations.
- **Gallery Presentation:** UI presents comprehensive arguments.

### 2.3. Dynamic & Interactive Preview
- **Real-time WYSIWYG:** Instant preview updates.
- **Placeholder Highlighting:** Distinguish inserted variables.
- **Calculator Integration:** Replace placeholders with live results.

### 2.4. Persona-Driven UI Behavior
- **Registrar Persona:** Enforce preconditions.
- **Judge Persona:** Provide contextual guidance.
- **Default Selection Feedback:** Visual cue for auto-selections.
- **AI Augmentation:** Premium “Enhance with AI” option.
- **Limitation Warning:** Prominent alerts for approaching deadlines.
- **Live Calculation Indicator:** Highlight calculator dependencies.

### 2.5. The "Amharic First" Content & Output Standard
- **Legal Amharic:** Formal terminology only.
- **Rhetorical Citation Blending:** Citations embedded naturally.
- **Amharic-Only Final Output:** 100% Amharic, numbers spelled out.
- **Modern Numerals:** Use Arabic numerals in backend/UI.

### 2.6. Search, Discovery, and Metadata
- **Fuzzy Search:** Implement fuzzy search via `meta`.
- **Metadata Tooltips:** Show complexity and jurisdiction type.

---

## Pillar III: Firebase Grounding & Legal Data Ingestion

### 3.1. Knowledge Base Enrichment
- **Branch-Aligned Materials:** Classify into Basic, Important, Supplementary.
- **Direct Downloads:** Store priority materials in `/kb/legal/branches/...`.
- **Source Tracking:** Maintain `kb_sources.json` for lineage.

### 3.2. Conversion Pipeline
- **Supported Inputs:** PDFs, DOCX, scanned images, HTML, text.
- **Python Tools:** Use PyMuPDF, pdfminer.six, textract, docx2txt, tesseract.
- **Normalization Outputs:** Produce `raw.txt`, `normalized.txt`, `structured.json`.
- **Schema Mapping:** Map to Firestore collections.

### 3.3. Firestore & Realtime Database
- **Collections:** `legal_documents`, `articles`, `precedents`, `procedures`, `glossary`, `templates`, `evidence_catalog`.
- **Keys:** Canonical IDs (e.g., `proc_1183_2020`).
- **Indexing:** Composite and full-text indexes.
- **Realtime Signals:** Job status and notifications.

### 3.4. Grounding Expert Machines
- **Resolvers:** Bind templates to authoritative texts.
- **Version Consistency:** UI shows authoritative badges.
- **Cache Policy:** ETag/version checks with revalidation.

---

## Pillar IV: Directory Structure & Orchestration

### 4.1. Repository Layout
- `/src`, `/kb`, `/data_ingestion`, `/firebase`, `/genesis`, `/docs`.

### 4.2. Job Orchestration
- **Single-Round Update:** Integrate strategies, set priorities, prepare pipeline, report changes, prompt execution.

### 4.3. Execution States
- Plan → Prepare → Ingest → Parse → Ground → Verify → Publish.

---

## Pillar V: Quality Governance & Lineage

### 5.1. Legal Research QA
- **Two-Step Verification:** Independent confirmations.
- **Lineage Tracking:** Source, extraction, tool version, reviewer.
- **Change Control:** `revoked_by` and `amended_by`.

### 5.2. Content Standards
- **Amharic Lint:** Automated checks.
- **Template Validator:** Validate completeness and bindings.
- **Governance Gates:** Require authoritative source grounding.

### 5.3. Observability
- **Metrics:** Throughput, accuracy, coverage, relevance.
- **Alerts:** Mismatches, failures, stale caches.

---

## Pillar VI: Security, Compliance & Localization

### 6.1. Security
- **Least Privilege:** Strict Firebase rules.
- **Integrity Seals:** Hash/signature metadata.
- **PII Isolation:** Separate storage for evidence uploads.

### 6.2. Localization
- **Amharic-First UX:** Glossary tooltips and phonetic hints.
- **Accessibility:** High-contrast, keyboard navigation, screen-reader support.
- **Numeral Policy:** Arabic numerals in data, Amharic spelled in output.

---

## Pillar VII: Extended Capabilities

### 7.1. Advanced Analytics
- **Argument Insights:** Aggregate statistics.
- **Search Tuning:** Expand aliases and synonyms.

### 7.2. AI-Assisted Flows
- **Narrative Composer:** AI enhancement with authoritative citations.
- **Summarizer:** Branch-specific summaries.
- **Red Teaming:** Prevent speculative outputs.

---

## Appendix A: Branch-Level Priorities

- **Basic/Mandatory:** Civil, Criminal, Commercial Codes; Proclamations; Procedural Codes; Cassation precedents.
- **Important:** Regulations, directives, appellate decisions.
- **Supplementary:** Commentaries, textbooks, academic papers.

---

## Appendix B: Single-Round Orchestration Command

gemini prototyper ,Update your memory genesis_protocol.md by systematically integrating development strategies without replacing memory of the evolution on original project  context:

Ground expert machines/legal branches using Firebase resources.

Identify and prioritize legal materials per branch.

Orchestrate downloads into Legal Knowledge Base directory.

Install Python tools for conversion and normalization.

Map structured outputs to Firestore collections.

Bind templates to authoritative citations.

Enforce governance gates and readiness checks.

Defer non-essential uploads until basics are complete.

After updating your memory of genesis_protocol.md:

Report a concise change summary.

Ask explicitly if I want to begin executing ingestion and parsing task