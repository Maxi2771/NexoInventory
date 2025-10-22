import DropdownButton from "../components/DropdownButton ";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import Header from "../components/Header";
import DownArrow from "../assets/img/icons/DownArrow";
import { useMovimientos } from "../Contexts/MovimientosContext";

function Movimientos() {
    const { movimientos, loading, error } = useMovimientos();

    const movimientoColumns = [
        { header: "ID", accessor: "id" },
        { header: "Fecha y hora", accessor: "fecha" },
        { header: "Producto", accessor: "producto" },
        { header: "Usuario", accessor: "usuario" },
        { header: "Cantidad", accessor: "cantidad" },
        { header: "Comentarios", accessor: "comentario" },
    ];

    if (loading) { return <p className="text-white p-8 text-center">Cargando movimientos...</p>; }
    if (error) { return <p className="text-red-500 p-8 text-center">Error al cargar: {error}</p>; }

    return (
        <div className="flex text-white flex-col w-full p-4 items-center">
            <Header title="Movimientos">
                <SearchBar placeholder="Buscar por producto o usuario..." />
                <DropdownButton label="Ordenar por" icon={DownArrow} />
            </Header>
            <Table columns={movimientoColumns} data={movimientos} />
        </div>
    );
}

export default Movimientos;