import DropdownButton from "../components/DropdownButton ";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import Header from "../components/Header";
import "../assets/style/input.css"
import DownArrow from "../assets/img/icons/DownArrow";
import { useProductos } from "../Contexts/ProductosContext";
import { useUser } from "../Contexts/UserContext";
import { useState } from "react";
import Modal from "../components/Modal";
import ProductForm from "../components/ProductForm";

function Productos() {

    const { productos, categorias, agregarProducto, eliminarProducto, editarProducto, loading, error } = useProductos();
    const { user } = useUser();

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null); 
    const [productToDelete, setProductToDelete] = useState(null);

    const productColumns = [
        { header: "ID", accessor: "id" },
        { header: "Nombre", accessor: "nombre" },
        { header: "Categoría", accessor: "categoria" },
        { header: "Precio", accessor: "precio" },
        { header: "Stock", accessor: "stock" },
        { header: "Acciones", accessor: "actions" },
    ];

    const handleConfirmDelete = () => {
        if (productToDelete) {
            eliminarProducto(productToDelete.id);
            setProductToDelete(null);
        }
    };

    const handleAddSubmit = async (values) => {
        await agregarProducto(values);
        setIsAddModalOpen(false);
    };

    const handleEditSubmit = async (values) => {
        const valuesParaEnviar = { ...values };
        delete valuesParaEnviar.id;
        delete valuesParaEnviar.categoria;
        delete valuesParaEnviar.categorias;

        await editarProducto(productToEdit.id, valuesParaEnviar);
        setProductToEdit(null); // Cierra el modal de editar
    };

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
                        label="Agregar Producto"
                        onClick={() => setIsAddModalOpen(true)} 
                    />
                )}

                <DropdownButton label="Ordenar por" icon={DownArrow} />
                <DropdownButton label="Categoría" icon={DownArrow} />
            </Header>

            <Table
                columns={productColumns}
                data={productos}
                onDelete={setProductToDelete}
                onEdit={setProductToEdit}
                userRole={user?.rol} />

            {/* MODAL DE AGREGAR */}
            <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Agregar Nuevo Producto">
                <ProductForm
                    initialValues={{ nombre: '', categoria_id: '', precio: '', stock: '' }}
                    categorias={categorias}
                    onSubmit={handleAddSubmit}
                    onClose={() => setIsAddModalOpen(false)}
                    submitText="Guardar Producto"
                />
            </Modal>

            {/* MODAL DE EDITAR (Solo se muestra si 'productToEdit' no es null) */}
            <Modal isOpen={!!productToEdit} onClose={() => setProductToEdit(null)} title="Editar Producto">
                <ProductForm
                    initialValues={productToEdit} // Le pasamos el producto a editar
                    categorias={categorias}
                    onSubmit={handleEditSubmit}
                    onClose={() => setProductToEdit(null)}
                    submitText="Guardar Cambios"
                />
            </Modal>

            {/* MODAL DE ELIMINAR (Solo se muestra si 'productToDelete' no es null) */}
            <Modal isOpen={!!productToDelete} onClose={() => setProductToDelete(null)} title="Confirmar Eliminación">
                <p className="text-slate-400 mb-6">¿Estás seguro de que quieres eliminar este producto?</p>
                <div className="bg-slate-700 p-4 rounded-lg mb-6">
                    <p className="text-white"><span className="font-bold">ID:</span> {productToDelete?.id}</p>
                    <p className="text-white"><span className="font-bold">Nombre:</span> {productToDelete?.nombre}</p>
                </div>
                <div className="flex justify-end gap-4">
                    <button onClick={() => setProductToDelete(null)} className="text-slate-400 hover:text-white font-bold py-2 px-4 rounded">
                        Cancelar
                    </button>
                    <button onClick={handleConfirmDelete} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Sí, Eliminar
                    </button>
                </div>
            </Modal>
        </div>
    );
}

export default Productos;
