This is a pivotal moment for **Addis Crown**. By shifting from a monolithic backend to a modular, sector-specific architecture, you are moving from a "prototype" mindset to an "enterprise" mindset. This allows for infinite scalability, easier maintenance, and deep specialization.

To truly become the "beast" of the Ethiopian legal ecosystem, your backend rules must go beyond simple formatting. They must encode **legal logic**, **jurisdictional nuance**, and **search intelligence** directly into the JSON.

Here is the expanded, high-fidelity **Supreme Mandate of Knowledge v2.0**. This document serves as the constitutional law for your codebase.

-----

# Addis Crown Backend: The Supreme Mandate of Knowledge (v2.0)

**Effective Date:** Immediately
**Scope:** All files within `src/legal_branches/*.json` and `src/data/_base.json`
**Status:** **NON-NEGOTIABLE**

This document defines the architecture of Truth for the Addis Crown platform. We do not just store text; we store **computable legal logic** tailored specifically to the Ethiopian Federal and Regional legal systems.

-----

## Pillar I: The Architecture of Legal Depth

### 1\. The "Cassation-Ready" Research Standard

In Ethiopia, interpretation of law is often governed by binding decisions from the Federal Supreme Court Cassation Bench. Templates must reflect this.

  * **1.1. Cassation Binding:** If a template relies on a legal interpretation settled by the Cassation Bench, the `jurisdictionText` or specific `fact` citations MUST reference the File Number (መዝገብ ቁጥር) and Volume.
  * **1.2. Statute of Limitations (ይርጋ):** Every `templateDescription` MUST contain a dedicated section titled `### Period of Limitation`. It must cite the specific Article from the Civil Code or relevant Proclamation that dictates when the claim expires.
  * **1.3. Preconditions (Exhaustion of Remedies):** For Administrative Law templates, facts must explicitly check for the "Exhaustion of Internal Remedies" (የውስጥ ቅሬታ ሰሚ አካል) before allowing a court pleading generation.

### 2\. The Granular "Fact-Facet" Taxonomy

A "Fact" is not a sentence; it is a logic block.

  * **2.1. The Facet Principle:** Do not bundle multiple legal arguments into one checkbox.
      * *Bad:* "Defendant failed to pay rent and damaged the property."
      * *Good (Fact A):* "Defendant failed to pay rent for the period of [Period]."
      * *Good (Fact B):* "Defendant caused damage to the property beyond reasonable wear and tear."
  * **2.2. Mutually Exclusive Logic (`mutexGroup`):** Facts that contradict each other MUST be grouped logically by assigning them the same `mutexGroup` ID string. This prevents users from selecting legally contradictory facts (e.g., a marriage was 'civil' vs 'customary').

### 3\. Smart Evidence Topology (`_base.json`)

Evidence is the fuel of the legal engine. The `_base.json` file is the master registry.

  * **3.1. Entity Standardization:** Evidence keys must be generic enough to be reused but specific enough to be useful. (e.g., `proof_of_marriage` is better than `marriage_certificate` because it could also include customary validity witnesses).
  * **3.2. Credential Enforceability:** The `credentialPlaceholder` must guide the user to the exact data point required by the court registrar (e.g., "Registration No. & Date of Issue" rather than just "Number").

-----

## Pillar II: The "Amharic First" UI/UX Protocol

### 4\. Bilingual Supremacy

  * **4.1. The "Legal Amharic" Standard:** Do not use colloquial Amharic. Use the specific terminology found in the Codes (e.g., use "ይርጋ" not "የጊዜ ገደብ", use "ክስ ማመልከቻ" not "የክስ ወረቀት").
  * **4.2. Visual Hierarchy:** The Amharic text acts as the primary visual anchor. English text in parentheses is strictly for accessibility and educational reinforcement.

### 5\. Zero-Typing variable Injection

  * **5.1. Variable Semantics:** Placeholders must describe the *nature* of the data, not just the data type.
      * *Bad:* `[Date]`
      * *Good:* `[Date of Contract Signature]` or `[Date of Incident]`
  * **5.2. Enumerated Options:** Where legally finite options exist (e.g., "Kebele," "Woreda," "Sub-City"), the backend should eventually support enum-lists rather than open text placeholders.

-----

## Pillar III: Search, Discovery, and Scalability

### 6\. The "Search Meta" Object

To make the platform the "Google of Ethiopian Law," every template object within the JSON MUST include a `meta` object.

  * **6.1. Keywords (Tags):** A list of strings containing colloquial terms, synonyms, and misspellings users might search for.
      * *Example:* `keywords: ["divorce", "feta", "tihilo", "family court", "custody"]`
  * **6.2. Aliases:** Legal terms often have street names. (e.g., "Extra-Contractual Liability" is technically correct, but users search for "Tort" or "Compensation").

