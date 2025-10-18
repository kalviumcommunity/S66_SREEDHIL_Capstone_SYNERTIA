import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const AuthContext = createContext({
    isAuthenticated: false,
    userRole: null,
    user: null,
    login: () => { },
    logout: () => { },
});

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Check if user is already logged in on mount
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const storedUser = localStorage.getItem('user');
        
        if (token && storedUser) {
            const userData = JSON.parse(storedUser);
            setIsAuthenticated(true);
            setUserRole(userData.role);
            setUser(userData);
            // Set token in axios headers
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        setLoading(false);
    }, []);

    const login = (userData, accessToken, refreshToken) => {
        // Store tokens in localStorage
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Set token in axios headers
        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        
        // Update state
        setIsAuthenticated(true);
        setUserRole(userData.role);
        setUser(userData);
        
        // Navigate based on role
        navigate(`/${userData.role}`);
    };

    const logout = () => {
        // Clear localStorage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        
        // Remove token from axios headers
        delete api.defaults.headers.common['Authorization'];
        
        // Clear state
        setIsAuthenticated(false);
        setUserRole(null);
        setUser(null);
        
        // Navigate to login
        navigate('/login');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, userRole, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);