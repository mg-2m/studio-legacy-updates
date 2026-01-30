// Lazy, client-only Firebase initialization to avoid running Firebase SDK during
// server-side builds (which causes auth/invalid-api-key if NEXT_PUBLIC_ vars
// are missing during build time).

export let app: any = undefined;
export let auth: any = undefined;
export let firestore: any = undefined;
export let storage: any = undefined;
export let isConfigured = false;

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export async function initializeIfNeeded() {
    if (isConfigured) return { app, auth, firestore, storage, isConfigured };

    // Do not initialize on server side during build
    if (typeof window === 'undefined') {
        return { app: undefined, auth: undefined, firestore: undefined, storage: undefined, isConfigured: false };
    }

    try {
        const firebaseAppMod = await import('firebase/app');
        const authMod = await import('firebase/auth');
        const firestoreMod = await import('firebase/firestore');
        const storageMod = await import('firebase/storage');

        const { initializeApp, getApps, getApp } = firebaseAppMod;
        const { getAuth, connectAuthEmulator } = authMod;
        const { getFirestore, connectFirestoreEmulator } = firestoreMod;
        const { getStorage, connectStorageEmulator } = storageMod;

        const configured = getApps().length > 0;
        app = configured ? getApp() : initializeApp(firebaseConfig);
        auth = getAuth(app);
        firestore = getFirestore(app);
        storage = getStorage(app);

        if (process.env.NODE_ENV === 'development' && !(globalThis as any).emulatorLoaded) {
            try {
                connectAuthEmulator(auth, 'http://localhost:9099');
                connectFirestoreEmulator(firestore, 'localhost', 9004);
                connectStorageEmulator(storage, 'localhost', 9199);
                (globalThis as any).emulatorLoaded = true;
            } catch (e) {
                console.error('Error connecting to Firebase emulators:', e);
            }
        }

        isConfigured = true;
        return { app, auth, firestore, storage, isConfigured };
    } catch (e) {
        // If dynamic import or initialization fails, avoid throwing during build.
        console.warn('Firebase initialization skipped (server or missing envs):', e);
        return { app: undefined, auth: undefined, firestore: undefined, storage: undefined, isConfigured: false };
    }
}

