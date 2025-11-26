import "../assets/style/input.css";

function Menu({ children, isOpen, onClose }) {
    return (
        <>
            <div 
                className={`fixed inset-0 bg-black/60 z-40 transition-opacity md:hidden ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
                onClick={onClose}
            />
            <div className={`
                fixed md:static top-0 left-0 
                w-72 h-[100dvh] md:h-screen bg-gray-800 text-white 
                flex flex-col shadow-xl z-50
                transform transition-transform duration-300 ease-in-out
                ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
            `}>
                <div className="flex flex-col h-full">
                    {children}
                </div>
            </div>
        </>
    );
}

export default Menu;