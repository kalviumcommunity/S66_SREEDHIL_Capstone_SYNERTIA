import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

export default function Layout() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div>
            <nav>
                <div>
                    <div>
                        <div>
                            <img src="logo.png" alt="logo" />
                            <span>SYNERTIA</span>
                        </div>
                        
                        <div>
                            <button
                                onClick={() => navigate(`/${userRole}`)}
                                className={` ${
                                    location.pathname === `/${userRole}`
                                        ? 'bg-white text-blue-700'
                                        : 'bg-white text-indigo-700 hover:bg-indigo-100'
                                }`}
                            >
                                Dashboard
                            </button>
                            <button
                                onClick={() => navigate('/analytics')}
                                className={`${
                                    location.pathname === '/analytics'
                                        ? 'bg-indigo-700 text-white'
                                        : 'text-indigo-100 hover:bg-indigo-700'
                                }`}
                            >
                                Analytics
                            </button>
                            <button
                                onClick={logout}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main>
                <Outlet />
            </main>
        </div>
    );
}
