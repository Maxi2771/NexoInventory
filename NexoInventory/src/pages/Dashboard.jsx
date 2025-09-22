import CardStat from "../components/CardStat";
import Header from "../components/header";
import TopProductsChart from "../components/TopProductsChart";
import StockAlerts from "../components/StockAlerts";

function Dashboard() {
    const stockTotalValue = "1,264";
    const bajoStockValue = "15";
    const ventasHoyValue = "41";
    const montoVentasValue = "$4,203";

    return (
        <div className="flex text-white flex-col w-full p-4">
            <Header title="DashBoard"></Header>
            <div className="grid grid-cols-4 gap-6">
                <CardStat title="Stock total" value={stockTotalValue} />
                <CardStat
                    title="Productos con bajo stock"
                    value={bajoStockValue}
                    isAlert={true}
                />
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
                <div className="col-span-3">
                    <TopProductsChart />
                </div>

                <div className="col-span-1">
                    <StockAlerts />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;