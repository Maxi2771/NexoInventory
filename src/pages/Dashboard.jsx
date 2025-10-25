import CardStat from "../components/CardStat";
import Header from "../components/Header";
import TopProductsChart from "../components/TopProductsChart";
import StockAlerts from "../components/StockAlerts";
import PieChart from "../components/PieChart";
import { useProductos } from "../Contexts/ProductosContext";

const LOW_STOCK_THRESHOLD = 10;

function Dashboard() {
    
    const { productos, loading: productosLoading } = useProductos();

    const bajoStockValue = productos.filter(p => p.stock < LOW_STOCK_THRESHOLD).length;
    const ventasHoyValue = "41";
    const montoVentasValue = "$4,203";

    return (
        <div className="flex text-white flex-col w-full p-4">
            <Header title="DashBoard"></Header>
            <div className="flex flex-col items-center">
                <div className="flex w-7xl justify-between">
                    <CardStat
                        title="Ventas de hoy"
                        value={ventasHoyValue}
                        detail="+10% vs ayer"
                    />
                    <CardStat
                        title="Monto de ventas de hoy"
                        value={montoVentasValue}
                        detail="+5% vs ayer"
                    />
                    <PieChart/>
                    <CardStat
                        title="Productos con bajo stock"
                        value={productosLoading ? "..." : bajoStockValue}
                        isAlert={!productosLoading && bajoStockValue > 0}
                    />
                </div>
                <div className="flex w-7xl justify-between m-5 gap-5">
                    <TopProductsChart />
                    <StockAlerts />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;