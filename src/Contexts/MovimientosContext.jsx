import React, { useState, useContext, useMemo, useEffect } from "react";
import { supabase } from '../services/supabaseClient';
import { useUser } from './UserContext'; 

const pageSize = 10;

const MovimientosContext = React.createContext();

export function MovimientosProvider({ children }) {
    const [movimientos, setMovimientos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 
    const { user, loading: userLoading } = useUser();

    const [currentPage, setCurrentPage] = useState(0);
    const [totalMovimientos, setTotalMovimientos] = useState(0);

    
    const [sortBy, setSortBy] = useState('fecha');
    const [sortAsc, setSortAsc] = useState(false);

    useEffect(() => {
        setCurrentPage(0);
    }, [sortBy, sortAsc]);

    useEffect(() => {
        if (!userLoading && user) {
            const getMovimientos = async () => {
                setLoading(true);
                setError(null);
                
                const from = currentPage * pageSize;
                const to = from + pageSize - 1;

                let query = supabase
                    .from('movimientos')
                    .select('id, fecha, cantidad, productos(nombre), usuarios(nombre, apellido), comentarios(comentario)', { count: 'exact' })
                    .order(sortBy, { ascending: sortAsc }) 
                    .range(from, to);                   

                // Ejecutar la consulta
                const { data, error, count } = await query;

                if (error) {
                    console.error('Error fetching movimientos:', error);
                    setError(error.message); // 👈 Guardamos el error para mostrarlo
                    setMovimientos([]);
                    setTotalMovimientos(0);
                    setLoading(false);
                    return;
                }

                // ... (transformación de datos sin cambios)
                const movimientosConNombres = data.map(movimiento => ({
                    ...movimiento,
                    fecha: new Date(movimiento.fecha).toLocaleString(), 
                    producto: movimiento.productos ? movimiento.productos.nombre : 'N/A',
                    usuario: movimiento.usuarios ? `${movimiento.usuarios.nombre} ${movimiento.usuarios.apellido}` : 'N/A',
                    comentario: movimiento.comentarios ? movimiento.comentarios.comentario : 'N/A' 
                }));

                setMovimientos(movimientosConNombres);
                setTotalMovimientos(count || 0);
                setLoading(false);
            };
            getMovimientos();
        } else if (!userLoading && !user) {
            setMovimientos([]);
            setLoading(false);
        }
    }, [user, userLoading, currentPage, sortBy, sortAsc]);

    const totalPages = Math.ceil(totalMovimientos / pageSize);

    const value = useMemo(
        () => ({ movimientos, loading, error, currentPage, setCurrentPage, totalPages, sortBy, setSortBy, sortAsc, setSortAsc }),
        [movimientos, loading, error, currentPage, totalPages, sortBy, sortAsc]
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