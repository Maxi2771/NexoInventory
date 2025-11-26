import { NavLink } from "react-router-dom"
import "../assets/style/input.css";

function Btn({ to, icon: IconComponent, children }) {
    const base = "w-full flex items-center px-4 py-3 md:py-2.5 mx-2 md:mx-0 rounded-lg text-lg md:text-base transition-all duration-200 font-medium";
    const hover = "hover:bg-gray-700 text-gray-400 hover:text-white";
    const active = "bg-indigo-600/20 text-indigo-400 border-l-4 border-indigo-500";
    return (
        <NavLink
            to={to}
            end
            className={({ isActive }) => `${base} ${isActive ? "bg-indigo-600 text-white shadow-md" : hover}`}
        >
            <IconComponent className="w-6 h-6 mr-3 opacity-90" />
            {children}
        </NavLink>
    )
}
export default Btn;