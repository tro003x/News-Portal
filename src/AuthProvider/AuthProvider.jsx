import React, { createContext, useEffect, useState, useCallback } from 'react';

export const AuthContext = createContext(null);

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
        logOut: async () => {
            current = null;
            return;
        },
        getCurrentUser: () => current,
        checkEmailAvailable: async (email) => !users.has(email),
        onAuthStateChanged: (cb) => {
            // no-op for stub; return unsubscribe
            const id = setTimeout(() => cb(current), 0);
            return () => clearTimeout(id);
        },
    };
};

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const useFirebase = Boolean(import.meta.env.VITE_FIREBASE_API_KEY);

    // Hold runtime auth implementation (either firebase-backed or stub)
    const [impl, setImpl] = useState(null);

    useEffect(() => {
        let unsub = null;

        const setup = async () => {
            if (useFirebase) {
                try {
                    // dynamic import to avoid build-time failure when firebase files/env missing
                    const { initializeApp } = await import('firebase/app');
                    const {
                        getAuth,
                        createUserWithEmailAndPassword,
                        signInWithEmailAndPassword,
                        onAuthStateChanged,
                        signOut,
                        fetchSignInMethodsForEmail,
                    } = await import('firebase/auth');

                    const firebaseConfig = {
                        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
                        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
                        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
                        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
                        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
                        appId: import.meta.env.VITE_FIREBASE_APP_ID,
                    };

                    const app = initializeApp(firebaseConfig);
                    const auth = getAuth(app);

                    const firebaseImpl = {
                        createUser: (email, password) => createUserWithEmailAndPassword(auth, email, password),
                        signIn: (email, password) => signInWithEmailAndPassword(auth, email, password),
                        logOut: () => signOut(auth),
                        checkEmailAvailable: async (email) => {
                            const methods = await fetchSignInMethodsForEmail(auth, email);
                            return methods.length === 0;
                        },
                        onAuthStateChanged: (cb) => onAuthStateChanged(auth, cb),
                        getCurrentUser: () => auth.currentUser,
                    };

                    setImpl(firebaseImpl);

                    unsub = firebaseImpl.onAuthStateChanged((u) => {
                        setUser(u);
                        setLoading(false);
                    });
                } catch (err) {
                    // If dynamic import fails, fall back to stub
                    // eslint-disable-next-line no-console
                    console.warn('Firebase dynamic import failed, using stub auth', err);
                    const stub = makeStubAuth();
                    setImpl(stub);
                    unsub = stub.onAuthStateChanged((u) => {
                        setUser(u);
                        setLoading(false);
                    });
                }
            } else {
                const stub = makeStubAuth();
                setImpl(stub);
                unsub = stub.onAuthStateChanged((u) => {
                    setUser(u);
                    setLoading(false);
                });
            }
        };

        setup();

        return () => {
            if (typeof unsub === 'function') unsub();
        };
    }, [useFirebase]);

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
        logOut,
        checkEmailAvailable,
    };

    return (
        <AuthContext.Provider value={authData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;