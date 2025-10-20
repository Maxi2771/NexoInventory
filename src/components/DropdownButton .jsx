import "../assets/style/input.css"
function DropdownButton({ label,  icon:IconComponent, onClick }) {
    if (!IconComponent) {
        return (
            <button 
            onClick={onClick} 
                    className={`flex flex-row items-center justify-between w-full md:w-60 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2.5 px-4 rounded-lg border border-slate-600 transition-colors text-xs`}>
                <span>{label}</span>
            </button>
        );
    }else {
        return (
        <button onClick={onClick} className={`flex flex-row items-center justify-between w-full md:w-60 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2.5 px-4 rounded-lg border border-slate-600 transition-colors text-xs`}>
            <span>{label}</span>
            <IconComponent className="w-4 h-4 ml-2" />
        </button>
    );
    }
    
}

export default DropdownButton;