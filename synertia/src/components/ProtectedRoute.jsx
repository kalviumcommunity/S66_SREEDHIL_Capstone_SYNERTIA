    import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ requiredRole }) {
    const { isAuthenticated, userRole } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Check if user has the required role (if specified)
    if (requiredRole && userRole !== requiredRole) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}