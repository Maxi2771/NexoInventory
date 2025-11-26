import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import { useMovimientos } from "../Contexts/MovimientosContext";
import { useState, useMemo } from "react";

const sortOptions = [
    { id: 'fecha', nombre: 'Fecha' },
    { id: 'id', nombre: 'ID' },
    { id: 'cantidad', nombre: 'Cantidad' },
];

function Movimientos() {
    const { movimientos, loading, error, currentPage, setCurrentPage, totalPages } = useMovimientos();
    const [searchTerm, setSearchTerm] = useState("");

    const movimientoColumns = [
        { header: "ID", accessor: "id" },
        { header: "Fecha", accessor: "fecha" },
        { header: "Producto", accessor: "producto" },
        { header: "Usuario", accessor: "usuario" },
        { header: "Cant", accessor: "cantidad" },
        { header: "Notas", accessor: "comentario" },
    ];

    const handleNextPage = () => { if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1); };
    const handlePrevPage = () => { if (currentPage > 0) setCurrentPage(currentPage - 1); };

    const filteredMovimientos = useMemo(() => {
        if (!searchTerm) return movimientos;
        const s = searchTerm.trim().toLowerCase();
        return movimientos.filter(mov =>
            (mov.producto && mov.producto.toLowerCase().includes(s)) ||
            (mov.usuario && mov.usuario.toLowerCase().includes(s)) ||
            (mov.comentario && mov.comentario.toLowerCase().includes(s))
        );
    }, [movimientos, searchTerm]);

    if (loading && !movimientos.length) return <p className="text-white p-8 text-center">Cargando...</p>;

    return (
        <div className="flex text-white flex-col w-full p-4 items-center">
            <Header title="Movimientos">
                <div className="w-full md:w-auto">
                    <SearchBar
                        placeholder="Buscar en los items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </Header>

            <div className="w-full max-w-7xl">
                <Table columns={movimientoColumns} data={filteredMovimientos} />
            </div>

            <div className="flex justify-between items-center w-full max-w-7xl mt-6 px-2">
                <button onClick={handlePrevPage} disabled={currentPage === 0 || loading} className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg disabled:opacity-50">
                    Anterior
                </button>
                <span className="text-slate-400">Pag {currentPage + 1} de {totalPages || 1}</span>
                <button onClick={handleNextPage} disabled={currentPage >= totalPages - 1 || loading} className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg disabled:opacity-50">
                    Siguiente
                </button>
            </div>
        </div>
    );
}

export default Movimientos;