import { useSelector } from 'react-redux';
import { useLocation, Outlet, Navigate } from 'react-router-dom';

const RequiredAuth = () => {
  const { auth } = useSelector((state) => state);
  const location = useLocation();

  return auth?.token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequiredAuth;
