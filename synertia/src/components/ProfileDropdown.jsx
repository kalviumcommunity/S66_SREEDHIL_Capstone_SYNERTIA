import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, Settings, Moon, Sun, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const ProfileDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { user, logout } = useAuth();
    const { theme, toggleTheme, isDark } = useTheme();
    const navigate = useNavigate();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
        setIsOpen(false);
    };

    const getInitials = (name) => {
        if (!name) return 'U';
        const names = name.trim().split(' ').filter(n => n.length > 0);

        if (names.length >= 2) {
            // First name first letter + Last name first letter
            return (names[0][0] + names[names.length - 1][0]).toUpperCase();
        } else if (names.length === 1 && names[0].length >= 2) {
            // First two letters of single name
            return names[0].slice(0, 2).toUpperCase();
        } else if (names.length === 1) {
            // Single letter if name is one character
            return names[0][0].toUpperCase();
        }
        return 'U';
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Profile Button - Circular Avatar Only */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 hover:from-indigo-600 hover:to-purple-700 dark:hover:from-indigo-700 dark:hover:to-purple-800 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
                aria-label="Open profile menu"
            >
                {/* Avatar with Initials */}
                <span className="text-white font-bold text-sm">
                    {getInitials(user?.name)}
                </span>

                {/* Online indicator */}
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white dark:border-slate-800 rounded-full"></span>
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-gray-200 dark:border-slate-700 overflow-hidden z-50"
                    >
                        {/* User Info Header */}
                        <div className="px-4 py-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 border-b border-gray-200 dark:border-slate-700">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                                    {getInitials(user?.name)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-gray-900 dark:text-white truncate">
                                        {user?.name || 'User'}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-slate-400 truncate">
                                        {user?.email || 'user@example.com'}
                                    </p>
                                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium uppercase">
                                        {user?.role || 'User'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Menu Items */}
                        <div className="py-2">
                            {/* Profile */}
                            <button
                                onClick={() => {
                                    navigate('/profile');
                                    setIsOpen(false);
                                }}
                                className="w-full px-4 py-3 flex items-center gap-3 text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                            >
                                <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                <span className="font-medium">View Profile</span>
                            </button>

                            {/* Settings */}
                            <button
                                onClick={() => {
                                    navigate('/settings');
                                    setIsOpen(false);
                                }}
                                className="w-full px-4 py-3 flex items-center gap-3 text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                            >
                                <Settings className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                <span className="font-medium">Settings</span>
                            </button>

                            {/* Theme Toggle */}
                            <button
                                onClick={() => {
                                    toggleTheme();
                                    // Don't close dropdown on theme toggle
                                }}
                                className="w-full px-4 py-3 flex items-center gap-3 text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                            >
                                {isDark ? (
                                    <>
                                        <Sun className="w-5 h-5 text-yellow-500" />
                                        <span className="font-medium">Light Mode</span>
                                    </>
                                ) : (
                                    <>
                                        <Moon className="w-5 h-5 text-indigo-600" />
                                        <span className="font-medium">Dark Mode</span>
                                    </>
                                )}
                            </button>

                            {/* Divider */}
                            <div className="my-2 border-t border-gray-200 dark:border-slate-700"></div>

                            {/* Logout */}
                            <button
                                onClick={handleLogout}
                                className="w-full px-4 py-3 flex items-center gap-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                            >
                                <LogOut className="w-5 h-5" />
                                <span className="font-medium">Logout</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProfileDropdown;
