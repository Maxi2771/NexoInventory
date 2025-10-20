// src/components/Modal.jsx

function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) {
        return null;
    }

    // e.stopPropagation() evita que hacer clic en el modal lo cierre
    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center p-4"
            onClick={onClose} // Cierra el modal si se hace clic en el fondo
        >
            <div 
                className="bg-slate-800 p-6 rounded-lg shadow-xl w-full max-w-md"
                onClick={(e) => e.stopPropagation()} 
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-white text-2xl">{title}</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white text-2xl">&times;</button>
                </div>
                
                {/* Aquí se renderizará el formulario o el mensaje de confirmación */}
                {children}
            </div>
        </div>
    );
}

export default Modal;