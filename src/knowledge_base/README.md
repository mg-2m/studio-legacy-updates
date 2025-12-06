# Addis Crown - Legal Knowledge Base

This directory contains the raw text and structured data for all legal source materials used by the application. The content here serves as the foundational knowledge for the AI agents and template generators.

## Structure

- **/raw_texts**: Contains the original, unprocessed text files from legal documents (e.g., Civil Code, Proclamations).
- **/structured_data**: Contains JSON or other structured files processed from the raw texts, ready to be seeded into a database like Firestore.

## Purpose

The goal is to create a self-contained, queryable legal library that the application can use for:
1.  **AI-Powered Narrative Composition:** Genkit flows can query this data to cite specific articles and build legal arguments.
2.  **Dynamic Guidance:** The UI can fetch definitions or explanations for legal terms.
3.  **Fact-Checking and Validation:** Ensure the legal logic in the templates remains consistent with the source code of the law.
