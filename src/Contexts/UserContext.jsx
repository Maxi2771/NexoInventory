
import React, { useState, useContext, useMemo, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';

const UserContext = React.createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const manageSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (session) {
                const { data: profile } = await supabase
                    .from('usuarios')
                    .select('nombre, apellido, roles(rol)')
                    .eq('id', session.user.id)
                    .single();

                console.log("Perfil recibido de Supabase:", profile);

                const newUser = {
                    ...session.user,
                    nombre: profile?.nombre,
                    apellido: profile?.apellido,
                    rol: profile?.roles?.rol
                };

                console.log("Objeto de usuario final:", newUser);

                setUser(newUser);
            } else {
                setUser(null);
            }
            setLoading(false);
        };

        manageSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                manageSession();
            } else {
                setUser(null);
            }
        });

        return () => {
            subscription?.unsubscribe();
        };
    }, []);

    const value = useMemo(
        () => ({
            user,
            isAuthenticated: !!user,
            loading,
            login: async (email, password) => {
                const { data, error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
                return data;
            },
            logout: async () => {
                const { error } = await supabase.auth.signOut();
                if (error) throw error;
            },
        }),
        [user, loading]
    );

    if (loading) {
        return <div>Cargando...</div>;
    }

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