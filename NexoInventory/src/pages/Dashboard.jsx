import "../assets/style/input.css"
import Menu from "../components/Menu";
import DashboardI from "../assets/img/icons/DashboardI.jsx";
import ProductosI from "../assets/img/icons/ProductosI.jsx";
import MovimientosI from "../assets/img/icons/MovimientosI.jsx"; 
import Btn from "../components/Btn";


function Dashboard() {
    return (
        <div className="w-full min-h-screen flex flex-row font-sans fixed">
            <Menu>
                <Btn to="dashboard/" icon={DashboardI}>
                    Dashboard
                </Btn>
                <Btn to="/productos" icon={ProductosI}>
                    Productos
                </Btn>
                <Btn to="/movimientos" icon={MovimientosI}>
                    Movimientos
                </Btn>
            </Menu>
            
        </div>
    );
}

export default Dashboard;
