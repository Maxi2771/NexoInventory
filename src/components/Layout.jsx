import { Outlet, useNavigate } from 'react-router-dom';
import Menu from "./Menu";
import Btn from "./Btn";
import DashboardI from "../assets/img/icons/DashboardI";
import ProductosI from "../assets/img/icons/ProductosI";
import MovimientosI from "../assets/img/icons/MovimientosI";
import { useUser } from '../Contexts/UserContext';

function Layout() {
    const { user, isAuthenticated, logout } = useUser();
    const navigate = useNavigate();

    const handleLogout = async () => { // Hacemos la función async
        await logout(); // Esperamos a que el logout se complete
        navigate('/login', { replace: true });
    };

    return (
        <div className="flex-grow flex items-start justify-center">
            <Menu>
                {isAuthenticated && user ? ( // Verificamos que user no sea null
                    // 👇 ¡Aquí está el cambio!
                    <p className="w-2xs h-20 flex items-center px-4 py-2 rounded-lg text-2xl border-b font-bold text-white">
                        {user.nombre || user.email}
                    </p>
                ) : (
                    <p className="w-2xs h-20 flex items-center px-4 py-2 rounded-lg text-2xl border-b text-gray-400">
                        Cargando...
                    </p>
                )}
                {/* ... (el resto de tu componente no cambia) ... */}
                <div className="flex flex-col space-y-2 w-xs justify-center items-center mt-50">
                    <Btn to="/" icon={DashboardI}>Dashboard</Btn>
                    <Btn to="/productos" icon={ProductosI}>Productos</Btn>
                    <Btn to="/movimientos" icon={MovimientosI}>Movimientos</Btn>
                </div>
                <button
                    onClick={handleLogout}
                    className="mt-6 w-xs px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
                >
                    Cerrar Sesión
                </button>
            </Menu>
            <main className="flex-1 bg-gray-900 min-h-screen">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;