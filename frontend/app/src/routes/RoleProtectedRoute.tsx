import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';



const RoleProtectedRoute = ({ role }: { role: string }) => {
  const token = localStorage.getItem('token');

  if (!token) return <Navigate to="/" />;

  try {
    const decoded: any = jwtDecode(token);
    if (decoded.role === role) {
      return <Outlet />;
    } else {
      return <Navigate to="/" />;
    }
  } catch {
    return <Navigate to="/" />;
  }
};

export default RoleProtectedRoute;
