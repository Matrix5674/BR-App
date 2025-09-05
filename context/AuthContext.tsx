// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { createContext, useState, useEffect, use } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../scripts/firebase';
import { getUserData } from '../scripts/fetchUserData';

import { AuthContextType } from '../scripts/types';

export const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    setUser: () => {},
});


export function AuthProvider({children}: {children: React.ReactNode}) {
    const [user, setUser] = useState<any | null>(null);;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const userData = await getUserData({user: currentUser});
                setUser(userData);
            } else {
                setUser(null);
            }
            setLoading(false);
        })
        return unsubscribe;
    }, []);
    
    return (
        <AuthContext.Provider value={{user, setUser, loading}}>
            {children}
        </AuthContext.Provider>
    )

}