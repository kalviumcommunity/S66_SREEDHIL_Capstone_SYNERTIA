import React from 'react';
import { useAuth } from '../context/AuthContext';
import ManagerAnalytics from './analytics/ManagerAnalytics';
import EmployeeAnalytics from './analytics/EmployeeAnalytics';

export default function Analytics() {
    const { userRole } = useAuth();

    return userRole === 'manager' ? <ManagerAnalytics /> : <EmployeeAnalytics />;
}