import DropdownButton from "../components/DropdownButton ";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import Header from "../components/Header";
import DownArrow from "../assets/img/icons/DownArrow";
import { useMovimientos } from "../Contexts/MovimientosContext";

function Movimientos() {

    const { movimientos, eliminarMovimiento } = useMovimientos();

    const movimientoColumns = [
        { header: "ID", accessor: "id" },
        { header: "Fecha y hora", accessor: "fecha" },
        { header: "Cantidad", accessor: "cantidad" },
        { header: "Producto", accessor: "producto" },
        { header: "Usuario", accessor: "usuario" },
        { header: "Comentarios", accessor: "comentarios" },
    ];

    return (
        <div className="flex text-white flex-col w-full p-4 items-center">
            <Header title="Movimientos">
                <SearchBar placeholder="Buscar por nombre de proveedor..." />
                <DropdownButton label="Agregar producto" icon={null} />
                <DropdownButton label="Importar|Exportar" icon={null} />
                <DropdownButton label="Ordenar por" icon={DownArrow} />
                <DropdownButton label="Categoría" icon={DownArrow} />
            </Header>
            <Table columns={movimientoColumns} data={movimientos} onDelete={eliminarMovimiento} />
        </div>
    );
}

export default Movimientos;
