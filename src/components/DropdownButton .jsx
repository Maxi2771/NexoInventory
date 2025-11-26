import { useState } from "react";

function DropdownButton({ label, icon: Icon, options = [], value, onChange, onClick }) {
    const [isOpen, setIsOpen] = useState(false);

    if (onClick) {
        return (
            <button
                onClick={onClick}
                className="w-full md:w-auto flex items-center justify-center gap-2 bg-indigo-600/80 hover:bg-indigo-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors whitespace-nowrap shadow-sm"
            >
                {Icon && <Icon className="w-5 h-5" />}
                {label}
            </button>
        );
    }

    return (
        <div className="relative w-full md:w-auto">
            <div className="relative">
                <select
                    value={value}
                    onChange={onChange}
                    className="w-full md:w-auto appearance-none bg-gray-800 border border-gray-600 text-white py-2.5 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer whitespace-nowrap min-w-[140px]"
                >
                    <option value="">{label}</option>
                    {options.map((opt) => (
                        <option key={opt.id} value={opt.id} className="bg-gray-800">
                            {opt.nombre}
                        </option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-400">
                    {Icon ? <Icon className="w-4 h-4" /> : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DropdownButton;