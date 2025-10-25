import React from 'react';
import { useMovimientos } from '../Contexts/MovimientosContext';

const abreviar = (name) => {
    if (!name) return 'N/A';
    return name.substring(0, 20).toUpperCase();
};

function StockAlerts() {

    const { movimientos, loading } = useMovimientos();
    const ultimosMovimientos = movimientos.slice(0, 5);

    return (
        <div className="bg-slate-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold text-white mb-4">Alertas de Stock</h3>
            
            {loading && <p className="text-slate-400">Cargando...</p>}
            
            {!loading && ultimosMovimientos.length === 0 && (
                <p className="text-slate-400">No hay movimientos recientes.</p>
            )}

            <div className="space-y-4">
                {!loading && ultimosMovimientos.map(mov => {
                    const esPositivo = mov.cantidad > 0;
                    const colorClass = esPositivo ? 'text-green-500' : 'text-red-500';
                    const bgClass = esPositivo ? 'bg-green-500/10' : 'bg-red-500/10';
                    const iconoTexto = esPositivo ? '↑' : '↓'; 
                    const signo = esPositivo ? '+' : '';

                    return (
                        <div key={mov.id} className="flex justify-between items-center">
                            
                            <div className="flex items-center gap-3">
                                <span className={`flex items-center justify-center w-8 h-8 rounded-full ${bgClass} ${colorClass} font-bold text-lg`}>
                                    {iconoTexto}
                                </span>
                                <span className="font-bold text-white text-lg">
                                    {abreviar(mov.producto)}
                                </span>
                            </div>
                            
                            <span className={`font-bold text-lg ${colorClass}`}>
                                {signo}{mov.cantidad}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default StockAlerts;