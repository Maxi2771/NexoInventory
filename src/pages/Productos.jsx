import DropdownButton from "../components/DropdownButton ";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import Header from "../components/Header";
import "../assets/style/input.css"
import DownArrow from "../assets/img/icons/DownArrow";
import { useProductos } from "../Contexts/ProductosContext";

function Productos() {

const { productos, eliminarProducto } = useProductos();

    const productColumns = [
        { header: "ID", accessor: "id" },
        { header: "Nombre", accessor: "nombre" },
        { header: "Categoría", accessor: "categoria" },
        { header: "Precio", accessor: "precio" },
        { header: "Stock", accessor: "stock" },
        { header: "Acciones", accessor: "actions" },
    ];

    return (
        <div className="flex text-white flex-col w-full p-4 items-center">
            <Header title="Inventario de productos">
                <SearchBar placeholder="Buscar por nombre de proveedor..." />
                <DropdownButton label="Agregar producto" icon={null} />
                <DropdownButton label="Importar|Exportar" icon={null} />
                <DropdownButton label="Ordenar por" icon={DownArrow} />
                <DropdownButton label="Categoría" icon={DownArrow} />
            </Header>
            <Table columns={productColumns} data={productos} onDelete={eliminarProducto}/>
        </div>
    );
}

export default Productos;
