# MVP Full-stack Engineering Mandate

## PREAMBLE: THE "LIVING MVP" DIRECTIVE

**Mandate Confirmed:** This document supersedes all previous transition plans. The project's immediate and sole priority is the engineering of a live, fully integrated Minimum Viable Product (MVP).

**Core Mission:** To forge a seamless, full-stack application that connects the three completed Legal Reasoning Graphs (LRGs)—**Family Law, Contract Law, and Property Law**—to the frontend user interface, all grounded within the Firebase ecosystem. This MVP will serve as the living, demonstrable proof of the Addis Crown concept and the foundational architecture for all future development.

**Guiding Philosophies:**
1.  **The Socratic UI:** We will implement the "Socratic UI" as a premium, toggleable **"Guided Mode"** alongside the existing **"Expert Mode"** (Prophetic Editor). The UI must feel like a conversation with a skilled Ethiopian lawyer.
2.  **Dual-Theme Experience:** A user-selectable **Dark and Light Mode** will be implemented, adhering to the style guidelines in `blueprint.md` to ensure professional aesthetics and user comfort.
3.  **Unyielding Protocol Adherence:** All work will strictly conform to the `genesis_protocol.md` and the data-structuring rules of the **"Supreme Mandate of Knowledge v2.0."**

---

## HIGH-LEVEL ARCHITECTURE: THE THREE PILLARS OF JUSTICE

Our system will be composed of three interconnected pillars, reflecting the journey from raw law to a client's finished legal document.

1.  **The Data Layer (The "Chilot" - The Bench):** *The Source of Truth.* This is where the codified legal knowledge (our LRGs) resides, stored immutably in Firestore. It is the final arbiter of legal logic.
2.  **The Services Layer (The "Mekrez" - The Registrar):** *The Guardian of Logic.* This is the backend engine, built with Firebase Cloud Functions. It processes requests from the UI, queries the "Chilot," and returns the precise legal logic or question required. It ensures the rules are followed.
3.  **The Presentation Layer (The "Wekil" - The Advocate):** *The User's Counsel.* This is the Next.js frontend. It masterfully presents the law to the user, guiding them through either the Socratic dialogue or the Expert editor to build their case.

---

## PHASE 1: THE "CHILOT" (BACKEND & DATA FOUNDATION)

**Objective:** To migrate the completed LRG modules into a scalable Firestore database and deploy the core backend logic via Cloud Functions.

*   **Task 1.1: Firestore Schema Implementation**
    *   **Action:** Create two primary Firestore collections: `lrg_modules` and `lrg_nodes`.
    *   **`lrg_modules`:** This collection will store the holistic JSON objects for each legal branch (Family, Contract, Property). This is optimized for the "Expert Mode" which loads an entire template at once.
        *   *Document ID:* `family_law_v1`, `contract_law_v1`, etc.
        *   *Content:* The full JSON structure from the `..._Module_V1_Final` directories.
    *   **`lrg_nodes`:** This collection will store the "atomic" components of the law (individual facts, questions, rhetoric blocks, legal rules). This is optimized for the "Socratic Mode." Each document will be a single node in the reasoning graph.
        *   *Document ID:* `fam_fact_marriage_civil`, `cl_q_is_contract_written`, etc.
        *   *Content:* A structured object containing its `legalText`, `rhetoric`, `mutexGroup`, `autoEvidence`, and pointers to the `next_node_ids`.
    *   **Data Ingestion:** Write a one-time script (`ingest_lrgs.js`) to parse the existing LRG `.json` files and populate both Firestore collections.

*   **Task 1.2: Cloud Function Development (The "Mekrez")**
    *   **Action:** Develop and deploy two core Firebase Cloud Functions.
    *   **`getExpertTemplate(templateId)`:**
        *   *Trigger:* HTTPS Request.
        *   *Logic:* Fetches a single, complete document from the `lrg_modules` collection.
        *   *Returns:* A full JSON object for the "Expert Mode" UI.
    *   **`getNextSocraticNode(currentNodeId, userAnswers)`:**
        *   *Trigger:* HTTPS Request.
        *   *Logic:*
            1.  Retrieves the document for `currentNodeId` from the `lrg_nodes` collection.
            2.  Analyzes the `userAnswers` to determine which logical path to take next.
            3.  Returns the data for the next node in the conversation (e.g., the next question to ask).
        *   *Returns:* A JSON object for a single Socratic UI element.

*   **Phase 1 Self-Check:**
    *   `[ ]` Firestore collections `lrg_modules` and `lrg_nodes` are created.
    *   `[ ]` All three completed LRGs (Family, Contract, Property) are successfully ingested into both collections.
    *   `[ ]` Data structure in Firestore strictly adheres to the "Supreme Mandate v2.0."
    *   `[ ]` Both `getExpertTemplate` and `getNextSocraticNode` Cloud Functions are deployed.
    *   `[ ]` Functions can be successfully triggered and return correctly structured data.

