function StockAlerts() {
    return (
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-lg font-semibold mb-4">Alertas de stock</h3>
            <div className="space-y-3">

                <div className="flex justify-between items-center bg-red-900/60 p-3 rounded-md text-sm">
                    <span>iphone 10 pro</span>
                    <span className="font-bold text-red-400">2 unidades</span>
                </div>

                <div className="flex justify-between items-center bg-red-900/60 p-3 rounded-md text-sm">
                    <span>MacBook Air M2</span>
                    <span className="font-bold text-red-400">2 unidades</span>
                </div>

                <div className="flex justify-between items-center bg-green-900/60 p-3 rounded-md text-sm">
                    <span>Samsung Galaxy</span>
                    <span className="font-bold text-green-400">2 unidades</span>
                </div>

            </div>
        </div>
    );
};

export default StockAlerts;