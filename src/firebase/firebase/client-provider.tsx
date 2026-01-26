'use client';

import React, { useMemo, type ReactNode } from 'react';
import { FirebaseProvider, FirebaseContext } from '@/firebase/provider';
import { initializeFirebase } from '@/firebase';

interface FirebaseClientProviderProps {
  children: ReactNode;
}

// Mock context for SSR/static builds
const mockFirebaseContext = {
  areServicesAvailable: false,
  firebaseApp: null,
  firestore: null,
  auth: null,
  user: null,
  isUserLoading: false,
  userError: null,
};

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  const firebaseServices = useMemo(() => {
    // Only initialize Firebase on the client side to prevent SSR/static build errors
    if (typeof window === 'undefined') {
      return null;
    }
    return initializeFirebase();
  }, []);

  // During SSR or static build, provide mock context
  if (!firebaseServices) {
    return (
      <FirebaseContext.Provider value={mockFirebaseContext}>
        {children}
      </FirebaseContext.Provider>
    );
  }

  return (
    <FirebaseProvider
      firebaseApp={firebaseServices.firebaseApp}
      auth={firebaseServices.auth}
      firestore={firebaseServices.firestore}
    >
      {children}
    </FirebaseProvider>
  );
}