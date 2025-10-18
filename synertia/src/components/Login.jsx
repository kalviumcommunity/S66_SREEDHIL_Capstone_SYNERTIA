import React, { useState } from 'react';
import { UserCircle, Lock, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import jwtDecode from "jwt-decode";
import api from '../utils/api';
import OTPModal from './OTPModal';

// Bottom Gradient Component for Buttons
const BottomGradient = () => {
    return (
        <>
            <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
            <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
        </>
    );
};

export default function Login() {
    const [role, setRole] = useState('employee');
    const [username, setUsername] = useState(''); // This is the user's NAME
    const [password, setPassword] = useState(''); // This is the user's EMAIL
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showOTPModal, setShowOTPModal] = useState(false);
    const [pendingUserData, setPendingUserData] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        googleLogout();
        // Additional logout logic if needed
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Call backend API for login (credential validation)
            const response = await api.post('/auth/login', {
                username, // User's NAME
                password  // User's EMAIL
            });

            const { requireOTP, user } = response.data;
            
            // Check if user role matches selected role
            if (user.role !== role) {
                setError(`This account is registered as ${user.role}, not ${role}`);
                setLoading(false);
                return;
            }

            // If OTP is required, show OTP modal
            if (requireOTP) {
                setPendingUserData(user);
                setShowOTPModal(true);
            }
            
        } catch (err) {
            console.error('Login error:', err);
            setError(err.response?.data?.error || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleOTPVerified = async (userId) => {
        try {
            setLoading(true);
            
            // Complete login after OTP verification
            const response = await api.post('/auth/complete-login', { userId });
            
            const { accessToken, refreshToken, user } = response.data;
            
            // Call login from context
            login(user, accessToken, refreshToken);
            
            setShowOTPModal(false);
        } catch (err) {
            console.error('Complete login error:', err);
            setError(err.response?.data?.error || 'Failed to complete login');
            setShowOTPModal(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 px-4 sm:px-6 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob top-0 -left-4"></div>
                <div className="absolute w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 top-0 -right-4"></div>
                <div className="absolute w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 bottom-0 left-20"></div>
            </div>

            {/* Floating Particles */}
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
                  
                  @keyframes blob {
                    0%, 100% {
                      transform: translate(0, 0) scale(1);
                    }
                    33% {
                      transform: translate(30px, -50px) scale(1.1);
                    }
                    66% {
                      transform: translate(-20px, 20px) scale(0.9);
                    }
                  }
                  
                  .animate-blob {
                    animation: blob 7s infinite;
                  }
                  
                  .animation-delay-2000 {
                    animation-delay: 2s;
                  }
                  
                  .animation-delay-4000 {
                    animation-delay: 4s;
                  }
                  
                  @keyframes float {
                    0%, 100% {
                      transform: translateY(0px);
                    }
                    50% {
                      transform: translateY(-20px);
                    }
                  }
                  
                  .animate-float {
                    animation: float 3s ease-in-out infinite;
                  }
                `}
            </style>

            <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl w-full max-w-md p-6 sm:p-8 flex flex-col justify-center items-center shadow-2xl relative z-10 animate-float">
                <div className="flex flex-col items-center text-center mb-6">
                    <img src="/logo-transparent-png.png" alt="logo" className="w-20 animate-flip" />
                    <h1 className="font-bold text-xl sm:text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Welcome to SYNERTIA</h1>
                    <p className="font-bold text-gray-700 text-sm sm:text-base">Dynamic Workforce Assignment System</p>
                </div>

                <form
                    className="w-full space-y-4"
                    onSubmit={handleFormSubmit}
                >
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="font-medium">Your Name</label>
                        <div className="flex items-center mt-1">
                            <UserCircle className="w-5 h-auto mr-2" />
                            <input
                                type="text"
                                className="w-full border-2 border-gray-300 rounded px-2 py-1"
                                placeholder="Enter your full name"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="font-medium">Your Email</label>
                        <div className="flex items-center mt-1">
                            <Lock className="w-5 h-auto mr-2" />
                            <input
                                type="email"
                                className="w-full border-2 border-gray-300 rounded px-2 py-1"
                                placeholder="Enter your email"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                        className="group/btn relative w-full h-12 bg-gradient-to-br from-blue-900 to-indigo-900 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Sign in'}
                        <BottomGradient />
                    </button>
                </form>
                <div className="mt-4">
                    <GoogleLogin
                        onSuccess={async (credentialResponse) => {
                            try {
                                const decoded = jwtDecode(credentialResponse.credential);
                                console.log("Decoded user:", decoded);

                                // Send to backend for proper authentication
                                const response = await api.post('/auth/google', {
                                    googleId: decoded.sub,
                                    email: decoded.email,
                                    name: decoded.name,
                                    role: role // Use selected role from dropdown
                                });

                                const { requireOTP, user } = response.data;
                                
                                // If OTP is required, show OTP modal
                                if (requireOTP) {
                                    setPendingUserData(user);
                                    setShowOTPModal(true);
                                }
                            } catch (err) {
                                console.error('Google login error:', err);
                                setError(err.response?.data?.error || 'Google login failed. Please try again.');
                            }
                        }}
                        onError={() => {
                            console.log("Login Failed");
                            setError('Google login failed. Please try again.');
                        }}
                    />
                </div>

                {/* OTP Modal */}
                <OTPModal
                    isOpen={showOTPModal}
                    onClose={() => setShowOTPModal(false)}
                    userData={pendingUserData}
                    onOTPVerified={handleOTPVerified}
                />
            </div>
        </div>
    );
}
