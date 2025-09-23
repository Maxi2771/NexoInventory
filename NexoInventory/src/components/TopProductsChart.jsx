// src/components/TopProductsChart.jsx

function TopProductsChart() {
    return (
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 w-234">
            <h3 className="text-lg font-semibold mb-6">Productos más vendidos</h3>
            <div className="space-y-5">
                <div>
                    <div className="flex justify-between items-center text-sm mb-1 text-gray-300">
                        <span>Laptops</span>
                        <span className="text-gray-400">1,200 unidades</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between items-center text-sm mb-1 text-gray-300">
                        <span>Smartphones</span>
                        <span className="text-gray-400">950 unidades</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between items-center text-sm mb-1 text-gray-300">
                        <span>Auriculares</span>
                        <span className="text-gray-400">600 unidades</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '50%' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopProductsChart;