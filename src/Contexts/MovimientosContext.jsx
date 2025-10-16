// src/Contexts/MovimientosContext.jsx

import React, { useState, useContext, useMemo, useEffect } from "react";
import { supabase } from '../services/supabaseClient'; // 👈 1. Importa el cliente

const MovimientosContext = React.createContext();

export function MovimientosProvider({ children }) {
    const [movimientos, setMovimientos] = useState([]);
    const [loading, setLoading] = useState(true);

    // 2. Carga inicial de movimientos desde Supabase
    useEffect(() => {
        const getMovimientos = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('movimientos') // Asegúrate que tu tabla se llame 'movimientos'
                .select('*, productos(nombre), usuarios(nombre, apellido)');

            if (error) {
                console.error('Error fetching movimientos:', error);
                setLoading(false);
                return;
            }

            const movimientosConNombres = data.map(movimiento => ({
                ...movimiento,
                producto: movimiento.productos ? movimiento.productos.nombre : 'Producto no encontrado',
                usuario: movimiento.usuarios ? `${movimiento.usuarios.nombre} ${movimiento.usuarios.apellido}` : 'Usuario no encontrado'
            }));


            setMovimientos(movimientosConNombres);
            setLoading(false);
        };
        getMovimientos();
    }, []);

    // 3. Modifica las funciones para que sean asíncronas y llamen a Supabase
    const agregarMovimiento = async (movimiento) => {
        const { data, error } = await supabase
            .from('movimientos')
            .insert([movimiento])
            .select(); // .select() devuelve el registro insertado

        if (error) {
            console.error('Error al agregar movimiento:', error);
            return;
        }
        // Agrega el nuevo movimiento al estado local para no tener que recargar
        setMovimientos(prevMovimientos => [...prevMovimientos, ...data]);
    };

    const eliminarMovimiento = async (id) => {
        const { error } = await supabase
            .from('movimientos')
            .delete()
            .eq('id', id); // Borra la fila donde el 'id' coincida

        if (error) {
            console.error('Error al eliminar movimiento:', error);
            return;
        }
        // Filtra el movimiento eliminado del estado local
        setMovimientos(prevMovimientos => prevMovimientos.filter((m) => m.id !== id));
    };

    const value = useMemo(
        () => ({
            movimientos,
            loading,
            agregarMovimiento,
            eliminarMovimiento
        }),
        [movimientos, loading]
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