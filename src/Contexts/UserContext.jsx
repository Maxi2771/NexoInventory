import React, { useState, useContext, useMemo } from 'react';

const UserContext = React.createContext();

export function UserProvider({ children }) {
const [user, setUser] = useState({
        name: "Fabrizio Amado",
        email: "fabrizio@email.com",
        role: "Admin",
    });

    const login = () => setUser({ name: "", email: "" });
    const logout = () => { setUser(null); };

    // useMemo evita que el objeto 'value' se cree de nuevo en cada render a menos que el estado 'user' cambie.
    const value = useMemo(
        () => ({
            user,
            isAuthenticated: !!user, //V si hay usuario, F si no
            login,
            logout,
        }),
        [user]
    );

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser debe ser usado dentro de un UserProvider");
    }
    return context;
};