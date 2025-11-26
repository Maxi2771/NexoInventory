import { useNavigate, Navigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useUser } from '../Contexts/UserContext';
import bgLogin from '../assets/img/bg_login.png';

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('El email no es válido').required('Obligatorio'),
    password: Yup.string().min(6, 'Mínimo 6 caracteres').required('Obligatorio'),
});

function LoginPage() {
    const { login, isAuthenticated } = useUser();
    const navigate = useNavigate();

    if (isAuthenticated) return <Navigate to="/" replace />;

    return (
        <div className="flex items-center justify-center min-h-screen bg-black bg-cover bg-center text-white px-4" style={{ backgroundImage: `url(${bgLogin})` }}>
            <div className="w-full max-w-md p-6 md:p-8 space-y-6 rounded-xl shadow-2xl bg-white/5 transparent backdrop-blur-sm border border-gray-700">
                <h1 className="text-3xl font-bold text-center">Nexo Inventory</h1>
                <p className="text-center text-gray-300">Por favor, ingresa tus credenciales para continuar</p>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={LoginSchema}
                    onSubmit={async (values, { setSubmitting, setStatus }) => {
                        try {
                            await login(values.email, values.password);
                            navigate('/', { replace: true });
                        } catch (error) {
                            setStatus(error.message || 'Error de credenciales');
                        }
                        setSubmitting(false);
                    }}
                >
                    {({ isSubmitting, status }) => (
                        <Form className="space-y-4">
                            <div>
                                <Field type="email" name="email" className="w-full px-4 py-3 rounded-lg bg-white/3 transparent border border-gray-600 text-white focus:ring-2 focus:ring-purple-500 outline-none" placeholder="Email" autoComplete="off" />
                                <ErrorMessage name="email" component="div" className="mt-1 text-xs text-red-400" />
                            </div>
                            <div>
                                <Field type="password" name="password" className="w-full px-4 py-3 rounded-lg bg-white/3 transparent border border-gray-600 text-white focus:ring-2 focus:ring-purple-500 outline-none" placeholder="Contraseña" autoComplete="off" />
                                <ErrorMessage name="password" component="div" className="mt-1 text-xs text-red-400" />
                            </div>
                            {status && <div className="text-sm text-red-400 text-center">{status}</div>}
                            <button type="submit" disabled={isSubmitting} className="w-full py-3 font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition disabled:bg-gray-600">
                                {isSubmitting ? 'Ingresando...' : 'Ingresar'}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
export default LoginPage;