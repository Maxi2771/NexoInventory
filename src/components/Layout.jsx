import { Outlet } from 'react-router-dom';
import Menu from "./Menu";
import Btn from "./Btn";
import DashboardI from "../assets/img/icons/DashboardI";
import ProductosI from "../assets/img/icons/ProductosI";
import MovimientosI from "../assets/img/icons/MovimientosI";
import { useUser } from '../Contexts/UserContext';

function Layout() {
    const { user, isAuthenticated } = useUser();

    return (
        <div className="flex-grow flex items-start justify-center">
            <Menu>
                {isAuthenticated ? (
                    // Si está logueado, muestra el nombre que viene del objeto 'user'
                    <p className="font-bold text-white">{user.name}</p>
                ) : (
                    // Esto es un respaldo, en teoría nunca debería verse dentro del Layout
                    <p className="text-gray-400">Cargando...</p>
                )}
                <Btn to="/" icon={DashboardI}>Dashboard</Btn>
                <Btn to="/productos" icon={ProductosI}>Productos</Btn>
                <Btn to="/movimientos" icon={MovimientosI}>Movimientos</Btn>
            </Menu>
            <main className="flex-1 bg-gray-900 min-h-screen">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;