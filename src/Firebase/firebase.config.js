// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// IMPORTANT: Configuration is read from Vite environment variables.
// Create a .env.local file in your project root with the following:
// VITE_FIREBASE_API_KEY=...
// VITE_FIREBASE_AUTH_DOMAIN=...
// VITE_FIREBASE_PROJECT_ID=...
// VITE_FIREBASE_STORAGE_BUCKET=...
// VITE_FIREBASE_MESSAGING_SENDER_ID=...
// VITE_FIREBASE_APP_ID=...
// Support both canonical VITE_FIREBASE_* keys and legacy VITE_* keys present in .env.local
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? import.meta.env.VITE_appId,
};

// Only initialize if the essential keys exist; otherwise export undefined values
let app;
let auth;
const hasEssentialKeys = Boolean(
  firebaseConfig &&
  firebaseConfig.apiKey &&
  firebaseConfig.authDomain &&
  firebaseConfig.projectId &&
  firebaseConfig.appId
);

if (hasEssentialKeys) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
} else {
  // Intentionally do not initialize to avoid runtime errors; AuthProvider will fall back
}

export { app, auth, firebaseConfig };
export default app;