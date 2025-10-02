import { useNavigate, Navigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useUser } from '../Contexts/UserContext';

const LoginSchema = Yup.object().shape({
    usuario: Yup.string()
        .min(3, 'El usuario debe tener al menos 3 caracteres')
        .required('El usuario es obligatorio'),
    password: Yup.string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .required('La contraseña es obligatoria'),
});

function LoginPage() {
    const { authenticate, isAuthenticated } = useUser();
    const navigate = useNavigate();

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-[url(src/assets/img/bg_login.png)] bg-black bg-cover text-white">
            <div className="w-full max-w-md p-8 space-y-6 rounded-lg shadow-lg transparent bg-white/12">
                <h1 className="text-3xl font-bold text-center">Iniciar Sesión</h1>

                <Formik
                    initialValues={{ usuario: '', password: '' }}
                    validationSchema={LoginSchema}
                    onSubmit={(values, { setSubmitting, setStatus }) => {
                        // Autenticación cliente contra el usuario de prueba
                        const ok = authenticate(values);
                        if (ok) {
                            navigate('/', { replace: true });
                        } else {
                            setStatus('Usuario o contraseña incorrectos');
                        }
                        setSubmitting(false);
                    }}
                >
                    {({ isSubmitting, status }) => (
                        <Form className="space-y-6 ">
                            <div>
                                <Field
                                    type="text"
                                    name="usuario"
                                    className="w-full px-3 py-2 mt-1 text-white border-b focus:outline-none focus:ring-2"
                                    placeholder="Usuario"
                                />
                                <ErrorMessage name="usuario" component="div" className="mt-1 text-xs text-red-400" />
                            </div>
                            <div>
                                <Field
                                    type="password"
                                    name="password"
                                    className="w-full px-3 py-2 mt-1 text-white border-b focus:outline-none focus:ring-2"
                                    placeholder="Contraseña"
                                />
                                <ErrorMessage name="password" component="div" className="mt-1 text-xs text-red-400" />
                            </div>

                            {status && (
                                <div className="text-sm text-red-400">{status}</div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-2 px-4 font-semibold text-white border rounded-md border-white disabled:bg-gray-500 hover:bg-white hover:text-purple-600 transition-colors cursor-pointer"
                            >
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
