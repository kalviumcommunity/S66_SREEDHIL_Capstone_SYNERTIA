import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Users } from 'lucide-react';
import Login from './components/Login';
import ManagerDashboard from './components/ManagerDashboard';
import EmployeeDashboard from './components/EmployeeDashboard';
import Analytics from './components/Analytics';
import Layout from './components/Layout';
import "./App.css"

function App() {
  return (
    <Router>

        <Routes>
          <Route path="/login" element={<Login />} />
          
          
            <Route element={<Layout />}>
              <Route path="/manager" element={<ManagerDashboard />} />
              <Route path="/employee" element={<EmployeeDashboard />} />
              <Route path="/analytics" element={<Analytics />} />
            </Route>


          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>

    </Router>
  );
}

export default App;