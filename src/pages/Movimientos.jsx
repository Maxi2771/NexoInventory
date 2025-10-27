import DropdownButton from "../components/DropdownButton ";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import Header from "../components/Header";
import DownArrow from "../assets/img/icons/DownArrow";
import { useMovimientos } from "../Contexts/MovimientosContext";
import { useState, useMemo } from "react";

const sortOptions = [
    { id: 'fecha', nombre: 'Fecha' },
    { id: 'id', nombre: 'ID' },
    { id: 'cantidad', nombre: 'Cantidad' },
];

function Movimientos() {
    const { movimientos, loading, error, currentPage, setCurrentPage, totalPages, sortBy, setSortBy, sortAsc, setSortAsc } = useMovimientos();

    const [searchTerm, setSearchTerm] = useState("");

    const movimientoColumns = [
        { header: "ID", accessor: "id" },
        { header: "Fecha y hora", accessor: "fecha" },
        { header: "Producto", accessor: "producto" },
        { header: "Usuario", accessor: "usuario" },
        { header: "Cantidad", accessor: "cantidad" },
        { header: "Comentarios", accessor: "comentario" },
    ];

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const filteredMovimientos = useMemo(() => {
        // Si no hay búsqueda, devuelve los 10 movimientos
        if (!searchTerm) {
            return movimientos;
        }

        const trimmedSearch = searchTerm.trim().toLowerCase();

        // Filtra los 10 movimientos
        return movimientos.filter(mov =>
            (mov.producto && mov.producto.toLowerCase().includes(trimmedSearch)) ||
            (mov.usuario && mov.usuario.toLowerCase().includes(trimmedSearch)) ||
            (mov.comentario && mov.comentario.toLowerCase().includes(trimmedSearch))
        );
    }, [movimientos, searchTerm]);

    if (loading && !movimientos.length) { return <p className="text-white p-8 text-center">Cargando movimientos...</p>; }
    if (error) { return <p className="text-red-500 p-8 text-center">Error al cargar: {error}</p>; }

    return (
        <div className="flex text-white flex-col w-full p-4 items-center">
            <Header title="Movimientos">
                <SearchBar 
                    placeholder="Buscar en los 10 items..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </Header>
            <Table columns={movimientoColumns} data={filteredMovimientos} />
            <div className="flex justify-between items-center w-300 mt-6">
                <button 
                    onClick={handlePrevPage} 
                    // Deshabilitamos el botón si estamos en la primera página o cargando
                    disabled={currentPage === 0 || loading}
                    className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Anteriores
                </button>
                
                <span className="text-slate-400">
                    Página {currentPage + 1} de {totalPages > 0 ? totalPages : 1}
                </span>

                <button 
                    onClick={handleNextPage} 
                    // Deshabilitamos si estamos en la última página o cargando
                    disabled={currentPage >= totalPages - 1 || loading}
                    className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Siguientes
                </button>
            </div>
        </div>
    );
}

export default Movimientos;