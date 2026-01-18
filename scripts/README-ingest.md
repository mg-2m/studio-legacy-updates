 # Ingest templates into Firestore

This document explains how to run the ingestion script that uploads JSON templates under `src/legal_branches` into Firestore.

Prerequisites
- Node.js 18+ installed
- From repo root: `npm install firebase-admin` (the script uses `firebase-admin`)
- Either:
  - Have a Google service account JSON and set `GOOGLE_APPLICATION_CREDENTIALS=./service-account.json`, or
  - Use the Firestore emulator (recommended for local testing). See below.

Running with Firestore emulator (recommended for development)
1. Install Firebase CLI (if you don't have it):
   ```powershell
   npm install -g firebase-tools
   ```
2. Start the emulator from the repo (or your firebase project):
   ```powershell
   firebase emulators:start --only firestore
   ```
   Note the host and port printed by the emulator, typically `localhost:8080`.
3. In a new shell, set the emulator host env var and run a dry run:
   ```powershell
   $env:FIRESTORE_EMULATOR_HOST = 'localhost:8080'
   node scripts/ingest-templates.js --dry
   ```
4. If the dry run looks good, run without `--dry` to perform writes:
   ```powershell
   node scripts/ingest-templates.js
   ```

Running with real Firestore
1. Create or obtain a service account key with Firestore permissions and save it locally (e.g. `service-account.json`).
2. Set environment variable and run:
   ```powershell
   $env:GOOGLE_APPLICATION_CREDENTIALS = 'C:\path\to\service-account.json'
   node scripts/ingest-templates.js --dry
   # then without --dry to commit
   node scripts/ingest-templates.js
   ```

Notes
- Documents are written into the collection `templates` by default. Override with `FIRESTORE_COLLECTION` environment variable.
- Document id is derived from the relative path under `src/legal_branches` (slashes replaced with `__`). For example `property_and_land_law/prop_petitory_vindication.json` becomes `property_and_land_law__prop_petitory_vindication`.
- Each document will have the following shape:
  ```json
  {
    "_sourcePath": "src/legal_branches/...",
    "_ingestedAt": "2025-12-23T...",
    "data": { /* the JSON content of the file */ }
  }
  ```

If you'd like, I can:
- Add a `package.json` script to run this (e.g. `npm run ingest:dry` / `npm run ingest`).
- Add a TypeScript variant that imports `TEMPLATE_DATA` directly (requires a small build step).
