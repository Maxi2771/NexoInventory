import { NavLink } from "react-router-dom"
import "../assets/style/input.css";
function Btn({to, icon:IconComponent, children }) {
    const base = "w-2xs h-20 flex items-center px-4 py-2 rounded-lg text-2xl";
    const hover = "hover:bg-indigo-500";
    const active = "bg-indigo-600";

    return (
        <NavLink to={to} end className={({ isActive }) => `${base} ${hover} ${isActive ? active : ''}`}>
            <IconComponent className="w-8 h-8 mr-4" />
            {children}
        </NavLink>
    )
}
export default Btn;