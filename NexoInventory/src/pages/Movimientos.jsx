import DropdownButton from "../components/DropdownButton ";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";

function Movimientos() {

    const productColumns = [
        { header: "ID", accessor: "id" },
        { header: "Fecha y hora", accessor: "fecha y hora" },
        { header: "Producto", accessor: "producto" },
        { header: "Cantidad", accessor: "cantidad" },
        { header: "Usuario", accessor: "usuario" },
        { header: "Comentarios", accessor: "comentarios" },
    ];

    return (
        <div className="text-white">
            <div className="grid grid-cols-5 grid-rows-2 gap-8">
                <div className="col-span-3 items-center">
                    <h1>
                        Gestion de Stock
                    </h1>
                </div>
                <DropdownButton label="Hacer Ajuste" />
                <DropdownButton label="Registrar Entrada" />
                <div className="col-span-3">
                    <SearchBar placeholder="Buscar productos o usuario" />
                </div>
                <DropdownButton label="Movimiento" />
                <DropdownButton label="MM/DD/YYYY" />
            </div>
            <Table columns={productColumns} data={[]} />
        </div>
    );
}

export default Movimientos;
