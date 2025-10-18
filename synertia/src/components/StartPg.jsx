import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, BarChart3, Shield, Zap, ArrowRight, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { LampContainer } from './ui/lamp';
import { useTheme } from '../context/ThemeContext';

const StartPg = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-200">
      {/* Navbar */}
      <nav className="bg-white dark:bg-slate-900 shadow-lg border-b border-gray-200 dark:border-slate-800 relative z-50 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                <img src="/logo.png" alt="logo" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">SYNERTIA</span>
            </div>
            <div className="flex items-center gap-4">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors border border-gray-300 dark:border-slate-700"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-slate-600" />
                )}
              </button>
              
              <button
                onClick={() => navigate('/register-manager')}
                className="px-6 py-2 text-gray-700 dark:text-slate-300 font-semibold hover:text-cyan-500 dark:hover:text-cyan-400 hover:cursor-pointer transition-colors"
              >
                Register Manager
              </button>
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-colors cursor-pointer shadow-lg shadow-cyan-500/50"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Lamp Hero Section */}
      <LampContainer>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6   ">
            Welcome to <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">SYNERTIA</span>
          </h1>
          <p className="text-2xl md:text-3xl text-slate-300 mb-4">
            Dynamic Workforce Assignment System
          </p>
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Streamline your team management with intelligent task allocation, real-time analytics, and seamless collaboration.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate('/login')}
              className="group relative px-8 py-4 bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-bold text-lg rounded-lg shadow-lg shadow-cyan-500/50 hover:bg-white transition-all duration-300 flex items-center gap-2 overflow-hidden"
            >
              <span className="relative z-10 group-hover:text-cyan-500 transition-colors duration-300">Get Started</span>
              <ArrowRight className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-cyan-500" />
              <span className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </button>
            <button
              onClick={() => navigate('/register-manager')}
              className="px-8 py-4 bg-transparent border-2 border-cyan-500 text-cyan-400 font-bold text-lg rounded-lg hover:bg-cyan-500/10 transition-all duration-300"
            >
              Register as Manager
            </button>
          </div>
        </motion.div>
      </LampContainer>

      {/* Features Section */}
      <div className="bg-white dark:bg-slate-950 py-20 -mt-40 relative z-10 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20 transition-all border border-gray-200 dark:border-slate-800"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Team Management</h3>
              <p className="text-gray-600 dark:text-slate-400">Easily manage employees and assign tasks</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all border border-gray-200 dark:border-slate-800"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Analytics</h3>
              <p className="text-gray-600 dark:text-slate-400">Track performance with real-time insights</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-xl hover:shadow-2xl hover:shadow-pink-500/20 transition-all border border-gray-200 dark:border-slate-800"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-500 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Secure Access</h3>
              <p className="text-gray-600 dark:text-slate-400">Role-based authentication & authorization</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-xl hover:shadow-2xl hover:shadow-yellow-500/20 transition-all border border-gray-200 dark:border-slate-800"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Fast & Easy</h3>
              <p className="text-gray-600 dark:text-slate-400">Login with username or Google OAuth</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-100 dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 py-4 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-600 dark:text-slate-400">
            © 2025 SYNERTIA. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StartPg;
