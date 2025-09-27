import React, {useState, useContext, useMemo} from "react";

const ProductosContext = React.createContext();

export function ProductosProvider({children}) {
    const [productos, setProductos] = useState([
        {id: 1, nombre: "Auriculares Inalambricos", categoria: "Audio", precio: 100, stock: 100},
        {id: 2, nombre: "Smartphone", categoria: "Moviles", precio: 200, stock: 50},
        {id: 3, nombre: "Laptop", categoria: "Computadoras", precio: 300, stock: 5},
    ]);
    const agregarProducto = (producto) => {
        setProductos([...productos, producto]);
    };
    const eliminarProducto = (id) => {
        setProductos(productos.filter((producto) => producto.id !== id));
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
    if (!ProductosContext) {
        throw new Error("useProductos debe ser usado dentro de un ProductosProvider");
}
    return useContext(ProductosContext);
}