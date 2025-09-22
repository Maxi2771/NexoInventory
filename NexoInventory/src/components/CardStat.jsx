function CardStat({ title, value, detail, isAlert = false }) {
    const cardColor = isAlert ? "bg-red-900/60 border-red-700" : "bg-gray-800";
    const titleColor = isAlert ? "text-red-400" : "";

    return (
        <div className={`
            p-4                  
            rounded-lg           
            border              
            border-gray-700
            flex
            flex-col
            justify-center
            h-30
            w-60
            ${cardColor}         
        `}>
            <p className={`text-sm font-medium ${titleColor}`}>{title}</p>

            <p className="text-3xl font-bold mt-2">{value}</p>

            {detail && (
                <p className="text-xs text-green-400 mt-1">{detail}</p>
            )}

        </div>
    );
}

export default CardStat;