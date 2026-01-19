#!/usr/bin/env node
/*
  Ingest JSON templates from `src/legal_branches` into Firestore.

  Features:
  - Scans `src/legal_branches` recursively for `.json` files.
  - Writes each JSON file as a document to the provided collection (default `templates`).
  - Creates document id from the relative file path (slashes replaced with `__`).
  - Supports dry-run via `--dry` or `DRY_RUN=true`.
  - Works with Firestore emulator if `FIRESTORE_EMULATOR_HOST` is set.

  Usage:
    npm install firebase-admin
    # Dry run (no writes):
    node scripts/ingest-templates.js --dry

    # Real run (requires credentials or emulator):
    GOOGLE_APPLICATION_CREDENTIALS=./service-account.json node scripts/ingest-templates.js

    # With emulator (no credentials needed):
    # Make sure emulator is running and FIRESTORE_EMULATOR_HOST is set in the environment
    node scripts/ingest-templates.js

*/

const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

const BASE_DIR = path.join(__dirname, '..', 'src', 'legal_branches');
const DEFAULT_COLLECTION = process.env.FIRESTORE_COLLECTION || 'templates';

const dryRun = process.argv.includes('--dry') || process.env.DRY_RUN === 'true';

if (!process.env.FIRESTORE_EMULATOR_HOST && !process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  console.warn('[ingest-templates] No emulator host or service account detected.');
  console.warn('[ingest-templates] For real writes set GOOGLE_APPLICATION_CREDENTIALS or run Firestore emulator and set FIRESTORE_EMULATOR_HOST.');
}

try {
  // Initialize admin SDK. When emulator is used, no creds are necessary.
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    admin.initializeApp({ credential: admin.credential.applicationDefault() });
  } else {
    admin.initializeApp();
  }
} catch (e) {
  // admin may already be initialized if running from other tooling
}

const db = admin.firestore();

function walkDir(dir) {
  const results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results.push(...walkDir(filePath));
    } else if (filePath.endsWith('.json')) {
      results.push(filePath);
    }
  });
  return results;
}

function toDocId(baseDir, filePath) {
  const rel = path.relative(baseDir, filePath);
  // remove extension and replace path separators with double underscores
  const withoutExt = rel.replace(/\.json$/i, '');
  return withoutExt.split(path.sep).join('__');
}

async function main() {
  if (!fs.existsSync(BASE_DIR)) {
    console.error(`[ingest-templates] Base directory not found: ${BASE_DIR}`);
    process.exit(2);
  }

  const files = walkDir(BASE_DIR);
  console.log(`[ingest-templates] Found ${files.length} JSON files under ${BASE_DIR}`);

  if (!files.length) return;

  const BATCH_SIZE = 450; // keep under 500
  let written = 0;

  for (let i = 0; i < files.length; i += BATCH_SIZE) {
    const chunk = files.slice(i, i + BATCH_SIZE);
    const batch = db.batch();

    for (const filePath of chunk) {
      try {
        const raw = fs.readFileSync(filePath, 'utf8');
        const doc = JSON.parse(raw);
        const id = toDocId(BASE_DIR, filePath);
        const docRef = db.collection(DEFAULT_COLLECTION).doc(id);

        const payload = {
          _sourcePath: path.relative(process.cwd(), filePath),
          _ingestedAt: new Date().toISOString(),
          data: doc,
        };

        if (dryRun) {
          console.log(`[DRY] would write doc '${id}' to collection '${DEFAULT_COLLECTION}' (source: ${payload._sourcePath})`);
        } else {
          batch.set(docRef, payload, { merge: true });
          written += 1;
        }
      } catch (err) {
        console.error(`[ingest-templates] Error reading/parsing ${filePath}:`, err.message || err);
      }
    }

    if (!dryRun) {
      try {
        await batch.commit();
        console.log(`[ingest-templates] Committed batch of ${chunk.length} documents.`);
      } catch (err) {
        console.error('[ingest-templates] Batch commit failed:', err);
        process.exitCode = 3;
      }
    }
  }

  if (!dryRun) {
    console.log(`[ingest-templates] Done. Wrote approximately ${written} documents to '${DEFAULT_COLLECTION}'.`);
  } else {
    console.log('[ingest-templates] Dry run complete. No writes performed.');
  }
}

main().catch((err) => {
  console.error('[ingest-templates] Fatal error:', err);
  process.exit(1);
});
