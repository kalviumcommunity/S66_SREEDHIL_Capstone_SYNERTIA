import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Users, LayoutDashboard, BarChart2, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout, userRole } = useAuth();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <nav className="bg-indigo-600 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Users className="w-8 h-8" />
                        <span className="ml-2 text-xl font-bold">D-WAS System</span>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Link
                            to={`/${userRole}`}
                            className={`flex items-center px-4 py-2 rounded-md transition-colors ${location.pathname === `/${userRole}`
                                    ? 'bg-indigo-700 text-white'
                                    : 'text-indigo-100 hover:bg-indigo-700'
                                }`}
                        >
                            <LayoutDashboard className="w-5 h-5 mr-2" />
                            Dashboard
                        </Link>

                        <Link
                            to="/analytics"
                            className={`flex items-center px-4 py-2 rounded-md transition-colors ${location.pathname === '/analytics'
                                    ? 'bg-indigo-700 text-white'
                                    : 'text-indigo-100 hover:bg-indigo-700'
                                }`}
                        >
                            <BarChart2 className="w-5 h-5 mr-2" />
                            Analytics
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="flex items-center px-4 py-2 rounded-md bg-indigo-700 hover:bg-indigo-800 transition-colors"
                        >
                            <LogOut className="w-5 h-5 mr-2" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}