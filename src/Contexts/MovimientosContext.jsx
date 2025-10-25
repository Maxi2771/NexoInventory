import React, { useState, useContext, useMemo, useEffect } from "react";
import { supabase } from '../services/supabaseClient';
import { useUser } from './UserContext'; 

const MovimientosContext = React.createContext();

export function MovimientosProvider({ children }) {
    const [movimientos, setMovimientos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 
    const { user, loading: userLoading } = useUser();
    useEffect(() => {
        if (!userLoading && user) {
            const getMovimientos = async () => {
                setLoading(true);
                setError(null);
                
                const { data, error } = await supabase
                    .from('movimientos')
                    .select('id, fecha, cantidad, productos(nombre), usuarios(nombre, apellido), comentarios(comentario)')
                    .order('fecha', { ascending: false });

                if (error) {
                    console.error('Error fetching movimientos:', error);
                    setError(error.message); 
                    setLoading(false);
                    return;
                }

                const movimientosConNombres = data.map(movimiento => ({
                    ...movimiento,
                    fecha: new Date(movimiento.fecha).toLocaleString(), 
                    producto: movimiento.productos ? movimiento.productos.nombre : 'N/A',
                    usuario: movimiento.usuarios ? `${movimiento.usuarios.nombre} ${movimiento.usuarios.apellido}` : 'N/A',
                    comentario: movimiento.comentarios ? movimiento.comentarios.comentario : 'N/A' 
                }));

                setMovimientos(movimientosConNombres);
                setLoading(false);
            };
            getMovimientos();
        } else if (!userLoading && !user) {
            setMovimientos([]);
            setLoading(false);
        }
    }, [user, userLoading]);

    const value = useMemo(
        () => ({ movimientos, loading, error }),
        [movimientos, loading, error]
    );

    return (
        <MovimientosContext.Provider value={value}>
            {children}
        </MovimientosContext.Provider>
    );
}

export function useMovimientos() {
    const context = useContext(MovimientosContext);
    if (context === undefined) {
        throw new Error("useMovimientos debe ser usado dentro de un MovimientosProvider");
    }
    return context;
}