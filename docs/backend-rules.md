# Addis Crown Backend: The Supreme Mandate of Knowledge

This document is the **single source of truth** for structuring and populating the legal knowledge base that powers the Addis Crown platform. Every `*.json` file within the `src/legal_branches/` directory MUST adhere to these principles without deviation. This is the codification of the "God Principle."

---

## The 12 Foundational Backend Rules

### 1. The Supreme Mandate: 360-Degree Knowledge Population
This is the Prime Directive. Each legal branch must be treated as a deep, comprehensive domain. A shallow or incomplete knowledge base is an absolute failure.

- **1.1. Exhaustive Research:** For every template, conduct expert-level research covering all common and edge-case scenarios. This includes substantive law, procedural requirements, and relevant cassation decisions.
- **1.2. Fact Granularity:** Do not use broad facts. Break down legal arguments into their smallest constituent facets, each with its own citation and evidence links.
- **1.3. Evidence Mapping:** Every fact MUST be mapped to its required (`autoEvidence`) and suggested (`suggestedEvidence`) evidence types. The `_base.json` encyclopedia must be updated with any new evidence entities discovered during research.
- **1.4. Holistic Coverage:** Ensure templates cover not just primary claims but also common applications (e.g., injunctions, appeals, procedural motions) relevant to that branch.

### 2. Bilingual Consistency: Amharic First
All user-facing text strings within the JSON files must be bilingual, with Amharic appearing first, followed by the English translation in parentheses.

- **2.1. Format:** The required format is **"Amharic (English)"**.
- **2.2. Scope:** This applies to:
    - `documentTitle`
    - `jurisdictionText`
    - All `partyTitles`
    - Fact group `title`s
    - Fact `legalText`
    - Relief `text`
    - `templateDescription`
    - Evidence `title` and `description` in `_base.json`
    - `credentialLabel` and `credentialPlaceholder` in `_base.json`
    - Calculator `title`, `description`, and input/output `label`s.

### 3. Dynamic Template Guidance
Every template MUST have a `templateDescription` property. This is not optional.

- **3.1. Content Structure:** The description must be a structured, multi-part guide written in markdown.
- **3.2. Period of Limitation:** It must clearly state any statutory deadlines or periods of limitation for filing the document.
- **3.3. Evidentiary Prerequisites:** It must detail the core, non-negotiable evidence and facts required to establish a *prima facie* case. This section should explicitly list the essential documents or proofs.

### 4. Dynamic Fact Construction Schema
To enable the "zero-typing" UI, `legalText` for facts MUST be structured with placeholders.

- **4.1. Placeholder Syntax:** Use square brackets for dynamic values (e.g., `[Date]`, `[Amount]`, `[Location]`).
- **4.2. Specificity:** Placeholders must be specific. Use `[Name of Infringing Product]` instead of just `[Product]`.

### 5. Interactive Relief Calculation Schema
Templates that involve financial calculations MUST include a `calculations` object.

- **5.1. Object Structure:** The `calculations` object must contain nested objects for each calculator, each with `title`, `description`, `inputs`, `outputs`, and a `formula`.
- **5.2. Dynamic Relief Linking:** Any relief `text` that displays a calculated value MUST be marked with `isDynamic: true`.
- **5.3. Placeholder Syntax:** Dynamic relief text MUST use double curly brace placeholders (e.g., `{{principal}}`, `{{interestAmount}}`) that correspond to an `id` in the `calculations` object's inputs or outputs.

### 6. Default Relief Selection
Every template MUST have at least one relief option with `isDefault: true`.

- **6.1. Purpose:** This ensures a sensible starting state for the user and prevents a confusing empty relief section upon template selection.

### 7. Evidence Entity Schema
The master evidence encyclopedia (`_base.json`) defines the schema for all evidence types.

- **7.1. Required Fields:** Every evidence entity MUST have `title`, `description`, `credentialLabel`, and `credentialPlaceholder`.
- **7.2. Contextual Credentials:** The `credentialLabel` and `credentialPlaceholder` must be specific and informative, guiding the user on exactly what information to provide (e.g., "Police File No. & Date" instead of "Reference").

### 8. Document & Party Title Schema
- **8.1. Document Title:** Every template MUST have a `documentTitle` string.
- **8.2. Jurisdiction Text:** Every template MUST have a `jurisdictionText` string, citing the primary law.
- **8.3. Party Titles:** Every template MUST have a `partyTitles` object with `applicant` and `respondent` keys.

### 9. Fact Schema
- **9.1. Structure:** Every fact must belong to a group and have an `id`, `legalText`, `citation`, `autoEvidence` list, and `suggestedEvidence` list.
- **9.2. Null Evidence:** If no evidence is associated, the value for `autoEvidence` or `suggestedEvidence` MUST be `null` or an empty array `[]`.

### 10. Relief Schema
- **10.1. Structure:** Every relief must have an `id`, `text`, and `isDefault` boolean property.

### 11. JSON Validity
- **11.1. Syntax:** All `*.json` files MUST be well-formed JSON. No trailing commas, mismatched brackets, or syntax errors are permitted.

### 12. File Naming Convention
- **12.1. Convention:** All branch knowledge files MUST be named using snake_case and reside in `src/legal_branches/` (e.g., `ip_law.json`, `family_law.json`).
