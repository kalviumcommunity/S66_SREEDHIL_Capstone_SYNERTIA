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
        <nav>
            <div>
                <div>
                    <div>
                        <Users/>
                        <span>D-WAS System</span>
                    </div>

                    <div>
                        <Link
                            to={`/${userRole}`}
                            className={`${location.pathname === `/${userRole}`
                                    ? 'bg-indigo-700 text-white'
                                    : 'text-indigo-100 hover:bg-indigo-700'
                                }`}
                        >
                            <LayoutDashboard/>
                            Dashboard
                        </Link>

                        <Link
                            to="/analytics"
                            className={`${location.pathname === '/analytics'
                                    ? 'bg-indigo-700 text-white'
                                    : 'text-indigo-100 hover:bg-indigo-700'
                                }`}
                        >
                            <BarChart2/>
                            Analytics
                        </Link>

                        <button
                            onClick={handleLogout}
                        >
                            <LogOut/>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}