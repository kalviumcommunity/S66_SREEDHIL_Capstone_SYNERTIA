import React, { useState } from 'react';
import { X, UserPlus, Mail, User } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import api from '../utils/api';

export default function AddEmployeeModal({ isOpen, onClose, onEmployeeAdded }) {
    const [authMethod, setAuthMethod] = useState('manual'); // 'manual' or 'oauth'
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'employee'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleManualSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const response = await api.post('/auth/register', formData);
            setSuccess('Employee added successfully!');
            setTimeout(() => {
                onEmployeeAdded?.();
                handleClose();
            }, 1500);
        } catch (err) {
            console.error('Registration error:', err);
            setError(err.response?.data?.error || 'Failed to add employee');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const decoded = jwtDecode(credentialResponse.credential);
            console.log('Google user:', decoded);

            // Use the backend Google auth endpoint to register employee
            const response = await api.post('/auth/google', {
                googleId: decoded.sub,
                email: decoded.email,
                name: decoded.name,
                role: 'employee'
            });

            setSuccess('Employee added successfully via Google!');
            setTimeout(() => {
                onEmployeeAdded?.();
                handleClose();
            }, 1500);
        } catch (err) {
            console.error('Google registration error:', err);
            setError(err.response?.data?.error || 'Failed to add employee via Google');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setFormData({
            name: '',
            email: '',
            role: 'employee'
        });
        setError('');
        setSuccess('');
        setAuthMethod('manual');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
                    <div className="flex items-center gap-2">
                        <UserPlus className="w-6 h-6 text-indigo-600" />
                        <h2 className="text-2xl font-bold text-gray-800">Add Employee</h2>
                    </div>
                    <button
                        onClick={handleClose}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Auth Method Toggle */}
                    <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
                        <button
                            onClick={() => setAuthMethod('manual')}
                            className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                                authMethod === 'manual'
                                    ? 'bg-white text-indigo-600 shadow-sm font-semibold'
                                    : 'text-gray-600 hover:text-gray-800'
                            }`}
                        >
                            Manual Entry
                        </button>
                        <button
                            onClick={() => setAuthMethod('oauth')}
                            className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                                authMethod === 'oauth'
                                    ? 'bg-white text-indigo-600 shadow-sm font-semibold'
                                    : 'text-gray-600 hover:text-gray-800'
                            }`}
                        >
                            Google OAuth
                        </button>
                    </div>

                    {/* Error/Success Messages */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                            {success}
                        </div>
                    )}

                    {/* Manual Form */}
                    {authMethod === 'manual' && (
                        <form onSubmit={handleManualSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name *
                                </label>
                                <div className="flex items-center border-2 border-gray-300 rounded-lg px-3 py-2">
                                    <User className="w-5 h-5 text-gray-400 mr-2" />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="flex-1 outline-none"
                                        placeholder="Enter employee's full name"
                                        required
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    This will be used as their login username
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email *
                                </label>
                                <div className="flex items-center border-2 border-gray-300 rounded-lg px-3 py-2">
                                    <Mail className="w-5 h-5 text-gray-400 mr-2" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="flex-1 outline-none"
                                        placeholder="employee@example.com"
                                        required
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    This will be used as their login password
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Adding Employee...' : 'Add Employee'}
                            </button>
                        </form>
                    )}

                    {/* OAuth Option */}
                    {authMethod === 'oauth' && (
                        <div className="space-y-4">
                            <p className="text-center text-gray-600 mb-4">
                                Click below to add employee using their Google account
                            </p>
                            <div className="flex justify-center">
                                <GoogleLogin
                                    onSuccess={handleGoogleSuccess}
                                    onError={() => {
                                        setError('Google authentication failed');
                                    }}
                                    text="signup_with"
                                    size="large"
                                />
                            </div>
                            <p className="text-sm text-gray-500 text-center mt-4">
                                The employee will be able to login using Google OAuth
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
