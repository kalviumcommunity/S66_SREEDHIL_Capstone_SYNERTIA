import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Users } from 'lucide-react';
import StartPg from './components/StartPg';
import Login from './components/Login';
import RegisterManager from './components/RegisterManager';
import ManagerDashboard from './components/ManagerDashboard';
import EmployeeDashboard from './components/EmployeeDashboard';
import Analytics from './components/Analytics';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import "./App.css"

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<StartPg />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register-manager" element={<RegisterManager />} />
            
            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route path="/manager" element={<ManagerDashboard />} />
                <Route path="/employee" element={<EmployeeDashboard />} />
                <Route path="/analytics" element={<Analytics />} />
              </Route>
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;