import { Link } from "react-router-dom"
import "../assets/style/input.css";
function Btn({to, icon:IconComponent, children }) {
    return (
        <Link to={to} className="w-2xs h-20 flex items-center px-4 py-2 rounded-lg text-2xl hover:bg-indigo-400">
            <IconComponent className="w-8 h-8 mr-4" />
            {children}
        </Link>
    )
}
export default Btn;