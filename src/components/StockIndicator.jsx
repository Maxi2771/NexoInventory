const StockIndicator = ({ amount }) => {
    let colorClass = 'bg-gray-500';
    if (amount > 50) {
        colorClass = 'bg-green-500';
    } else if (amount > 10) {
        colorClass = 'bg-orange-500';
    } else if (amount > 0) {
        colorClass = 'bg-red-500';
    }

    return (
        <div className="flex items-center">
            <span className={`h-2.5 w-2.5 rounded-full mr-2 ${colorClass}`}></span>
            <span>{amount}</span>
        </div>
    );
};

export default StockIndicator;