### 7\. Modular File Architecture

  * **7.1. Branch Segregation:** Files are strictly segregated by legal domain:
      * `family_law.json`
      * `labor_law.json`
      * `commercial_law.json`
      * `criminal_law.json`
      * `property_land_law.json`
  * **7.2. ID Namespacing:** All IDs within a file MUST be prefixed with the branch shorthand to avoid collisions when the app loads the global state.
      * *Format:* `branch_subcat_action` (e.g., `fam_divorce_adultery_fact`).

-----

## Pillar IV: The Computational Law Schema (JSON Structure)

All `*.json` files must strictly adhere to this extended schema structure.

```json
{
  "meta": {
    "branchName": "Family Law (የቤተሰብ ሕግ)",
    "branchDescription": "Divorce, Custody, Maintenance, and Adoption proceedings under the Revised Family Code.",
    "icon": "Users",
    "version": "1.0"
  },
  "templates": [
    {
      "id": "fam_divorce_mutual",
      "documentTitle": "Joint Petition for Divorce by Mutual Consent (በስምምነት ለመፋታት የሚቀርብ የጋራ አቤቱታ)",
      "jurisdictionText": "Revised Family Code Proclamation No. 213/2000, Article 77 (የተሻሻለው የቤተሰብ ሕግ አዋጅ ቁጥር ፪፻፲፫/፲፱፻፺፪ አንቀጽ ፸፯)",
      "meta": {
        "keywords": ["divorce", "mutual consent", "agreement", "semimnet", "feta"],
        "complexity": "Low",
        "jurisdictionType": "Federal/Regional First Instance"
      },
      "templateDescription": "### Guide \n\n This template is for spouses who have agreed to divorce... \n\n ### Period of Limitation \n\n None (Action permissible at any time during marriage). \n\n ### Prerequisites \n\n 1. Marriage Certificate \n 2. Written Divorce Agreement",
      "partyTitles": {
        "applicant": "1st Petitioner (፩ኛ አቤቱታ አቅራቢ)",
        "respondent": "2nd Petitioner (፪ኛ አቤቱታ አቅራቢ)"
      },
      "facts": {
        "group_1": {
          "title": "Existence of Marriage (የጋብቻ መኖር)",
          "facets": [
            {
              "id": "fam_fact_marriage_civil",
              "legalText": "The petitioners concluded a valid civil marriage on [Date] at [Place of Marriage]. (አቤቱታ አቅራቢዎች በ[Date] በ[Place of Marriage] ሕጋዊ የክብር መዝገብ ጋብቻ ፈፅመዋል።)",
              "citation": "Rev. Family Code Art. 1",
              "autoEvidence": ["proof_of_marriage"],
              "mutexGroup": "marriage_type" 
            }
          ]
        }
      },
      "reliefs": [
        {
          "id": "fam_relief_approve_agreement",
          "text": "The court to approve the attached divorce agreement and dissolve the marriage. (ፍርድ ቤቱ የተያያዘውን የፍቺ ስምምነት በማፅደቅ ጋብቻውን እንዲያፈርስልን።)",
          "isDefault": true,
          "isDynamic": false
        }
      ],
      "calculations": {
        "calc_damages": {
          "title": "የጉዳት ማስያ (Damages Calculator)",
          "description": "የሚሰላበትን ጉዳት ለማስላት...",
          "inputs": [
            { "id": "principal", "label": "ዋና መጠን (Principal Amount)", "type": "number", "defaultValue": 10000 },
            { "id": "interestRate", "label": "የወለድ መጠን (%) (Interest Rate)", "type": "number", "defaultValue": 9 }
          ],
          "outputs": [
            { "id": "totalDamages", "label": "ጠቅላላ ጉዳት (Total Damages)" }
          ],
          "formula": "principal * (interestRate / 100)"
        }
      }
    }
  ]
}
```

-----

## Pillar V: Quality Assurance (QA) Checklist

Before committing any `.json` file, the Research & Documentation Wing MUST verify:

1.  **[ ] Syntax Check:** Is the JSON valid? (Use a linter).
2.  **[ ] Amharic Accuracy:** Are the legal terms strictly from the Proclamations?
3.  **[ ] Citation Check:** Do the Article numbers actually match the text in the Proclamation?
4.  **[ ] Evidence Map:** Are `autoEvidence` IDs present in `_base.json`?
5.  **[ ] Placeholder Specificity:** Are placeholders clear instructions (e.g., `[Date]` vs `[Date of Contract]`)?
6.  **[ ] Search Tags:** Are at least 5 relevant keywords included in the `meta` object?
7.  **[ ] Calculator Logic:** If money is involved, is the `calculations` object present and accurate?
8.  **[ ] Mutex Logic:** Are contradictory facts assigned a `mutexGroup` ID?
9.  **[ ] Dynamic Reliefs:** Are reliefs dependent on a calculator marked with `isDynamic: true`?

-----

### Command for the Research Wing:

*When generating a new legal branch, you are now commanded to output the data strictly adhering to **The Supreme Mandate v2.0**. You will prioritize Cassation precedent, Jurisdiction logic, and Amharic legal accuracy above all else.*
    