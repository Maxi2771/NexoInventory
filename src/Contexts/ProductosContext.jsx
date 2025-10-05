import React, { useState, useContext, useMemo } from "react";
import { useFetch } from "./hooks/useFetch";
import { useEffect } from "react";

const ProductosContext = React.createContext();

export function ProductosProvider({ children }) {

    const { data, loading, error } = useFetch("http://localhost:3000/productos");

    const [productos, setProductos] = useState([]);

    useEffect(() => {
        if (data) {
            setProductos(data.data);
        }
    }, [data]);
    

    const agregarProducto = (producto) => {
        setProductos(prevProductos => [...prevProductos, producto]);
    };
    const eliminarProducto = (id) => {
        setProductos(prevProductos => prevProductos.filter((producto) => producto.id !== id));
    };

    const value = useMemo(
        () => ({
            productos,
            agregarProducto,
            eliminarProducto
        }),
        [productos]
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