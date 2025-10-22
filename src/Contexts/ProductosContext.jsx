import React, { useState, useContext, useMemo, useEffect, useCallback } from "react"; 
import { supabase } from '../services/supabaseClient';
import { useUser } from './UserContext'; 

const ProductosContext = React.createContext();

export function ProductosProvider({ children }) {
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]); 
    const [comentariosList, setComentariosList] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { user, loading: userLoading } = useUser();


    const getProductos = useCallback(async () => {
        const { data, error } = await supabase
            .from('productos')
            .select('*, categorias(nombre)')
            .eq('esta_activo', true);
        if (error) { console.error('Error fetching productos:', error); setError(error.message); return; }
        const productosConNombres = data.map(producto => ({
            ...producto,
            categoria: producto.categorias ? producto.categorias.nombre : 'Categoría no encontrada'
        }));
        setProductos(productosConNombres);
    }, []);

    const getCategorias = useCallback(async () => {
        const { data, error } = await supabase.from('categorias').select('id, nombre');
        if (error) { console.error('Error fetching categorias:', error); setError(error.message); return; }
        setCategorias(data);
    }, []);

    const getComentarios = useCallback(async () => {
        const { data, error } = await supabase.from('comentarios').select('id, comentario');
        if (error) { console.error('Error fetching comentarios:', error); setError(error.message); return; }
        setComentariosList(data);
    }, []);

    useEffect(() => {
        if (!userLoading && user) {
            const fetchData = async () => {
                setLoading(true);
                setError(null);
                // Carga todo en paralelo: productos, categorías y comentarios
                await Promise.all([getProductos(), getCategorias(), getComentarios()]);
                setLoading(false);
            };
            fetchData();
        } else if (!userLoading && !user) {
            setProductos([]);
            setCategorias([]);
            setComentariosList([]);
            setLoading(false);
        }
    }, [user, userLoading, getProductos, getCategorias, getComentarios]);

    const registrarMovimiento = async (producto_id, cantidad, comentario_id) => {
        if (!user || cantidad === 0 || !comentario_id) return;

        const movimientoData = {
            producto_id: producto_id,
            usuario_id: user.id,
            cantidad: cantidad,
            comentarios: comentario_id 
        };
        
        const { error } = await supabase.from('movimientos').insert(movimientoData);
        if (error) {
            console.error("Error al registrar movimiento:", error);
            alert("Error al registrar el movimiento: " + error.message);
        }
    };

    const agregarProducto = async (formValues) => {
        const productoParaInsertar = {
            nombre: formValues.nombre,
            categoria_id: formValues.categoria_id,
            precio: formValues.precio,
            stock: formValues.stock
        };

        const { data, error } = await supabase.from('productos').insert([productoParaInsertar]).select().single();
        if (error) { 
            console.error('Error detallado de Supabase:', error);
            alert("Error al agregar producto: " + error.message); 
            return; 
        }

        const comentarioId = comentariosList.find(c => c.comentario.includes("Creación"))?.id;
        await registrarMovimiento(data.id, data.stock, comentarioId);

        await getProductos();
    };

    const editarProducto = async (originalProduct, formValues) => {
        const stockOriginal = originalProduct.stock;
        const stockNuevo = parseInt(formValues.stock, 10);
        const stockCambiado = stockOriginal !== stockNuevo;

        const datosParaActualizar = {
            nombre: formValues.nombre,
            categoria_id: formValues.categoria_id,
            precio: formValues.precio,
            stock: stockNuevo
        };

        const { data, error } = await supabase.from('productos').update(datosParaActualizar)
            .eq('id', originalProduct.id).select('*, categorias(nombre)').single();
            
        if (error) {
            console.error('Error al editar producto:', error);
            alert("Error al editar producto: " + error.message);
            return;
        }

        if (stockCambiado) {
            const cantidadAjuste = stockNuevo - stockOriginal; // ej: 95 - 100 = -5
            await registrarMovimiento(originalProduct.id, cantidadAjuste, formValues.comentario_id);
        }

        const productoFormateado = { ...data, categoria: data.categorias ? data.categorias.nombre : 'N/A' };
        setProductos(prev => prev.map(p => (p.id === originalProduct.id ? productoFormateado : p)));
    };

    const eliminarProducto = async (producto) => {
    const comentarioId = comentariosList.find(c => c.comentario.includes("eliminado"))?.id;
    await registrarMovimiento(producto.id, -producto.stock, comentarioId);

    const { error } = await supabase
        .from('productos')
        .update({ esta_activo: false })
        .eq('id', producto.id);

    if (error) { 
        console.error('Error al desactivar producto:', error);
        alert("Error al desactivar producto: " + error.message);
        return;
    }

    setProductos(prev => prev.filter((p) => p.id !== producto.id));
};

    const value = useMemo(
        () => ({
            productos,
            categorias,
            comentariosList,
            loading,
            error,
            agregarProducto,
            editarProducto,
            eliminarProducto,
        }),
        [productos, categorias, comentariosList, loading, error, user] // Dependencias
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