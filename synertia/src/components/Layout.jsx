import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

export default function Layout() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-indigo-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <img src="logo.png" alt="logo" className="w-15 animate-flip invert" />
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
                            <button
                                onClick={() => navigate(`/${userRole}`)}
                                className={`px-4 py-2 rounded-md transition-colors ${
                                    location.pathname === `/${userRole}`
                                        ? 'bg-white text-blue-700'
                                        : 'bg-white text-indigo-700 hover:bg-indigo-100'
                                }`}
                            >
                                Dashboard
                            </button>
                            <button
                                onClick={() => navigate('/analytics')}
                                className={`px-4 py-2 rounded-md transition-colors ${
                                    location.pathname === '/analytics'
                                        ? 'bg-indigo-700 text-white'
                                        : 'text-indigo-100 hover:bg-indigo-700'
                                }`}
                            >
                                Analytics
                            </button>
                            <button
                                onClick={logout}
                                className="bg-indigo-700 px-4 py-2 rounded-md hover:bg-indigo-800 transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>
        </div>
    );
}
