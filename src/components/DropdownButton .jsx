// src/components/DropdownButton.jsx

import "../assets/style/input.css";

// 1. Aceptamos nuevas props: options, value, onChange
function DropdownButton({ label, icon: IconComponent, onClick, options, value, onChange }) {

    const baseClasses = "flex flex-row items-center justify-between w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2.5 px-4 rounded-lg border border-slate-600 transition-colors text-xs";

    // --- CASO 1: Si pasas 'options', es un <select> para filtrar ---
    if (options) {
        return (
            <div className="relative w-full">
                <select 
                    value={value}
                    onChange={onChange}
                    // 'appearance-none' oculta la flecha default del navegador
                    className={`${baseClasses} appearance-none pr-8`}
                >
                    {/* El label es la opción por defecto */}
                    <option value="">{label}</option> 
                    
                    {options.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                            {opt.nombre}
                        </option>
                    ))}
                </select>
                
                {/* Ponemos el ícono AFUERA del <select>, en un div sobrepuesto.
                  Esto soluciona el error de la consola.
                */}
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                    {IconComponent && <IconComponent className="w-4 h-4 text-gray-400" />}
                </div>
            </div>
        );
    }

    // --- CASO 2: Si no pasas 'options', es un <button> normal ---
    return (
        <button onClick={onClick} className={baseClasses}>
            <span>{label}</span>
        </button>
    );
}

export default DropdownButton;