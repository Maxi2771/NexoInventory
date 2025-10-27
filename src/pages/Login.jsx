
import { useNavigate, Navigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useUser } from '../Contexts/UserContext';
import bgLogin from '../assets/img/bg_login.png';

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('El email no es válido')
        .required('El email es obligatorio'),
    password: Yup.string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .required('La contraseña es obligatoria'),
});

function LoginPage() {
    const { login, isAuthenticated } = useUser();
    const navigate = useNavigate();

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return (
        <div 
            className="flex items-center justify-center min-h-screen bg-black bg-cover text-white" style={{ backgroundImage: `url(${bgLogin})` }}
        >
            <div className="w-full max-w-md p-8 space-y-6 rounded-lg shadow-lg transparent bg-white/12">
                <h1 className="text-3xl font-bold text-center">Iniciar Sesión</h1>

                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={LoginSchema} 
                    onSubmit={async (values, { setSubmitting, setStatus }) => {
                        try {
                            await login(values.email, values.password);
                            navigate('/', { replace: true });
                        } catch (error) {
                            setStatus(error.message || 'Email o contraseña incorrectos');
                        }
                        setSubmitting(false);
                    }}
                >
                    {({ isSubmitting, status }) => (
                        <Form className="space-y-6 ">
                            <div>
                                <Field
                                    type="email" 
                                    name="email"   
                                    className="w-full px-3 py-2 mt-1 text-white border-b focus:outline-none focus:ring-2"
                                    placeholder="Email"
                                    autoComplete="off"
                                />
                                <ErrorMessage name="email" component="div" className="mt-1 text-xs text-red-400" />
                            </div>
                            <div>
                                <Field
                                    type="password"
                                    name="password"
                                    className="w-full px-3 py-2 mt-1 text-white border-b focus:outline-none focus:ring-2"
                                    placeholder="Contraseña"
                                    autoComplete="off"
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