
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ProductSchema = Yup.object().shape({
    nombre: Yup.string().min(3, 'Muy corto').required('El nombre es obligatorio'),
    
    categoria_id: Yup.number()
        .typeError('Debes seleccionar una categoría') 
        .required('Debes seleccionar una categoría'),

    precio: Yup.number()
        .typeError('El precio debe ser un número')
        .positive('Debe ser positivo')
        .required('El precio es obligatorio'),
    
    stock: Yup.number()
        .typeError('El stock debe ser un número')
        .integer('Debe ser entero')
        .min(0, 'No puede ser negativo')
        .required('El stock es obligatorio'),

    comentario_id: Yup.number().nullable()
});

function ProductForm({ initialValues, categorias, comentarios, onSubmit, submitText, onClose, isEditMode = false }) {    return (
        <Formik
            initialValues={initialValues}
            validationSchema={ProductSchema}
            onSubmit={async (values, { setSubmitting }) => {
                await onSubmit(values); // Llama a la función (agregar o editar)
                setSubmitting(false);
                onClose(); // Cierra el modal
            }}
            enableReinitialize
        >
            {({ isSubmitting }) => (
                <Form className="space-y-4">
                    
                    <div>
                        <label htmlFor="nombre" className="block text-slate-400 mb-2">Nombre</label>
                        <Field type="text" name="nombre" autoComplete="off" className="w-full bg-slate-700 text-white p-2 rounded border border-slate-600" />
                        <ErrorMessage name="nombre" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                        <label htmlFor="categoria_id" className="block text-slate-400 mb-2">Categoría</label>
                        <Field as="select" name="categoria_id" className="w-full bg-slate-700 text-white p-2 rounded border border-slate-600">
                            <option value="">Selecciona una categoría</option>
                            {categorias?.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                            ))}
                        </Field>
                        <ErrorMessage name="categoria_id" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="precio" className="block text-slate-400 mb-2">Precio</label>
                            <Field type="number" name="precio" min="0" className="w-full bg-slate-700 text-white p-2 rounded border border-slate-600" />
                            <ErrorMessage name="precio" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div>
                            <label htmlFor="stock" className="block text-slate-400 mb-2">Stock</label>
                            <Field type="number" name="stock" min="0" className="w-full bg-slate-700 text-white p-2 rounded border border-slate-600" />
                            <ErrorMessage name="stock" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                    </div>
                    
                    { isEditMode && (
                        <div>
                            <label htmlFor="comentario_id" className="block text-slate-400 mb-2">Motivo del ajuste (si el stock cambió)</label>
                            <Field as="select" name="comentario_id" className="w-full bg-slate-700 text-white p-2 rounded border border-slate-600">
                                <option value="">No aplica / No cambió el stock</option>
                                {comentarios?.map(com => (
                                    <option key={com.id} value={com.id}>
                                        {com.comentario}
                                    </option>
                                ))}
                            </Field>
                        </div>
                    )}
                    
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="text-slate-400 hover:text-white font-bold py-2 px-4 rounded">Cancelar</button>
                        <button type="submit" disabled={isSubmitting} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded disabled:bg-slate-500">
                            {isSubmitting ? 'Guardando...' : submitText}
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default ProductForm;