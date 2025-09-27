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
                    <p className="w-2xs h-20 flex items-center px-4 py-2 rounded-lg text-2xl border-b font-bold text-white">{user.name}</p>
                ) : (
                    // Esto es un respaldo, en teoría nunca debería verse dentro del Layout
                    <p className="w-2xs h-20 flex items-center px-4 py-2 rounded-lg text-2xl border-b text-gray-400">Cargando...</p>
                )}
                <div className="flex flex-col space-y-2 w-xs justify-center items-center mt-50">
                    <Btn to="/" icon={DashboardI}>Dashboard</Btn>
                    <Btn to="/productos" icon={ProductosI}>Productos</Btn>
                    <Btn to="/movimientos" icon={MovimientosI}>Movimientos</Btn>
                </div>
            </Menu>
            <main className="flex-1 bg-gray-900 min-h-screen">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;