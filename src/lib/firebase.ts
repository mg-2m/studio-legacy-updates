
// This file would contain your client-side Firebase configuration.
// IMPORTANT: For security reasons, environment variables should be used to store these keys.
// They are hardcoded here only for the purpose of this MVP demonstration.

import { initializeApp, getApps } from "firebase/app";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyB...", // Replace with your actual config
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "...",
  appId: "...",
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const functions = getFunctions(app);
export default app;
