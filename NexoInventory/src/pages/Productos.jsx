import DropdownButton from "../components/DropdownButton ";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";

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
        <>
            <div className="grid grid-cols-5 grid-rows-2 gap-8">
                <div className="col-span-3 items-center">
                    <h1>
                        Inventario de productos
                    </h1>
                </div>
                <div>
                    <DropdownButton label="Agregar Producto" />
                </div>
                <div>
                    <DropdownButton label="Exportar" />
                </div>
                <div className="col-span-3">
                    <SearchBar placeholder="Buscar productos..." />
                </div>
                <div>
                    <DropdownButton label="Ordenar por" />
                </div>
                <div>
                    <DropdownButton label="Categoria" />
                </div>
            </div>
            <Table columns={productColumns} data={[]} />
        </>
    );
}

export default Productos;
