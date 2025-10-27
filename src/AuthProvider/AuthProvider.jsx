import React, { createContext, useEffect, useState } from 'react';
import App from '../App';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import app from '../firebase/firebase.init';



export const AuthContext = createContext(null);

const auth = getAuth(app)


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    console.log(user);
    const createUser = (email, password) =>{

    return createUserWithEmailAndPassword(auth, email, password);
};
    useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);

        });
        return()=>{
            unsubscribe();
        }
    },[])
    const authData = {
        user,
        setUser,
        createUser,
    };

   
    return (
        <AuthContext.Provider value={authData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;