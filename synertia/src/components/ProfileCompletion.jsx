import React, { useState } from 'react';
import { User, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

export default function ProfileCompletion() {
    const { user, login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: user?.name || '',
        gender: '',
        dateOfBirth: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await api.post('/auth/complete-profile', formData);
            const { user: updatedUser } = response.data;
            
            // Update user in context with new profile data
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');
            login(updatedUser, accessToken, refreshToken);
            
            // Navigate to appropriate dashboard
            navigate(`/${user.role}`);
        } catch (err) {
            console.error('Profile completion error:', err);
            setError(err.response?.data?.error || 'Failed to complete profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4">
            <div className="bg-white bg-opacity-95 rounded-2xl w-full max-w-md p-8 shadow-2xl">
                <div className="flex flex-col items-center text-center mb-6">
                    <div className="bg-indigo-100 p-4 rounded-full mb-4">
                        <User className="w-12 h-12 text-indigo-600" />
                    </div>
                    <h1 className="font-bold text-3xl text-gray-800">Complete Your Profile</h1>
                    <p className="text-gray-600 mt-2">Just a few more details to get started</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="font-medium text-gray-700">Full Name *</label>
                        <div className="flex items-center mt-1 border-2 border-gray-300 rounded-lg px-3 py-2">
                            <User className="w-5 h-5 text-gray-400 mr-2" />
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="flex-1 outline-none"
                                placeholder="Enter your full name"
                                required
                            />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            This name will be used as your username for manual login
                        </p>
                    </div>

                    <div>
                        <label className="font-medium text-gray-700">Gender *</label>
                        <div className="flex items-center mt-1 border-2 border-gray-300 rounded-lg px-3 py-2">
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                className="flex-1 outline-none bg-transparent"
                                required
                            >
                                <option value="">Select your gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="font-medium text-gray-700">Date of Birth *</label>
                        <div className="flex items-center mt-1 border-2 border-gray-300 rounded-lg px-3 py-2">
                            <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                            <input
                                type="date"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleInputChange}
                                className="flex-1 outline-none"
                                required
                                max={new Date().toISOString().split('T')[0]}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed mt-6"
                    >
                        {loading ? 'Saving Profile...' : 'Complete Profile'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500">
                        Welcome, {user?.email}! <br />
                        Complete your profile to access your {user?.role} dashboard.
                    </p>
                </div>
            </div>
        </div>
    );
}
