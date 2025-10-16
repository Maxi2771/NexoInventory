import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ProductSchema = Yup.object().shape({
    Nombre: Yup.string().min(3, 'Muy corto').required('Obligatorio'),
    categoria_id: Yup.number().required('Debes seleccionar una categoría'),
    Precio: Yup.number().positive('Debe ser positivo').required('Obligatorio'),
    Stock: Yup.number().integer('Debe ser entero').min(0, 'No puede ser negativo').required('Obligatorio'),
});

function AddProductModal({ isOpen, onClose, onAddProduct, categorias }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-slate-800 p-6 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-white text-2xl mb-4">Agregar Nuevo Producto</h2>
                <Formik
                    initialValues={{
                        Nombre: '',
                        categoria_id: '',
                        Precio: '',
                        Stock: '',
                    }}
                    validationSchema={ProductSchema}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                        const productData = {
                            ...values,
                            Precio: parseFloat(values.Precio),
                            Stock: parseInt(values.Stock, 10),
                        };
                        await onAddProduct(productData);
                        setSubmitting(false);
                        resetForm();
                        onClose();
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            {/* Campo Nombre */}
                            <div className="mb-4">
                                <label htmlFor="Nombre" className="block text-slate-400 mb-2">Nombre</label>
                                <Field type="text" name="Nombre" className="w-full bg-slate-700 text-white p-2 rounded border border-slate-600" />
                                <ErrorMessage name="Nombre" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Selector de Categoría */}
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

                            {/* Campos Precio y Stock */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div>
                                    <label htmlFor="Precio" className="block text-slate-400 mb-2">Precio</label>
                                    <Field type="number" name="Precio" className="w-full bg-slate-700 text-white p-2 rounded border border-slate-600" />
                                    <ErrorMessage name="Precio" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                                <div>
                                    <label htmlFor="Stock" className="block text-slate-400 mb-2">Stock</label>
                                    <Field type="number" name="Stock" className="w-full bg-slate-700 text-white p-2 rounded border border-slate-600" />
                                    <ErrorMessage name="Stock" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                            </div>

                            {/* Botones */}
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