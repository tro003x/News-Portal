News Portal (React + Vite)
A modern online news portal built with React and Vite. It includes Firebase Authentication (email/password with verification), Google sign‑in, “remember me” session persistence, password reset, and a clean UX with toasts and loading overlays.


Features
Firebase Authentication (Web v12)
Email/password sign up and sign in
Email verification enforced before access (unverified users are blocked)
Resend verification link from Sign In
“Remember me” toggles local vs session persistence
Password reset via email
Google sign‑in via popup
“Sign in with X” shows “Under construction” popup
Routing and UX
React Router v7
Loading overlay during async actions
Toast notifications (react-toastify)
Tailwind CSS v4 + DaisyUI v5 styling


Tech stack
React 19 + Vite 7
React Router v7 (react-router-dom)
Firebase Auth v12
Tailwind CSS v4 + DaisyUI v5
React Toastify, React Icons


Quick start
Prerequisites
Node.js >= 18
npm >= 9
A Firebase project with Authentication enabled:
Enable Email/Password provider
Optionally enable Google provider
Install
Configure Firebase (choose ONE)

Option A: Environment variables (recommended)

Create .env.local in the project root. This project supports either canonical VITE_FIREBASE_* keys or legacy VITE_* keys.

Option B: Public runtime config

Add public/firebase-config.json:

Option C: Local initializer module

Create firebase.config.js:

Run
Authentication behavior
Sign up:
Sends a verification email.
Immediately signs the user out; access is blocked until verified.
Sign in:
If the account is unverified, a banner offers to resend a verification email and keeps the user signed out.
Remember me:
Controls Firebase persistence (local vs session storage).
Password reset:
“Forgot password?” on Sign In sends a reset email.
Google sign‑in:
Uses GoogleAuthProvider + signInWithPopup.
Respects “Remember me”.
“Sign in with X”:
Shows a toast: “It’s still under construction. Please try again later”.
Scripts
Deploy
You can deploy dist to any static host. For Firebase Hosting:

Project structure (high level)
Environment notes
This project reads Firebase config from any of:
.env.local with VITE_FIREBASE_* or legacy VITE_* keys
public/firebase-config.json
firebase.config.js
If none are present, an in-memory stub auth is used (for local demo only).
Security & privacy
Credentials are not logged; any console diagnostics are dev-only (wrapped with import.meta.env.DEV).
Keep Firebase keys in environment files or the public JSON based on your deployment model.
Ensure Google provider is enabled in Firebase Console if you plan to use Google sign‑in.
Troubleshooting
Tailwind/DaisyUI warnings (e.g., “Unknown at rule @property” in editors) are safe to ignore; Vite compiles them correctly.
On Windows, ensure there’s no folder-case mismatch (e.g., Firebase/ vs FIrebase/).
If the app seems to be in “stub auth” mode:
Verify at least one Firebase config source is present and valid.
Check the browser console for a dev-only banner indicating the active auth mode.
