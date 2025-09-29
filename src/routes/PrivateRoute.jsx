import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUser } from '../Contexts/UserContext';

function PrivateRoute() {
  const { isAuthenticated } = useUser();
  const location = useLocation();

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to="/login" replace state={{ from: location }} />;
}

export default PrivateRoute;
