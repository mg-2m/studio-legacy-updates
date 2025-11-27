# Addis Crown Blueprint: JSON to UI Implementation Checklist

This document serves as the definitive checklist for transforming the legal knowledge from the `docs/backend.json` blueprint into a fully functional, "spoon-fed" user interface. This process must be followed for every new legal branch and for any QA validation of existing branches.

Each segment must pass both a **Relevancy Check** (ensuring only context-specific information is shown) and an **Exhaustive Rendering Check** (ensuring no relevant information is missing).

## The 9 Segments of UI Implementation

1.  **Head, Date, Court Name, Location, Bench Name, and Bench Address:**
    *   **Relevancy Check:** The "Bench/Division" dropdown MUST be filtered by and only show benches relevant to the selected "Court Tier".
    *   **Exhaustive Rendering Check:** All court tiers, benches, and cities defined in `src/lib/data.ts` MUST be available in their respective dropdowns.

2.  **Party Head with Titles, Addresses, and Role:**
    *   **Relevancy Check:** The role of each party (e.g., "Applicant," "Plaintiff," "Decree Holder") MUST dynamically update to be relevant to the `partyTitles` defined for the selected template in `backend.json`.
    *   **Exhaustive Rendering Check:** All `HONORIFICS`, `REGIONS_AND_CITIES`, and `AA_SUBCITIES` from `data.ts` MUST be populated in their dropdowns.

3.  **Introduction for Procedural Matters:**
    *   **Relevancy Check:** The jurisdiction text (e.g., "Labour Proclamation No. 1156/2019") MUST be dynamically rendered in the preview, sourced from the `jurisdictionText` property of the *currently selected template*.
    *   **Exhaustive Rendering Check:** All procedural options (Representation, Summons Delivery) must be present as radio groups or dropdowns.

4.  **Title of the Suite:**
    *   **Relevancy Check:** The main document title (e.g., "Statement of Claim for Unlawful Termination") MUST be automatically rendered and relevant to the `documentTitle` of the *currently selected template*.
    *   **Exhaustive Rendering Check:** The title must always appear in the preview pane; it should never be blank.

5.  **Facts Stating and Grounding:**
    *   **Relevancy Check:** The UI must ONLY display the fact groups and factual facets that are relevant to the *currently selected template* as defined in `backend.json`.
    *   **Exhaustive Rendering Check:** The UI must display *all* facts and groups for the selected template, and must support the addition of "Custom Facts" not covered by the predefined facets.

6.  **Request Judgment and Relief:**
    *   **Relevancy Check:** The UI must ONLY display the relief options that are relevant to the *currently selected template* as defined in `backend.json`.
    *   **Exhaustive Rendering Check:** All standard reliefs for the template must be presented as a list of checkbox items. A "Custom Relief" option must be available.

7.  **Evidence List Attachment & Auto Oath Statement:**
    *   **Relevancy Check:** Auto-linked evidence MUST be directly relevant to a selected fact. AI-suggested evidence MUST be relevant to the combination of selected facts.
    *   **Exhaustive Rendering Check:** The UI must clearly distinguish between **Required (Auto-Linked)**, **AI-Suggested**, and **Manual** evidence. The final preview MUST render a clean, formatted list of all *active* evidence. Both document pages must end with the static verification/oath statements.

8.  **Bilingual Consistency:**
    *   **Relevancy Check:** N/A.
    *   **Exhaustive Rendering Check:** All user-facing text sourced from the template data MUST be provided in both English and Amharic, using the format "English (Amharic)". This includes:
        *   Sidebar branch names and template titles (`template.label` and `subTemplate.label` in `src/lib/data.ts`).
        *   Document titles (`documentTitle`).
        *   Party titles (`partyTitles`).
        *   Fact group titles.
        *   Fact `legalText`.
        *   Relief `text`.

9.  **Default Relief Selection:**
    *   **Relevancy Check:** N/A.
    *   **Exhaustive Rendering Check:** Every template MUST have at least one relief option with `isDefault: true` to ensure a sensible starting state and prevent an empty relief section.
