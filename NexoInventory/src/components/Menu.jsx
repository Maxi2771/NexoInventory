import "../assets/style/input.css";
import Dashboard from "../assets/img/icons/Dashboard.jsx";
import Productos from "../assets/img/icons/Productos.jsx";
import Movimientos from "../assets/img/icons/Movimientos.jsx"; 
import Btn from "./Btn";

function Menu() {
    return (
        <div className="w-xs h-screen bg-gray-800 text-white flex flex-col justify-center">
            <div className="flex flex-col space-y-2 w-xs justify-center items-center">
                <Btn to="/" icon={Dashboard}>
                    Dashboard
                </Btn>
                <Btn to="/productos" icon={Productos}>
                    Productos
                </Btn>
                <Btn to="/movimientos" icon={Movimientos}>
                    Movimientos
                </Btn>
            </div>
        </div>
    );
}

export default Menu;