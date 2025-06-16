import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Importe jwt-decode

interface ProtectedRouteProps {
  redirectPath?: string;
}

interface DecodedToken {
  exp: number;
}

const ProtectedRoute = ({ redirectPath = '/tokenExpirado' }: ProtectedRouteProps) => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }

  try {
    const decodedToken = jwtDecode<DecodedToken>(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      localStorage.removeItem('authToken');
      return <Navigate to={redirectPath} replace />;
    }
  } catch (error) {
    localStorage.removeItem('authToken');
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;