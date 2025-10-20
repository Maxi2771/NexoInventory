import React, { useState, useContext, useMemo, useEffect, useCallback } from "react"; 
import { supabase } from '../services/supabaseClient';

const ProductosContext = React.createContext();

export function ProductosProvider({ children }) {
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]); 
    const [loading, setLoading] = useState(true);

    const getProductos = useCallback(async () => {
        const { data, error } = await supabase
            .from('productos')
            .select('*, categorias(nombre)');

        if (error) {
            console.error('Error fetching productos:', error);
            return; 
        }

        const productosConNombres = data.map(producto => ({
            ...producto,
            categoria: producto.categorias ? producto.categorias.nombre : 'Categoría no encontrada'
        }));
        setProductos(productosConNombres);
    }, []);

    const getCategorias = useCallback(async () => {
        const { data, error } = await supabase
            .from('categorias')
            .select('id, nombre');

        if (error) {
            console.error('Error fetching categorias:', error);
            return;
        }
        setCategorias(data);
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            // Promise.all ejecuta ambas peticiones en paralelo para mayor eficiencia
            await Promise.all([getProductos(), getCategorias()]);
            setLoading(false);
        };
        fetchData();
    }, [getProductos, getCategorias]);

    const agregarProducto = async (producto) => {
        const { data, error } = await supabase.from('productos').insert([producto]).select();
        
        if (error) {
            console.error('Error detallado de Supabase:', error);
            alert("Error al agregar producto: " + error.message); 
            return; 
        }

        await getProductos();
    };

    const editarProducto = async (id, productoActualizado) => {
        // Limpiamos el objeto por si acaso
        delete productoActualizado.id;
        delete productoActualizado.categoria;
        delete productoActualizado.categorias;

        const { data, error } = await supabase
            .from('productos')
            .update(productoActualizado)
            .eq('id', id)
            .select('*, categorias(nombre)'); // Devuelve el dato actualizado con el join
        
        if (error) {
            console.error('Error al editar producto:', error);
            return;
        }

        // Transforma el dato actualizado (viene en un array)
        const productoEditado = {
            ...data[0],
            categoria: data[0].categorias ? data[0].categorias.nombre : 'Sin categoría'
        };

        // Actualiza el estado local para que se refleje el cambio
        setProductos(prevProductos => 
            prevProductos.map(p => (p.id === id ? productoEditado : p))
        );
    };

    const eliminarProducto = async (id) => {
        const { error } = await supabase.from('productos').delete().eq('id', id);
        if (error) {
            console.error('Error al eliminar producto:', error);
            return;
        }
        setProductos(prevProductos => prevProductos.filter((p) => p.id !== id));
    };

    const value = useMemo(
        () => ({
            productos,
            categorias,
            loading,
            agregarProducto,
            editarProducto,
            eliminarProducto
        }),
        [productos, categorias, loading, agregarProducto, eliminarProducto, editarProducto] 
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