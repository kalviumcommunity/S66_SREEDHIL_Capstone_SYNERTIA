import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { UserPlus, Moon, Sun } from 'lucide-react';
import AddEmployeeModal from './AddEmployeeModal';
import ProfileDropdown from './ProfileDropdown';

export default function Layout() {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout, userRole } = useAuth();
    const { isDark, toggleTheme } = useTheme();
    const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);

    const handleEmployeeAdded = () => {
        // Refresh the page or update employee list
        console.log('Employee added successfully');
        // You can add logic to refresh employee list here
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-200">
            <nav className="bg-indigo-600 dark:bg-slate-800 text-white shadow-lg border-b border-indigo-700 dark:border-slate-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <img src="/logo.png" alt="logo" className="w-15 animate-flip invert" />
                            <span className="ml-2 text-xl font-bold">SYNERTIA</span>
                        </div>
                        <style>
                            {`
                              @keyframes flip {
                                0% { transform: rotateY(0deg); }
                                100% { transform: rotateY(360deg); }
                              }
                              .animate-flip {
                                animation: flip 3s linear infinite;
                                transform-style: preserve-3d;
                              }
                            `}
                        </style>
                        <div className="flex items-center space-x-4">
                            {/* Theme Toggle Button */}
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-lg bg-indigo-700 dark:bg-slate-700 hover:bg-indigo-800 dark:hover:bg-slate-600 transition-colors border border-indigo-600 dark:border-slate-600"
                                aria-label="Toggle theme"
                            >
                                {isDark ? (
                                    <Sun className="w-5 h-5 text-yellow-400" />
                                ) : (
                                    <Moon className="w-5 h-5 text-white" />
                                )}
                            </button>
                            
                            {/* Add Employee Button - Only for Managers */}
                            {userRole === 'manager' && (
                                <button
                                    onClick={() => setIsAddEmployeeModalOpen(true)}
                                    className="flex items-center gap-2 bg-green-600 dark:bg-green-700 px-4 py-2 rounded-md hover:bg-green-700 dark:hover:bg-green-800 transition-colors shadow-md"
                                >
                                    <UserPlus className="w-5 h-5" />
                                    <span className="hidden sm:inline">Add Employee</span>
                                </button>
                            )}
                            
                            <button
                                onClick={() => navigate(`/${userRole}`)}
                                className={`px-4 py-2 rounded-md transition-colors ${
                                    location.pathname === `/${userRole}`
                                        ? 'bg-white text-indigo-700 dark:bg-slate-700 dark:text-white'
                                        : 'bg-indigo-700 dark:bg-slate-700 hover:bg-indigo-800 dark:hover:bg-slate-600 transition-colors hover:cursor-pointer'
                                }`}
                            >
                                Dashboard
                            </button>
                            <button
                                onClick={() => navigate('/analytics')}
                                className={`px-4 py-2 rounded-md transition-colors ${
                                    location.pathname === '/analytics'
                                        ? 'bg-white text-indigo-700 dark:bg-slate-700 dark:text-white'
                                        : 'bg-indigo-700 dark:bg-slate-700 hover:bg-indigo-800 dark:hover:bg-slate-600 transition-colors hover:cursor-pointer'
                                }`}
                            >
                                Analytics
                            </button>
                            
                            {/* Profile Dropdown */}
                            <ProfileDropdown />
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>

            {/* Add Employee Modal */}
            <AddEmployeeModal
                isOpen={isAddEmployeeModalOpen}
                onClose={() => setIsAddEmployeeModalOpen(false)}
                onEmployeeAdded={handleEmployeeAdded}
            />
        </div>
    );
}
