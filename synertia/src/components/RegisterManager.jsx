import React, { useState } from 'react';
import { User, Mail, Building, Shield } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
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

export default function RegisterManager() {
    const [authMethod, setAuthMethod] = useState('manual'); // 'manual' or 'oauth'
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        adminCode: '',
        role: 'manager'
    });
    const [oauthAdminCode, setOauthAdminCode] = useState(''); // For OAuth method
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showOTPModal, setShowOTPModal] = useState(false);
    const [pendingUserData, setPendingUserData] = useState(null);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleManualSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Register the manager
            const response = await api.post('/auth/register', formData);
            console.log('Registration response:', response.data);

            // Auto-login after registration
            const loginResponse = await api.post('/auth/login', {
                username: formData.name,
                password: formData.email
            });

            const { requireOTP, user } = loginResponse.data;

            // If OTP is required, show OTP modal
            if (requireOTP) {
                setPendingUserData(user);
                setShowOTPModal(true);
            }
        } catch (err) {
            console.error('Registration error:', err);
            setError(err.response?.data?.error || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        setError('');
        setLoading(true);

        try {
            // Validate admin code before proceeding
            if (!oauthAdminCode || oauthAdminCode.trim() === '') {
                setError('Please enter the admin code before signing in with Google');
                setLoading(false);
                return;
            }

            const decoded = jwtDecode(credentialResponse.credential);
            console.log('Google manager:', decoded);

            // Use the backend Google auth endpoint with admin code
            const response = await api.post('/auth/google', {
                googleId: decoded.sub,
                email: decoded.email,
                name: decoded.name,
                role: 'manager',
                adminCode: oauthAdminCode
            });

            const { requireOTP, user } = response.data;

            // If OTP is required, show OTP modal
            if (requireOTP) {
                setPendingUserData(user);
                setShowOTPModal(true);
            }
        } catch (err) {
            console.error('Google registration error:', err);
            setError(err.response?.data?.error || 'Google registration failed.');
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
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 px-4 sm:px-6 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob top-10 -left-10"></div>
                <div className="absolute w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 top-20 right-10"></div>
                <div className="absolute w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 bottom-20 left-1/2"></div>
            </div>

            {/* CSS Animations */}
            <style>
                {`
                  @keyframes blob {
                    0%, 100% {
                      transform: translate(0, 0) scale(1);
                    }
                    33% {
                      transform: translate(40px, -60px) scale(1.15);
                    }
                    66% {
                      transform: translate(-30px, 30px) scale(0.85);
                    }
                  }
                  
                  .animate-blob {
                    animation: blob 8s infinite;
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
                      transform: translateY(-15px);
                    }
                  }
                  
                  .animate-float {
                    animation: float 4s ease-in-out infinite;
                  }
                `}
            </style>

            <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl w-full max-w-md p-6 sm:p-8 shadow-2xl relative z-10 animate-float">
                <div className="flex flex-col items-center text-center mb-6">
                    <div className="bg-indigo-100 p-4 rounded-full mb-4">
                        <Building className="w-12 h-12 text-indigo-600" />
                    </div>
                    <h1 className="font-bold text-2xl sm:text-3xl text-gray-800">Manager Registration</h1>
                    <p className="text-gray-600 text-sm sm:text-base mt-2">Join SYNERTIA as a Manager</p>
                </div>

                {/* Auth Method Toggle */}
                <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
                    <button
                        onClick={() => setAuthMethod('manual')}
                        className={`flex-1 py-2 px-4 rounded-md transition-colors ${authMethod === 'manual'
                                ? 'bg-white text-indigo-600 shadow-sm font-semibold'
                                : 'text-gray-600 hover:text-gray-800'
                            }`}
                    >
                        Manual Entry
                    </button>
                    <button
                        onClick={() => setAuthMethod('oauth')}
                        className={`flex-1 py-2 px-4 rounded-md transition-colors ${authMethod === 'oauth'
                                ? 'bg-white text-indigo-600 shadow-sm font-semibold'
                                : 'text-gray-600 hover:text-gray-800'
                            }`}
                    >
                        Google OAuth
                    </button>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                {/* Manual Registration Form */}
                {authMethod === 'manual' && (
                    <form onSubmit={handleManualSubmit} className="space-y-4">
                        <div>
                            <label className="font-medium text-gray-700">Username</label>
                            <div className="flex items-center mt-1 border-2 border-gray-300 rounded-lg px-3 py-2">
                                <User className="w-5 h-5 text-gray-400 mr-2" />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="flex-1 outline-none"
                                    placeholder="Enter your full name (this will be your login username)"
                                    required
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                Use your full name - this will be displayed on the dashboard
                            </p>
                        </div>

                        <div>
                            <label className="font-medium text-gray-700">Email</label>
                            <div className="flex items-center mt-1 border-2 border-gray-300 rounded-lg px-3 py-2">
                                <Mail className="w-5 h-5 text-gray-400 mr-2" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="flex-1 outline-none"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>



                        <div>
                            <label className="font-medium text-gray-700">Admin Code *</label>
                            <div className="flex items-center mt-1 border-2 border-red-300 rounded-lg px-3 py-2 bg-red-50">
                                <Shield className="w-5 h-5 text-red-500 mr-2" />
                                <input
                                    type="password"
                                    name="adminCode"
                                    value={formData.adminCode}
                                    onChange={handleInputChange}
                                    className="flex-1 outline-none bg-transparent"
                                    placeholder="Required for manager registration"
                                    required
                                />
                            </div>
                            <p className="text-xs text-red-600 mt-1">
                                Contact CEO/Admin for the authorization code
                            </p>
                        </div>



                        <button
                            type="submit"
                            disabled={loading}
                            className="group/btn relative w-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Registering...' : 'Register as Manager'}
                            <BottomGradient />
                        </button>
                    </form>
                )}

                {/* Google OAuth */}
                {authMethod === 'oauth' && (
                    <div className="space-y-4">
                        <div>
                            <label className="font-medium text-gray-700">Admin Code *</label>
                            <div className="flex items-center mt-1 border-2 border-red-300 rounded-lg px-3 py-2 bg-red-50">
                                <Shield className="w-5 h-5 text-red-500 mr-2" />
                                <input
                                    type="password"
                                    value={oauthAdminCode}
                                    onChange={(e) => setOauthAdminCode(e.target.value)}
                                    className="flex-1 outline-none bg-transparent"
                                    placeholder="Required for manager registration"
                                    required
                                />
                            </div>
                            <p className="text-xs text-red-600 mt-1">
                                Contact CEO/Admin for the authorization code
                            </p>
                        </div>

                        <p className="text-center text-gray-600 mb-4">
                            Enter the admin code above, then register using your Google account
                        </p>
                        <div className="flex justify-center">
                            <GoogleLogin
                                onSuccess={handleGoogleSuccess}
                                onError={() => {
                                    setError('Google authentication failed. Please try again.');
                                }}
                                text="signup_with"
                                size="large"
                            />
                        </div>
                    </div>
                )}

                <div className="mt-6 text-center">
                    <p className="text-gray-600 text-sm">
                        Already have an account?{' '}
                        <button
                            onClick={() => navigate('/login')}
                            className="text-indigo-600 font-semibold hover:text-indigo-800"
                        >
                            Login here
                        </button>
                    </p>
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
