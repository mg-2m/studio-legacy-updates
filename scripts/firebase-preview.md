 # Firebase preview (GitHub Actions)

This repo includes a GitHub Actions workflow that builds the app and deploys it to a Firebase Hosting preview channel for each pull request.

What the workflow does
- Runs on PR open/sync/reopen
- Installs deps, builds the site, and deploys to a preview channel named `pr-<PR_NUMBER>`
- The preview channel expires after 7 days (configurable in the workflow)

Secrets & setup (safe, minimal privileges)
1. Create or choose a Firebase project for staging (do NOT use production project).
2. Create a service account in Google Cloud Console and grant it the **Firebase Hosting Admin** role (or at minimum `roles/firebasehosting.admin` and `roles/firebasehosting.viewer`).
3. Generate a JSON key for that service account.
4. In your GitHub repository settings -> Secrets -> Actions, add a new secret named `FIREBASE_SERVICE_ACCOUNT` with the full JSON content of the service account file.

How to configure the workflow
- Edit `.github/workflows/firebase-preview.yml` and replace `your-staging-project-id` with your Firebase project id.

Notes & safety
- Use a separate staging Firebase project for previews to avoid accidental production writes.
- The secret `FIREBASE_SERVICE_ACCOUNT` should be kept private and only used by Actions.
- The preview channel created by the workflow is temporary (expires after the configured `expires` time). You can close channels manually from the Firebase console if needed.

Alternatives
- Vercel: If you prefer zero-config previews for Next.js, connect the repo to Vercel and enable Preview Deployments (automatic for PRs). Vercel handles environment variables securely and is recommended for full Next.js feature support (ISR, Edge functions).

Want me to add this to the `package.json` as `npm run preview:dry` and `npm run preview:deploy`? Reply and I will add the scripts and a short checklist for generating the service account and adding the secret.
