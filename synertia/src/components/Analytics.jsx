import React from 'react';
import ManagerAnalytics from './analytics/ManagerAnalytics';
import EmployeeAnalytics from './analytics/EmployeeAnalytics';

export default function Analytics() {

    return userRole === 'manager' ? <ManagerAnalytics /> : <EmployeeAnalytics />;
}