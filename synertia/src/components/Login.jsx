import React, { useState } from 'react';
import { UserCircle, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const [role, setRole] = useState('employee');
    const { login } = useAuth();

    return (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat px-4 sm:px-6" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" }}>
            <div className="bg-white bg-opacity-90 rounded-2xl w-full max-w-md p-6 sm:p-8 flex flex-col justify-center items-center">
                <div className="flex flex-col items-center text-center mb-6">
                    <img src="logo-transparent-png.png" alt="logo" className="w-20 animate-flip" />
                    <h1 className="font-bold text-xl sm:text-2xl">Welcome to SYNERTIA</h1>
                    <p className="font-bold text-blue-900 text-sm sm:text-base">Dynamic Workforce Assignment System</p>
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

                <form
                    className="w-full space-y-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        login(role);
                    }}
                >
                    <div>
                        <label className="font-medium">Username</label>
                        <div className="flex items-center mt-1">
                            <UserCircle className="w-5 h-auto mr-2" />
                            <input
                                type="text"
                                className="w-full border-2 border-gray-300 rounded px-2 py-1"
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="font-medium">Password</label>
                        <div className="flex items-center mt-1">
                            <Lock className="w-5 h-auto mr-2" />
                            <input
                                type="password"
                                className="w-full border-2 border-gray-300 rounded px-2 py-1"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="font-medium pr-2">Role</label>
                        <select
                            className="w-full border border-gray-300 rounded px-2 py-1 text-sm appearance-none bg-transparent focus:outline-none"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="employee">Employee</option>
                            <option value="manager">Manager</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full h-10 bg-blue-900 text-white rounded hover:capitalize hover:cursor-pointer"
                    >
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    );
}
