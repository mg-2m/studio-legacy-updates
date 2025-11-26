
# Addis Crown Blueprint: JSON to UI Implementation Checklist

This document serves as the definitive checklist for transforming the legal knowledge from the `docs/backend.json` blueprint into a fully functional, "spoon-fed" user interface. This process must be followed for every new legal branch and for any QA validation of existing branches.

## The 7 Segments of UI Implementation

1.  **Head, Date, Court Name, Location, Bench Name, and Bench Address:**
    *   Ensure all court-related information (Tier, Bench, City/Region) is presented as pre-populated dropdowns (`Select` components).
    *   Source this data from the researched lists in `src/lib/data.ts`.
    *   The date should use a calendar picker for intuitive selection.
    *   Unique identifiers (like File No.) can remain as text inputs.

2.  **Party Head with Titles, Addresses, and Role:**
    *   Party titles (e.g., "Mr.", "Mrs.") must be a dropdown sourced from a centralized list.
    *   Address components (City, Subcity) must be dropdowns. Allow a conditional text input for "Other".
    *   The role of the party (e.g., "Applicant," "Respondent") must be dynamically rendered based on the `partyTitles` defined for the selected template in `backend.json`.

3.  **Introduction for Procedural Matters:**
    *   Present options for court jurisdiction, legal representation, and summons delivery as radio groups or dropdowns.
    *   These options should be sourced from a predefined list, reflecting standard procedural choices.
    *   The jurisdiction text itself must be dynamically pulled from the `jurisdictionText` property of the selected template.

4.  **Title of the Suite:**
    *   The main document title (e.g., "Statement of Claim for Unlawful Termination") must be automatically and dynamically rendered in the preview pane.
    *   This title must be sourced directly from the `documentTitle` property of the selected template in `backend.json`.
    *   Provide options for manual input only for case-specific details like monetary values where applicable.

5.  **Facts Stating and Grounding:**
    *   Facts must be presented in the UI in the exact logical `groups` as defined in `backend.json`.
    *   Each fact within a group should be a checkbox item, allowing the user to select their specific legal arguments.
    *   The `legalText` and `citation` for each fact must be displayed clearly.
    *   This section must support the addition of "Custom Facts" via a textarea for circumstances not covered by the predefined facets.

6.  **Request Judgment and Relief:**
    *   All standard reliefs for a template must be presented as a list of checkbox items.
    *   The text for each relief must be sourced directly from the `reliefs` array in `backend.json`.
    *   Reliefs marked as `isDefault` in the data should be checked by default.
    *   This section must support the addition of "Custom Reliefs" for user-specific requests.

7.  **Evidence List Attachment & Auto Oath Statement:**
    *   The `EvidenceTab` UI must clearly distinguish between:
        *   **Required (Auto-Linked) Evidence:** Items automatically added when a user selects a corresponding fact.
        *   **AI-Suggested Evidence:** Optional items recommended by the AI.
        *   **Manual Evidence:** Items added by the user.
    *   The final document preview (`page-two.tsx`) must dynamically render a clean, formatted list of all active evidence.
    *   The verification/oath statements at the end of the document pages should be standardized, static text as they represent a legal formality.
