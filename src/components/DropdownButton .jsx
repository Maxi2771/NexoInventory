
import "../assets/style/input.css";

function DropdownButton({ label, icon: IconComponent, onClick, options, value, onChange }) {

    const baseClasses = "flex flex-row items-center justify-between w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2.5 px-4 rounded-lg border border-slate-600 transition-colors text-xs";

    if (options) {
        return (
            <div className="relative w-full">
                <select 
                    value={value}
                    onChange={onChange}
                    className={`${baseClasses} appearance-none pr-8`}
                >
                    <option value="">{label}</option> 
                    
                    {options.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                            {opt.nombre}
                        </option>
                    ))}
                </select>
                
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                    {IconComponent && <IconComponent className="w-4 h-4 text-gray-400" />}
                </div>
            </div>
        );
    }

    return (
        <button onClick={onClick} className={baseClasses}>
            <span>{label}</span>
        </button>
    );
}

export default DropdownButton;