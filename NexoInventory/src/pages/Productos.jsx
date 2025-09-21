import DropdownButton from "../components/DropdownButton ";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import Header from "../components/header";
import "../assets/style/input.css"
import DownArrow from "../assets/img/icons/DownArrow";
import Menu from "../components/Menu";
import DashboardI from "../assets/img/icons/DashboardI.jsx";
import ProductosI from "../assets/img/icons/ProductosI.jsx";
import MovimientosI from "../assets/img/icons/MovimientosI.jsx"; 
import Btn from "../components/Btn";


function Productos() {

    const productColumns = [
        { header: "ID", accessor: "id" },
        { header: "Nombre", accessor: "nombre" },
        { header: "Categoría", accessor: "categoria" },
        { header: "Precio", accessor: "precio" },
        { header: "Stock", accessor: "stock" },
        { header: "Acciones", accessor: "actions" },
    ];
    const productData = [
        { id: '12345', nombre: 'Auriculares Inalámbricos', categoria: 'Audio', precio: '$150.00', stock: 100, proveedor: 'Proveedor A' },
        { id: '54353', nombre: 'Smartphone Galaxy X', categoria: 'Móviles', precio: '$200.00', stock: 50, proveedor: 'Proveedor B' },
        { id: '57567', nombre: 'Laptop UltraBook Pro', categoria: 'Computadoras', precio: '$450.00', stock: 30, proveedor: 'Proveedor C' },
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
                <Header title="Inventario de productos">
                    <SearchBar placeholder="Buscar por nombre de proveedor..." />
                    <DropdownButton label="Agregar producto" icon={null} />
                    <DropdownButton label="Importar|Exportar" icon={null} />
                    <DropdownButton label="Ordenar por" icon={DownArrow}/>
                    <DropdownButton label="Categoría" icon={DownArrow} />
                </Header>
                <div className="bg-gray-900 p-8 min-h-screen">
                    <Table columns={productColumns} data={productData} />
                </div>
            </div>
        </div>
    );
}

export default Productos;
