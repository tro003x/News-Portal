import React, { useEffect, useState, useCallback } from 'react';
import { AuthContext } from '../contexts/AuthContext.js';

// Simple in-memory fallback auth (used when Firebase env vars are not set).
const makeStubAuth = () => {
    const users = new Map();
    let current = null;

    return {
        createUser: async (email, password) => {
            if (users.has(email)) throw new Error('auth/email-already-in-use');
            const u = { email, displayName: email.split('@')[0], emailVerified: true };
            users.set(email, { password, user: u });
            current = u;
            return { user: u };
        },
        signIn: async (email, password) => {
            const rec = users.get(email);
            if (!rec) {
                const e = new Error('auth/user-not-found');
                e.code = 'auth/user-not-found';
                throw e;
            }
            if (rec.password !== password) {
                const e = new Error('auth/wrong-password');
                e.code = 'auth/wrong-password';
                throw e;
            }
            current = rec.user;
            return { user: current };
        },
        sendEmailVerification: async () => {
            throw new Error('Email verification is unavailable in stub auth. Configure Firebase to enable emails.');
        },
        signInWithGoogle: async () => {
            throw new Error('Google sign-in is unavailable in stub auth. Configure Firebase to enable it.');
        },
        sendPasswordResetEmail: async () => {
            throw new Error('Password reset is unavailable in stub auth. Configure Firebase to enable emails.');
        },
        logOut: async () => {
            current = null;
            return;
        },
        getCurrentUser: () => current,
        checkEmailAvailable: async (email) => !users.has(email),
        onAuthStateChanged: (cb) => {
            
            const id = setTimeout(() => cb(current), 0);
            return () => clearTimeout(id);
        },
    };
};

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    
    const hasEnvFirebase = Boolean(
        import.meta.env.VITE_FIREBASE_API_KEY || import.meta.env.VITE_apiKey
    );

    
    const [impl, setImpl] = useState(null);

    useEffect(() => {
        let unsub = null;

        const setup = async () => {
            // helper to build firebase impl from an auth instance
            const makeFirebaseImpl = async (auth) => {
                const modAuth = await import('firebase/auth');
                const {
                    createUserWithEmailAndPassword,
                    signInWithEmailAndPassword,
                    onAuthStateChanged,
                    signOut,
                    fetchSignInMethodsForEmail,
                    setPersistence,
                    browserLocalPersistence,
                    browserSessionPersistence,
                } = modAuth;
                const { sendEmailVerification: firebaseSendEmailVerification } = modAuth;
                const { sendPasswordResetEmail: firebaseSendPasswordResetEmail } = modAuth;
                const { GoogleAuthProvider, signInWithPopup } = modAuth;
                return {
                    createUser: (email, password) => createUserWithEmailAndPassword(auth, email, password),
                    signIn: async (email, password, options) => {
                        // options.remember true -> local storage; false -> session storage
                        if (options && typeof options.remember !== 'undefined') {
                            await setPersistence(
                                auth,
                                options.remember ? browserLocalPersistence : browserSessionPersistence
                            );
                        }
                        return signInWithEmailAndPassword(auth, email, password);
                    },
                    signInWithGoogle: async (options) => {
                        if (options && typeof options.remember !== 'undefined') {
                            await setPersistence(
                                auth,
                                options.remember ? browserLocalPersistence : browserSessionPersistence
                            );
                        }
                        const provider = new GoogleAuthProvider();
                        return signInWithPopup(auth, provider);
                    },
                    logOut: () => signOut(auth),
                    sendEmailVerification: async (user) => {
                        const target = user || auth.currentUser;
                        if (!target) throw new Error('No authenticated user to verify');
                        const actionCodeSettings = {
                            url: `${window.location.origin}/auth/signin`,
                            handleCodeInApp: false,
                        };
                        return firebaseSendEmailVerification(target, actionCodeSettings);
                    },
                    sendPasswordResetEmail: async (email) => {
                        if (!email) throw new Error('Please provide your email');
                        return firebaseSendPasswordResetEmail(auth, email);
                    },
                    checkEmailAvailable: async (email) => {
                        const methods = await fetchSignInMethodsForEmail(auth, email);
                        return methods.length === 0;
                    },
                    onAuthStateChanged: (cb) => onAuthStateChanged(auth, cb),
                    getCurrentUser: () => auth.currentUser,
                };
            };

            // 1) local initializer ../Firebase/firebase.config.js
            try {
                const mod = await import('../Firebase/firebase.config.js');
                let auth = null;
                if (mod.auth) auth = mod.auth;
                else if (mod.app) {
                    const { getAuth } = await import('firebase/auth');
                    auth = getAuth(mod.app);
                } else if (mod.default) {
                    const def = mod.default;
                    if (def && def.currentUser !== undefined) auth = def; else if (def) {
                        const { getAuth } = await import('firebase/auth');
                        auth = getAuth(def);
                    }
                }
                if (auth) {
                    const firebaseImpl = await makeFirebaseImpl(auth);
                    setImpl(firebaseImpl);
                    console.info('[Auth] Using local Firebase/firebase.config.js');
                    unsub = firebaseImpl.onAuthStateChanged((u) => {
                        // Gate access until email is verified
                        if (u && u.emailVerified === false) {
                            setUser(null);
                        } else {
                            setUser(u);
                        }
                        setLoading(false);
                    });
                    return;
                }
            } catch { /* no local firebase.init.js; continue */ }


            // 2) public runtime config
            try {
                const res = await fetch('/firebase-config.json', { cache: 'no-store' });
                if (res && res.ok) {
                    const cfg = await res.json();
                    if (cfg && cfg.apiKey) {
                        const { initializeApp } = await import('firebase/app');
                        const { getAuth } = await import('firebase/auth');
                        const app = initializeApp(cfg);
                        const auth = getAuth(app);
                        const firebaseImpl = await makeFirebaseImpl(auth);
                        setImpl(firebaseImpl);
                        console.info('[Auth] Using firebase-config.json');
                        unsub = firebaseImpl.onAuthStateChanged((u) => {
                            if (u && u.emailVerified === false) {
                                setUser(null);
                            } else {
                                setUser(u);
                            }
                            setLoading(false);
                        });
                        return;
                    }
                }
            } catch { /* no public json; continue */ }

            // 3) env-based config
            if (hasEnvFirebase) {
                try {
                    const { initializeApp } = await import('firebase/app');
                    const { getAuth } = await import('firebase/auth');
                    const cfg = {
                        apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? import.meta.env.VITE_apiKey,
                        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? import.meta.env.VITE_authDomain,
                        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? import.meta.env.VITE_projectId,
                        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? import.meta.env.VITE_storageBucket,
                        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? import.meta.env.VITE_messagingSenderId,
                        appId: import.meta.env.VITE_FIREBASE_APP_ID ?? import.meta.env.VITE_appId,
                    };
                    const app = initializeApp(cfg);
                    const auth = getAuth(app);
                    const firebaseImpl = await makeFirebaseImpl(auth);
                    setImpl(firebaseImpl);
                    console.info('[Auth] Using env-based Firebase config');
                    unsub = firebaseImpl.onAuthStateChanged((u) => {
                        if (u && u.emailVerified === false) {
                            setUser(null);
                        } else {
                            setUser(u);
                        }
                        setLoading(false);
                    });
                    return;
                } catch (err) {
                    console.warn('Firebase env-based init failed, using stub', err);
                }
            }

            // 4) stub
            const stub = makeStubAuth();
            setImpl(stub);
            console.info('[Auth] Using in-memory stub auth');
            unsub = stub.onAuthStateChanged((u) => { setUser(u); setLoading(false); });
        };

        setup();

        return () => { if (typeof unsub === 'function') unsub(); };
    }, [hasEnvFirebase]);

    const createUser = useCallback(async (email, password) => {
        if (!impl) throw new Error('Auth not initialized');
        return impl.createUser(email, password);
    }, [impl]);

    const signIn = useCallback(async (email, password) => {
        if (!impl) throw new Error('Auth not initialized');
        return impl.signIn(email, password);
    }, [impl]);

    const logOut = useCallback(async () => {
        if (!impl) throw new Error('Auth not initialized');
        await impl.logOut();
        setUser(null);
    }, [impl]);

    const checkEmailAvailable = useCallback(async (email) => {
        if (!impl) throw new Error('Auth not initialized');
        return impl.checkEmailAvailable ? impl.checkEmailAvailable(email) : true;
    }, [impl]);

    const authData = {
        user,
        setUser,
        loading,
        createUser,
        signIn,
        signInWithGoogle: impl && impl.signInWithGoogle ? impl.signInWithGoogle : async () => { throw new Error('Google sign-in unavailable'); },
        logOut,
        sendEmailVerification: impl && impl.sendEmailVerification ? impl.sendEmailVerification : async () => {},
        sendPasswordResetEmail: impl && impl.sendPasswordResetEmail ? impl.sendPasswordResetEmail : async () => {},
        checkEmailAvailable,
    };

    return (
        <AuthContext.Provider value={authData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;