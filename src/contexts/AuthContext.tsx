
import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { ref, get } from "firebase/database";

interface AuthContextType {
    user: User | null;
    isAdmin: boolean;
    loading: boolean;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    isAdmin: false,
    loading: true,
    logout: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                // Check if user is admin or team member
                // For simplicity, we'll check a 'users/uid/role' path in DB
                // If not found, default to false
                try {
                    const userRef = ref(db, `users/${currentUser.uid}`);
                    const snapshot = await get(userRef);
                    if (snapshot.exists()) {
                        const userData = snapshot.val();
                        setIsAdmin(userData.role === 'admin');
                    } else {
                        setIsAdmin(false);
                    }
                } catch (error) {
                    console.error("Error fetching user role:", error);
                    setIsAdmin(false);
                }
            } else {
                setIsAdmin(false);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const logout = async () => {
        await signOut(auth);
    };

    return (
        <AuthContext.Provider value={{ user, isAdmin, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
