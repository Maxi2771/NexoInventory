import CardStat from "../components/CardStat";
import Header from "../components/Header";
import TopProductsChart from "../components/TopProductsChart";
import StockAlerts from "../components/StockAlerts";
import PieChart from "../components/PieChart";

function Dashboard() {
    const bajoStockValue = "15";
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
                        value={bajoStockValue}
                        isAlert={true}
                    />
                </div>
                <div className="flex w-7xl justify-between m-5">
                    <TopProductsChart />
                    <StockAlerts />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;