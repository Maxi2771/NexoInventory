import DropdownButton from "../components/DropdownButton ";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import Header from "../components/Header";
import "../assets/style/input.css"
import DownArrow from "../assets/img/icons/DownArrow";
import { useProductos } from "../Contexts/ProductosContext";
import { useUser } from "../Contexts/UserContext";
import { useState, useMemo } from "react";
import Modal from "../components/Modal";
import ProductForm from "../components/ProductForm";

const sortOptions = [
    { id: 'id', nombre: 'ID' },
    { id: 'nombre', nombre: 'Nombre' },
    { id: 'precio', nombre: 'Precio' },
    { id: 'stock', nombre: 'Stock' },
];

function Productos() {
    const { productos, categorias, comentariosList, agregarProducto, eliminarProducto, editarProducto, loading, error, totalPages, currentPage, setCurrentPage } = useProductos();
    const { user } = useUser();

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);
    const [productToDelete, setProductToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortBy, setSortBy] = useState('id');

    const productColumns = [
        { header: "ID", accessor: "id" },
        { header: "Nombre", accessor: "nombre" },
        { header: "Categoría", accessor: "categoria" },
        { header: "Precio", accessor: "precio" },
        { header: "Stock", accessor: "stock" },
        { header: "Acciones", accessor: "actions" },
    ];

    const handleNextPage = () => { if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1); };
    const handlePrevPage = () => { if (currentPage > 0) setCurrentPage(currentPage - 1); };
    const handleConfirmDelete = () => { if (productToDelete) { eliminarProducto(productToDelete); setProductToDelete(null); } };
    const handleAddSubmit = async (values) => { await agregarProducto(values); setIsAddModalOpen(false); };
    const handleEditSubmit = async (formValues) => { await editarProducto(productToEdit, formValues); setProductToEdit(null); };

    const filteredAndSortedProductos = useMemo(() => {
        let tempProductos = [...productos];
        const categoryId = Number(selectedCategory);
        if (categoryId) tempProductos = tempProductos.filter(p => p.categoria_id === categoryId);
        if (searchTerm) tempProductos = tempProductos.filter(p => p.nombre.toLowerCase().includes(searchTerm.toLowerCase()));
        tempProductos.sort((a, b) => {
            if (sortBy === 'nombre' || sortBy === 'categoria') return a[sortBy].localeCompare(b[sortBy]);
            return a[sortBy] - b[sortBy];
        });
        return tempProductos;
    }, [productos, searchTerm, selectedCategory, sortBy]);

    if (loading && !productos.length) return <p className="text-white p-8 text-center">Cargando productos...</p>;
    if (error) return <p className="text-red-500 p-8 text-center">Error al cargar: {error}</p>;

    return (
        <div className="flex text-white flex-col w-full p-4 items-center">

            <Header title="Inventario de productos">
                <SearchBar
                    placeholder="Buscar por nombre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto items-stretch md:items-center">

                    {user?.rol === 1 && (
                        <div className="w-full md:w-auto">
                            <DropdownButton
                                label="Agregar Producto"
                                onClick={() => setIsAddModalOpen(true)}
                            />
                        </div>
                    )}

                    <div className="flex gap-2 w-full md:w-auto">
                        <div className="flex-1 md:flex-none">
                            <DropdownButton
                                label="Ordenar"
                                icon={DownArrow}
                                options={sortOptions}
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            />
                        </div>
                        <div className="flex-1 md:flex-none">
                            <DropdownButton
                                label="Categoría"
                                icon={DownArrow}
                                options={categorias}
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </Header>

            <div className="w-full max-w-7xl overflow-x-auto">
                <Table
                    columns={productColumns}
                    data={filteredAndSortedProductos}
                    onDelete={setProductToDelete}
                    onEdit={setProductToEdit}
                    userRole={user?.rol}
                />
            </div>

            <div className="flex justify-between items-center w-full max-w-7xl mt-6 px-2">
                <button onClick={handlePrevPage} disabled={currentPage === 0 || loading} className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg disabled:opacity-50">Anteriores</button>
                <span className="text-slate-400">Página {currentPage + 1} de {totalPages || 1}</span>
                <button onClick={handleNextPage} disabled={currentPage >= totalPages - 1 || loading} className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg disabled:opacity-50">Siguientes</button>
            </div>

            <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Agregar Nuevo Producto">
                <ProductForm initialValues={{ nombre: '', categoria_id: '', precio: '', stock: '', comentario_id: '' }} categorias={categorias} comentarios={comentariosList} onSubmit={handleAddSubmit} onClose={() => setIsAddModalOpen(false)} submitText="Guardar Producto" />
            </Modal>
            <Modal isOpen={!!productToEdit} onClose={() => setProductToEdit(null)} title="Editar Producto">
                <ProductForm initialValues={{ ...productToEdit, comentario_id: '' }} categorias={categorias} comentarios={comentariosList} onSubmit={handleEditSubmit} onClose={() => setProductToEdit(null)} submitText="Guardar Cambios" isEditMode={true} />
            </Modal>
            <Modal isOpen={!!productToDelete} onClose={() => setProductToDelete(null)} title="Confirmar Eliminación">
                <p className="text-slate-400 mb-6">¿Estás seguro de que quieres eliminar este producto?</p>
                <div className="bg-slate-700 p-4 rounded-lg mb-6"><p className="text-white"><span className="font-bold">ID:</span> {productToDelete?.id}</p><p className="text-white"><span className="font-bold">Nombre:</span> {productToDelete?.nombre}</p></div>
                <div className="flex justify-end gap-4"><button onClick={() => setProductToDelete(null)} className="text-slate-400 hover:text-white font-bold py-2 px-4 rounded">Cancelar</button><button onClick={handleConfirmDelete} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Sí, Eliminar</button></div>
            </Modal>
        </div>
    );
}
export default Productos;