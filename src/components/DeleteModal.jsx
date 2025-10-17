
function DeleteModal({ isOpen, onClose, onConfirm, product }) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-slate-800 p-6 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-white text-2xl mb-2">Confirmar Eliminación</h2>
                <p className="text-slate-400 mb-6">¿Estás seguro de que quieres eliminar este producto? Esta acción no se puede deshacer.</p>
                
                <div className="bg-slate-700 p-4 rounded-lg mb-6">
                    <p className="text-white"><span className="font-bold">ID:</span> {product?.id}</p>
                    <p className="text-white"><span className="font-bold">Nombre:</span> {product?.nombre}</p>
                </div>

                <div className="flex justify-end gap-4">
                    <button onClick={onClose} className="text-slate-400 hover:text-white font-bold py-2 px-4 rounded">
                        Cancelar
                    </button>
                    <button onClick={onConfirm} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Sí, Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;