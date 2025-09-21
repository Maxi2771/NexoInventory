import { Outlet } from 'react-router-dom';
import Menu from "./Menu";
import Btn from "./Btn";
import DashboardI from "../assets/img/icons/DashboardI";
import ProductosI from "../assets/img/icons/ProductosI";
import MovimientosI from "../assets/img/icons/MovimientosI";

function Layout() {
    return (
        <div className="flex-grow flex items-start justify-center">
            <Menu>
                <Btn to="/" icon={DashboardI}>Dashboard</Btn>
                <Btn to="/productos" icon={ProductosI}>Productos</Btn>
                <Btn to="/movimientos" icon={MovimientosI}>Movimientos</Btn>
            </Menu>
            <main className="flex-1 bg-gray-900">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;