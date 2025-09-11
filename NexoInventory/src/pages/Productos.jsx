import DropdownButton from "../components/DropdownButton ";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import "../assets/style/input.css"

function Productos() {

    const productColumns = [
        { header: "ID", accessor: "id" },
        { header: "Nombre", accessor: "nombre" },
        { header: "Categoría", accessor: "categoria" },
        { header: "Precio", accessor: "precio" },
        { header: "Stock", accessor: "stock" },
        { header: "Acciones", accessor: "actions" },
    ];


    return (
        <div className="flex text-white flex-col">
            <div className="grid grid-cols-5 grid-rows-2 gap-8">
                <div className="col-span-3 items-center">
                    <h1>
                        Inventario de productos
                    </h1>
                </div>
                <DropdownButton label="Agregar Producto" />
                <DropdownButton label="Exportar" />
                <div className="col-span-3">
                    <SearchBar placeholder="Buscar productos..." />
                </div>
                <DropdownButton label="Ordenar por" />
                <DropdownButton label="Categoria" />
            </div>
            <Table columns={productColumns} data={[]} />
        </div>
    );
}

export default Productos;
