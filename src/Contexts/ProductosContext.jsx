// src/Contexts/ProductosContext.jsx

import React, { useState, useContext, useMemo, useEffect } from "react";
import { supabase } from '../services/supabaseClient'; // 👈 1. Importa el cliente

const ProductosContext = React.createContext();

export function ProductosProvider({ children }) {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    // 2. Carga inicial de productos desde Supabase
    useEffect(() => {
        const getProductos = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('productos') // Asegúrate que tu tabla se llame 'productos'
                .select('*, categorias(nombre)');

            if (error) {
                console.error('Error fetching productos:', error);
                setLoading(false);
                return;
            }

            const productosConNombres = data.map(producto => ({
                ...producto,
                categoria: producto.categorias ? producto.categorias.nombre : 'Categoría no encontrada'
            }));

            setProductos(productosConNombres);

            setLoading(false);
        };
        getProductos();
    }, []);

    // 3. Modifica las funciones para que sean asíncronas y llamen a Supabase
    const agregarProducto = async (producto) => {
        const { data, error } = await supabase
            .from('productos')
            .insert([producto])
            .select(); // .select() devuelve el registro insertado

        if (error) {
            console.error('Error al agregar producto:', error);
            return;
        }
        // Agrega el nuevo producto al estado local para no tener que recargar
        setProductos(prevProductos => [...prevProductos, ...data]);
    };

    const eliminarProducto = async (id) => {
        const { error } = await supabase
            .from('productos')
            .delete()
            .eq('id', id); // Borra la fila donde el 'id' coincida

        if (error) {
            console.error('Error al eliminar producto:', error);
            return;
        }
        // Filtra el producto eliminado del estado local
        setProductos(prevProductos => prevProductos.filter((p) => p.id !== id));
    };

    const value = useMemo(
        () => ({
            productos,
            loading,
            agregarProducto,
            eliminarProducto
        }),
        [productos, loading]
    );

    return (
        <ProductosContext.Provider value={value}>
            {children}
        </ProductosContext.Provider>
    );
}

export function useProductos() {
    const context = useContext(ProductosContext);
    if (context === undefined) {
        throw new Error("useProductos debe ser usado dentro de un ProductosProvider");
    }
    return context;
}