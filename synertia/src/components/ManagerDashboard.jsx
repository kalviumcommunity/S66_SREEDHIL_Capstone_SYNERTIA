import React from 'react';
import { Users, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export default function ManagerDashboard() {
    const employees = [
        { id: 1, name: 'John Doe', status: 'Available', tasks: 3 },
        { id: 2, name: 'Jane Smith', status: 'Busy', tasks: 5 },
        { id: 3, name: 'Mike Johnson', status: 'Away', tasks: 2 },
    ];

    const tasks = [
        { id: 1, title: 'Website Redesign', assignee: 'John Doe', status: 'In Progress', priority: 'High' },
        { id: 2, title: 'Database Migration', assignee: 'Jane Smith', status: 'Completed', priority: 'Critical' },
        { id: 3, title: 'Bug Fixes', assignee: 'Mike Johnson', status: 'Pending', priority: 'Medium' },
    ];

    return (
        <div className="space-y-6">
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
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Employee Availability</h2>
                    <div className="space-y-4">
                        {employees.map((employee) => (
                            <div key={employee.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <h3 className="font-semibold">{employee.name}</h3>
                                    <p className="text-sm text-gray-500">{employee.tasks} active tasks</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm ${employee.status === 'Available' ? 'bg-green-100 text-green-800' :
                                        employee.status === 'Busy' ? 'bg-red-100 text-red-800' :
                                            'bg-yellow-100 text-yellow-800'
                                    }`}>
                                    {employee.status}
                                </span>
                            </div>
                        ))}
                    </div>
                    <button className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                        Assign New Task
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Task Progress</h2>
                    <div className="space-y-4">
                        {tasks.map((task) => (
                            <div key={task.id} className="p-4 bg-gray-50 rounded-lg">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-semibold">{task.title}</h3>
                                    <span className={`px-3 py-1 rounded-full text-sm ${task.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                                            task.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                                                'bg-blue-100 text-blue-800'
                                        }`}>
                                        {task.priority}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500">Assigned to: {task.assignee}</p>
                                <div className="flex justify-between items-center mt-2">
                                    <span className={`px-3 py-1 rounded-full text-sm ${task.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                            task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-gray-100 text-gray-800'
                                        }`}>
                                        {task.status}
                                    </span>
                                    <button className="text-sm text-indigo-600 hover:text-indigo-800">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="flex items-center justify-center p-4 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200">
                        <Users className="w-5 h-5 mr-2" />
                        Manage Team
                    </button>
                    <button className="flex items-center justify-center p-4 bg-green-100 text-green-700 rounded-lg hover:bg-green-200">
                        <CheckCircle2 className="w-5 h-5 mr-2" />
                        Review Tasks
                    </button>
                    <button className="flex items-center justify-center p-4 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200">
                        <Clock className="w-5 h-5 mr-2" />
                        Schedule Meeting
                    </button>
                </div>
            </div>
        </div>
    );
}