import DropdownButton from "../components/DropdownButton ";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import Header from "../components/Header";
import "../assets/style/input.css"
import DownArrow from "../assets/img/icons/DownArrow";
import { useProductos } from "../Contexts/ProductosContext";
import AddProductModal from "../components/AddProductModal";
import { useUser } from "../Contexts/UserContext";
import { useState } from "react";

function Productos() {

    const { productos, categorias, agregarProducto, eliminarProducto, loading, error } = useProductos();
    const { user } = useUser();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const productColumns = [
        { header: "ID", accessor: "id" },
        { header: "Nombre", accessor: "nombre" },
        { header: "Categoría", accessor: "categoria" },
        { header: "Precio", accessor: "precio" },
        { header: "Stock", accessor: "stock" },
        { header: "Acciones", accessor: "actions" },
    ];

    if (loading) {
        return <p className="text-white p-8 text-center">Cargando productos...</p>;
    }

    if (error) {
        return <p className="text-red-500 p-8 text-center">Error al cargar: {error}</p>;
    } 

    return (
        <div className="flex text-white flex-col w-full p-4 items-center">
            <Header title="Inventario de productos">
                <SearchBar placeholder="Buscar por nombre..." />

                {console.log("Usuario actual en Productos.jsx:", user)}

                {user?.rol === 1 && (
                    <DropdownButton
                        label="Agregar producto"
                        onClick={() => setIsModalOpen(true)} 
                    />
                )}

                <DropdownButton label="Importar|Exportar" icon={null} />
                <DropdownButton label="Ordenar por" icon={DownArrow} />
                <DropdownButton label="Categoría" icon={DownArrow} />
            </Header>

            <Table columns={productColumns} data={productos} onDelete={eliminarProducto} />

            <AddProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddProduct={agregarProducto}
                categorias={categorias}
            />
        </div>
    );
}

export default Productos;
