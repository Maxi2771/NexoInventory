import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Menu from "./Menu";
import Btn from "./Btn";
import DashboardI from "../assets/img/icons/DashboardI";
import ProductosI from "../assets/img/icons/ProductosI";
import MovimientosI from "../assets/img/icons/MovimientosI";
import { useUser } from '../Contexts/UserContext';

function Layout() {
    const { user, isAuthenticated, logout } = useUser();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate('/login', { replace: true });
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-900">
            <div className="md:hidden flex items-center justify-between p-4 bg-gray-800 text-white shadow-md sticky top-0 z-30">
                <span className="font-bold text-xl">NexoInventory</span>
                <button onClick={() => setIsMenuOpen(true)} className="p-2">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                </button>
            </div>

            <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
                <div className="p-6 border-b border-gray-700 bg-gray-900/30 flex-shrink-0">
                    {isAuthenticated && user ? (
                        <div>
                            <p className="font-bold text-white text-lg truncate">{user.nombre} {user.apellido || user.email}</p>
                            <p className="text-xs text-gray-500 mt-1 uppercase">Panel de Control</p>
                        </div>
                    ) : <p className="text-gray-400">Cargando...</p>}
                </div>

                <div className="flex-1 overflow-y-auto px-3 py-4 space-y-2">
                    <div onClick={() => setIsMenuOpen(false)}><Btn to="/" icon={DashboardI}>Dashboard</Btn></div>
                    <div onClick={() => setIsMenuOpen(false)}><Btn to="/productos" icon={ProductosI}>Productos</Btn></div>
                    <div onClick={() => setIsMenuOpen(false)}><Btn to="/movimientos" icon={MovimientosI}>Movimientos</Btn></div>
                </div>

                <div className="p-4 border-t border-gray-700 bg-gray-900/30 flex-shrink-0 mb-safe">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white bg-red-900/70 hover:bg-red-700/70 transition font-medium"
                    >
                        <span>Cerrar Sesión</span>
                    </button>
                </div>
            </Menu>

            <main className="flex-1 w-full bg-gray-900 overflow-x-hidden">
                <Outlet />
            </main>
        </div>
    );
}
export default Layout;