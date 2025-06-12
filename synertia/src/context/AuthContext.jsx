import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext({
    isAuthenticated: false,
    userRole: null,
    login: () => { },
    logout: () => { },
});

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();

    const login = (role) => {
        setIsAuthenticated(true);
        setUserRole(role);
        navigate(`/${role}`);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserRole(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);