import React from 'react';

const ChartBar = ({ label, value, maxValue, color }) => {
    const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
    
    return (
        <div className="flex items-center gap-3 w-full">
            <span className="w-24 text-sm text-slate-400 truncate" title={label}>
                {label}
            </span>
            
            <div className="flex-1 bg-slate-700 rounded-full h-4">
                <div
                    className={`${color} h-4 rounded-full text-xs text-white font-bold flex items-center justify-center min-w-[2rem] transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                >
                    {value}
                </div>
            </div>
        </div>
    );
};

function TopProductsChart({ productos = [], loading }) {
    
    const top5Products = React.useMemo(() => {
        return [...productos]
            .sort((a, b) => b.stock - a.stock)
            .slice(0, 5);
    }, [productos]);

    const maxValue = top5Products[0]?.stock || 0;
    const colors = ['bg-sky-400', 'bg-teal-400', 'bg-indigo-400', 'bg-rose-400', 'bg-amber-400'];

    return (
        <div className="bg-slate-800 p-6 rounded-lg shadow-lg w-full">
            <h3 className="text-xl font-bold text-white mb-6">Productos con Más Stock</h3>
            
            {loading && <p className="text-slate-400">Cargando...</p>}
            
            {!loading && top5Products.length === 0 && (
                <p className="text-slate-400">No hay productos para mostrar.</p>
            )}

            <div className="space-y-4">
                {!loading && top5Products.map((prod, index) => (
                    <ChartBar
                        key={prod.id}
                        label={prod.nombre}
                        value={prod.stock}
                        maxValue={maxValue}
                        color={colors[index % colors.length]}
                    />
                ))}
            </div>
        </div>
    );
}

export default TopProductsChart;