import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// 👇 CORRECCIÓN: Usamos nombres en minúscula que coinciden con la BD
const ProductSchema = Yup.object().shape({
    nombre: Yup.string().min(3, 'Muy corto').required('Obligatorio'),
    categoria_id: Yup.number().required('Debes seleccionar una categoría'),
    precio: Yup.number().positive('Debe ser positivo').required('Obligatorio'),
    stock: Yup.number().integer('Debe ser entero').min(0, 'No puede ser negativo').required('Obligatorio'),
});

function AddProductModal({ isOpen, onClose, onAddProduct, categorias }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-slate-800 p-6 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-white text-2xl mb-4">Agregar Nuevo Producto</h2>
                <Formik
                    initialValues={{
                        nombre: '',
                        categoria_id: '',
                        precio: '',
                        stock: '',
                    }}
                    validationSchema={ProductSchema}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                        await onAddProduct(values);
                        setSubmitting(false);
                        resetForm();
                        onClose();
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="mb-4">
                                <label htmlFor="nombre" className="block text-slate-400 mb-2">Nombre</label>
                                <Field type="text" name="nombre" className="w-full bg-slate-700 text-white p-2 rounded border border-slate-600" />
                                <ErrorMessage name="nombre" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="categoria_id" className="block text-slate-400 mb-2">Categoría</label>
                                <Field as="select" name="categoria_id" className="w-full bg-slate-700 text-white p-2 rounded border border-slate-600">
                                    <option value="">Selecciona una categoría</option>
                                    {categorias.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.nombre}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="categoria_id" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div>
                                    <label htmlFor="precio" className="block text-slate-400 mb-2">Precio</label>
                                    <Field type="number" name="precio" className="w-full bg-slate-700 text-white p-2 rounded border border-slate-600" />
                                    <ErrorMessage name="precio" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                                <div>
                                    <label htmlFor="stock" className="block text-slate-400 mb-2">Stock</label>
                                    <Field type="number" name="stock" className="w-full bg-slate-700 text-white p-2 rounded border border-slate-600" />
                                    <ErrorMessage name="stock" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                            </div>
                            
                            <div className="flex justify-end gap-4">
                                <button type="button" onClick={onClose} className="text-slate-400 hover:text-white">Cancelar</button>
                                <button type="submit" disabled={isSubmitting} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded disabled:bg-slate-500">
                                    {isSubmitting ? 'Guardando...' : 'Guardar Producto'}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default AddProductModal;