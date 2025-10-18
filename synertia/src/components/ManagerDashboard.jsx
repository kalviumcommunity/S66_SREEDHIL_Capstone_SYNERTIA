import React from 'react';
import { Users, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ExpandableCardDemo } from './ui/expandable-cards';

export default function ManagerDashboard() {
    const { user } = useAuth();
    const employees = [
        { id: 1, name: 'John Doe', status: 'Available', tasks: 3 },
        { id: 2, name: 'Jane Smith', status: 'Busy', tasks: 5 },
        { id: 3, name: 'Mike Johnson', status: 'Away', tasks: 2 },
    ];

    const tasks = [
        { 
            id: 1, 
            title: 'Website Redesign', 
            assignee: 'John Doe', 
            status: 'In Progress', 
            priority: 'High',
            description: 'Complete redesign of the company website with modern UI/UX principles.',
            deadline: '2025-11-15',
            progress: '45%',
            details: 'This task involves creating wireframes, mockups, and implementing a responsive design using React and Tailwind CSS. The new website should be mobile-first and include improved navigation, faster load times, and better accessibility features.'
        },
        { 
            id: 2, 
            title: 'Database Migration', 
            assignee: 'Jane Smith', 
            status: 'Completed', 
            priority: 'Critical',
            description: 'Migrate the legacy database to a new cloud-based solution.',
            deadline: '2025-10-30',
            progress: '100%',
            details: 'Successfully migrated all data from the on-premise PostgreSQL database to AWS RDS. Implemented data validation, backup strategies, and ensured zero downtime during migration. All integrity constraints and indexes have been properly transferred.'
        },
        { 
            id: 3, 
            title: 'Bug Fixes', 
            assignee: 'Mike Johnson', 
            status: 'Pending', 
            priority: 'Medium',
            description: 'Fix critical bugs reported by users in the latest release.',
            deadline: '2025-11-01',
            progress: '0%',
            details: 'Address 15 reported bugs including login issues, broken navigation links, incorrect calculations in reports, and UI rendering problems on mobile devices. Priority should be given to bugs affecting payment processing.'
        },
    ];

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg mb-6 transition-colors duration-200">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome, {user?.name || 'Manager'}</h1>
                <p className="text-gray-600 dark:text-slate-400">Manager Dashboard</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg">
                    <Users className="w-8 h-8 mb-2" />
                    <h3 className="text-lg font-semibold">Total Employees</h3>
                    <p className="text-2xl font-bold">12</p>
                </div>
                <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg">
                    <CheckCircle2 className="w-8 h-8 mb-2" />
                    <h3 className="text-lg font-semibold">Completed Tasks</h3>
                    <p className="text-2xl font-bold">45</p>
                </div>
                <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-lg">
                    <Clock className="w-8 h-8 mb-2" />
                    <h3 className="text-lg font-semibold">Ongoing Tasks</h3>
                    <p className="text-2xl font-bold">8</p>
                </div>
                <div className="bg-red-500 text-white p-6 rounded-lg shadow-lg">
                    <AlertCircle className="w-8 h-8 mb-2" />
                    <h3 className="text-lg font-semibold">Pending Tasks</h3>
                    <p className="text-2xl font-bold">3</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 transition-colors duration-200">
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Employee Availability</h2>
                    <div className="space-y-4">
                        {employees.map((employee) => (
                            <div key={employee.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-lg transition-colors duration-200">
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white">{employee.name}</h3>
                                    <p className="text-sm text-gray-500 dark:text-slate-400">{employee.tasks} active tasks</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm ${
                                    employee.status === 'Available' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' :
                                    employee.status === 'Busy' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400' :
                                    'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400'
                                }`}>
                                    {employee.status}
                                </span>
                            </div>
                        ))}
                    </div>
                    <button className="mt-4 w-full bg-indigo-600 dark:bg-indigo-700 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-800 transition-colors">
                        Assign New Task
                    </button>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 transition-colors duration-200">
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Task Progress</h2>
                    <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 transition-colors duration-200">
                        <ExpandableCardDemo tasks={tasks} />
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 transition-colors duration-200">
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="flex items-center justify-center p-4 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors">
                        <Users className="w-5 h-5 mr-2" />
                        Manage Team
                    </button>
                    <button className="flex items-center justify-center p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors">
                        <CheckCircle2 className="w-5 h-5 mr-2" />
                        Review Tasks
                    </button>
                    <button className="flex items-center justify-center p-4 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-900/50 transition-colors">
                        <Clock className="w-5 h-5 mr-2" />
                        Schedule Meeting
                    </button>
                </div>
            </div>
        </div>
    );
}