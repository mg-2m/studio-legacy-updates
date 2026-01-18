import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

function initializeServices() {
    const isConfigured = getApps().length > 0;
    const app = isConfigured ? getApp() : initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const firestore = getFirestore(app);
    const storage = getStorage(app);

    if (process.env.NODE_ENV === 'development' && !globalThis.emulatorLoaded) {
        try {
            console.log('Connecting to Firebase emulators');
            connectAuthEmulator(auth, 'http://localhost:9099');
            connectFirestoreEmulator(firestore, 'localhost', 8080);
            connectStorageEmulator(storage, 'localhost', 9199);
            globalThis.emulatorLoaded = true;
        } catch (error) {
            console.error('Error connecting to Firebase emulators:', error);
        }
    }

    return { app, auth, firestore, storage, isConfigured };
}

export const { app, auth, firestore, storage, isConfigured } = initializeServices();
