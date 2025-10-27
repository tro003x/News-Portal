import React, { createContext, useState } from 'react';


export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
        name: 'Tro',
        email: 'Tro@gmail.com',
    });

    const authData = {
        user,
        setUser,
    };

   
    return (
        <AuthContext.Provider value={authData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;