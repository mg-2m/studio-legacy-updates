"use client";

import React, { useMemo, useEffect, useState, type ReactNode } from 'react';
import { FirebaseProvider } from '@/firebase/provider';
import { initializeIfNeeded, app, auth, firestore } from '@/lib/firebase'; // Corrected import

interface FirebaseClientProviderProps {
  children: ReactNode;
}

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    let mounted = true;
    initializeIfNeeded()
      .then(() => {
        if (mounted) setInitialized(true);
      })
      .catch(() => {
        if (mounted) setInitialized(true); // allow app to continue even if init failed
      });
    return () => {
      mounted = false;
    };
  }, []);

  const firebaseServices = useMemo(() => {
    return { firebaseApp: app, auth, firestore };
  }, [initialized]);

  if (!initialized) return null;

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
