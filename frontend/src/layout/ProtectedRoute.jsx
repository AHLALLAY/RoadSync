import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated, getUser } from '../utils/authUtils';

const ProtectedRoute = ({ allowedRoles }) => {
    const user = getUser();

    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
