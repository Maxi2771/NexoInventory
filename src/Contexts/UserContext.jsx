import React, { useState, useContext, useMemo } from 'react';

const UserContext = React.createContext();

export function UserProvider({ children }) {
const [user, setUser] = useState(null);

    const TEST_CREDENTIALS = {
        usuario: 'admin',
        password: 'admin123',
        name: 'Admin Demo',
        role: 'Admin',
    };

    const login = (userData) => setUser(userData ?? { name: 'Usuario', role: 'User' });
    const logout = () => { setUser(null); };

    const authenticate = ({ usuario, password }) => {
        const ok = usuario === TEST_CREDENTIALS.usuario && password === TEST_CREDENTIALS.password;
        if (ok) {
            setUser({ name: TEST_CREDENTIALS.name, role: TEST_CREDENTIALS.role });
        }
        return ok;
    };

    // useMemo evita que el objeto 'value' se cree de nuevo en cada render a menos que el estado 'user' cambie.
    const value = useMemo(
        () => ({
            user,
            isAuthenticated: !!user, //V si hay usuario, F si no
            login,
            logout,
            authenticate,
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