---

## PHASE 2: THE "WEKIL" (FRONTEND ENGINEERING)

**Objective:** To re-architect the UI to support the dual-mode "View-Switcher," implement the theme engine, and build the Socratic conversational interface.

*   **Task 2.1: UI Theme Engine (Dark/Light Mode)**
    *   **Action:** Integrate a theme provider (e.g., `next-themes`).
    *   **Styling:** Update `tailwind.config.ts` to use CSS variables for colors (e.g., `--background`, `--foreground`, `--primary`). Define color values for `[data-theme='light']` and `[data-theme='dark']`.
    *   **Control:** Create a reusable `<ThemeSwitcher />` component with an icon (e.g., Sun/Moon) and place it in the application's main header/sidebar.

*   **Task 2.2: State Management & View-Switcher**
    *   **Action:** Introduce a new global state variable: `uiMode` (values: `'expert'` or `'socratic'`).
    *   **Control:** Add a UI toggle (e.g., "Guided Mode" / "Expert Mode") within the main editor view. This toggle will update the `uiMode` state.
    *   **Layout Logic:** Modify `src/components/main-layout.tsx`. The central content area will now conditionally render `<EditorColumn />` if `uiMode === 'expert'` or a new `<SocraticView />` if `uiMode === 'socratic'`.

*   **Task 2.3: Build the `<SocraticView />` Component**
    *   **Action:** Create the new React component `src/components/socratic-view.tsx`.
    *   **Structure:** This component will manage the state of the current conversation.
    *   **Logic:**
        1.  On load, it calls the `getNextSocraticNode` Cloud Function with an initial node ID.
        2.  It renders the returned content (a question, an explanation) and appropriate input controls (buttons, text fields).
        3.  When the user responds, it captures the answer and calls `getNextSocraticNode` again, passing the current node ID and the user's answer to get the next step in the dialogue.

*   **Phase 2 Self-Check:**
    *   `[ ]` Dark/Light theme toggle is functional and styles are applied correctly across the UI.
    *   `[ ]` "Guided/Expert" mode switcher is present in the UI and correctly updates the global `uiMode` state.
    *   `[ ]` The main layout correctly renders `<EditorColumn />` or `<SocraticView />` based on the `uiMode` state.
    *   `[ ]` `<SocraticView />` successfully calls the `getNextSocraticNode` function and renders the initial question.

---

## PHASE 3: THE "FIRD" (FULL-STACK INTEGRATION & REFINEMENT)

**Objective:** To ensure seamless data flow between the two UI modes, verify the accuracy of the final generated document, and polish the end-to-end user experience.

*   **Task 3.1: State Hydration & Synchronization**
    *   **Action:** Ensure that facts, evidence, and party details gathered during the Socratic conversation are correctly formatted and added to the main application state.
    *   **Synchronization:** When a user switches from "Guided Mode" to "Expert Mode," the `<EditorColumn />` should instantly reflect all the information gathered in the Socratic dialogue. The experience must be seamless, with no data loss.

*   **Task 3.2: Unified Document Generation**
    *   **Action:** Refactor the document generation logic to be independent of the UI mode.
    *   **Verification:** Generate legal documents from a state populated by the Socratic mode and from a state populated by the Expert mode.
    *   **Scrutiny:** As a practicing lawyer, I will verify that the final output is 100% compliant with Ethiopian court filing standards, with correct Amharic terminology, formatting, and spelled-out numerals as per the "Amharic First" protocol.

*   **Task 3.3: User Authentication & Premium Feature (Stub)**
    *   **Action:** For this MVP, we will assume a single, anonymous user. However, we will implement a placeholder for the "premium" feature logic.
    *   **Stub:** The "Guided Mode" toggle will be visible to all, but clicking it might show a "Coming Soon for Premium Users" message. This allows us to build and test the full functionality now while preparing for a commercial launch later.

*   **Phase 3 Self-Check:**
    *   `[ ]` Data entered in `<SocraticView />` is correctly reflected in the main application state and visible in `<EditorColumn />`.
    *   `[ ]` The print/preview output is identical and legally correct regardless of which UI mode was used to enter the data.
    *   `[ ]` The final document passes a "legal eye" test for formatting, language, and compliance.
    *   `[ ]` The premium feature stub is in place without blocking the core functionality.

---

## EXECUTION & VERIFICATION PROTOCOL

I will proceed with this mandate phase by phase, task by task. I will begin with **Phase 1, Task 1.1**. Upon completing each numbered task, I will provide a concise report of the action taken and the result. I will then await your explicit confirmation before proceeding to the next task. This ensures you remain in full command of the development process. The work begins now.
