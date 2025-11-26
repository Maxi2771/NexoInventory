function CardStat({ title, value, detail, isAlert = false }) {
    const cardColor = isAlert ? "bg-red-900/60 border-red-700" : "bg-gray-800";
    const titleColor = isAlert ? "text-red-400" : "text-gray-300";

    return (
        <div className={`rounded-lg border border-gray-700 flex flex-col justify-center text-center items-center w-full p-4 min-h-[140px] shadow-lg ${cardColor}`}>
            <p className={`text-sm font-medium uppercase tracking-wider ${titleColor}`}>{title}</p>
            <p className="text-3xl font-bold mt-2 text-white">{value}</p>
            <p className={`text-xs mt-2 ${detail ? 'text-green-400' : 'invisible'}`}>
                {detail || '-'}
            </p>
        </div>
    );
}
export default CardStat;