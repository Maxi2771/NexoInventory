import CardStat from "../components/CardStat";
import Header from "../components/Header";
import TopProductsChart from "../components/TopProductsChart";
import StockAlerts from "../components/StockAlerts";
import { useProductos } from "../Contexts/ProductosContext";
import { useMovimientos } from "../Contexts/MovimientosContext";
import { useMemo } from "react";

const LOW_STOCK_THRESHOLD = 21;

const datosHoy = (someDate) => {
    if (!someDate) return false;
    const hoy = new Date();
    return someDate.getDate() === hoy.getDate() &&
           someDate.getMonth() === hoy.getMonth() &&
           someDate.getFullYear() === hoy.getFullYear();
};

function Dashboard() {
    
    const { productos, loading: productosLoading } = useProductos();
    const { movimientos, loading: movimientosLoading } = useMovimientos();

    const { bajoStockValue, movimientosHoyValue, valorInventarioValue } = useMemo(() => {
        const bajoStock = productos.filter(p => p.stock < LOW_STOCK_THRESHOLD).length;
        const movsHoy = movimientos.filter(mov => datosHoy(mov.fecha_sinFormato)).length;
        const valorTotal = productos.reduce((sum, p) => {
            const precio = p.precio || 0;
            const stock = p.stock || 0;
            return sum + (stock * precio);
        }, 0);

        return {
            bajoStockValue: bajoStock,
            movimientosHoyValue: movsHoy,
            valorInventarioValue: valorTotal
        };
    }, [productos, movimientos]);

    const isLoading = productosLoading || movimientosLoading;

    return (
        <div className="flex text-white flex-col w-full p-4 md:p-8"> 
            <Header title="Dashboard"></Header>
            
            <div className="flex flex-col items-center w-full space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-7xl">
                    <CardStat
                        title="Movimientos de hoy"
                        value={isLoading ? "..." : movimientosHoyValue}
                        detail="Total de entradas y salidas"
                    />
                    <CardStat
                        title="Valor del Inventario"
                        value={isLoading ? "..." : `$${valorInventarioValue.toLocaleString('es-AR')}`}
                        detail="Valor total del stock"
                    />
                    <CardStat
                        title="Productos bajo stock"
                        value={productosLoading ? "..." : bajoStockValue}
                        isAlert={!productosLoading && bajoStockValue > 0}
                    />
                </div>

                <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-6">
                    <div className="w-full lg:w-2/3">
                        <TopProductsChart productos={productos} loading={isLoading} />
                    </div>
                    <div className="w-full lg:w-1/3">
                        <StockAlerts />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;