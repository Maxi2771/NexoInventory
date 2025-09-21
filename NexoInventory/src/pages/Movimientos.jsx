import DropdownButton from "../components/DropdownButton ";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import Header from "../components/header";
import DownArrow from "../assets/img/icons/DownArrow";
import Menu from "../components/Menu";
import DashboardI from "../assets/img/icons/DashboardI.jsx";
import ProductosI from "../assets/img/icons/ProductosI.jsx";
import MovimientosI from "../assets/img/icons/MovimientosI.jsx"; 
import Btn from "../components/Btn";

function Movimientos() {

    const movimientoColumns = [
        { header: "ID", accessor: "id" },
        { header: "Fecha y hora", accessor: "fecha" },
        { header: "Producto", accessor: "producto" },
        { header: "Cantidad", accessor: "cantidad" },
        { header: "Usuario", accessor: "usuario" },
        { header: "Comentarios", accessor: "comentarios" },
    ];

    const movimientoData = [
        { id: '12345', fecha: '2023-10-01 10:00', producto: 'Auriculares Inalámbricos', cantidad: 10, usuario: 'admin', comentarios: 'Entrada de stock' },
        { id: '54353', fecha: '2023-10-02 14:30', producto: 'Smartphone Galaxy X', cantidad: -5, usuario: 'user1', comentarios: 'Venta realizada' },
        { id: '57567', fecha: '2023-10-03 09:15', producto: 'Laptop UltraBook Pro', cantidad: 3, usuario: 'admin', comentarios: 'Devolución de cliente' },
    ];

    return (
        <div className="w-full min-h-screen flex flex-row font-sans fixed">
            <Menu>
                <Btn to="/dashboard" icon={DashboardI}>
                    Dashboard
                </Btn>
                <Btn to="/productos" icon={ProductosI}>
                    Productos
                </Btn>
                <Btn to="/movimientos" icon={MovimientosI}>
                    Movimientos
                </Btn>
            </Menu>
            <div className="flex text-white flex-col w-full p-4">
                <Header title="Movimientos">
                    <SearchBar placeholder="Buscar por nombre de proveedor..." />
                    <DropdownButton label="Agregar producto" icon={null} />
                    <DropdownButton label="Importar|Exportar" icon={null} />
                    <DropdownButton label="Ordenar por" icon={DownArrow}/>
                    <DropdownButton label="Categoría" icon={DownArrow} />
                </Header>
                <div className="bg-gray-900 p-8 min-h-screen">
                    <Table columns={movimientoColumns} data={movimientoData} />
                </div>
            </div>
        </div>
    );
}

export default Movimientos;
