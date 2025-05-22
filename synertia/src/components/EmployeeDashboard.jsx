import React, { useState } from 'react';
import { CheckCircle2, Clock, AlertCircle, Calendar, ToggleLeft as Toggle, ListTodo } from 'lucide-react';

export default function EmployeeDashboard() {
    const [isAvailable, setIsAvailable] = useState(true);

    const tasks = [
        { id: 1, title: 'Code Review', deadline: '2024-03-20', priority: 'High', status: 'In Progress' },
        { id: 2, title: 'Feature Implementation', deadline: '2024-03-25', priority: 'Medium', status: 'Pending' },
        { id: 3, title: 'Bug Fix', deadline: '2024-03-18', priority: 'Critical', status: 'Completed' },
    ];

    const schedule = [
        { id: 1, day: 'Monday', shift: '9:00 AM - 5:00 PM' },
        { id: 2, day: 'Tuesday', shift: '9:00 AM - 5:00 PM' },
        { id: 3, day: 'Wednesday', shift: '9:00 AM - 5:00 PM' },
        { id: 4, day: 'Thursday', shift: '9:00 AM - 5:00 PM' },
        { id: 5, day: 'Friday', shift: '9:00 AM - 5:00 PM' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-lg">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Welcome, John Doe</h1>
                    <p className="text-gray-600">Software Engineer</p>
                </div>
                <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">Availability Status:</span>
                    <button
                        onClick={() => setIsAvailable(!isAvailable)}
                        className={`px-4 py-2 rounded-full flex items-center ${isAvailable
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                    >
                        <div className={`w-3 h-3 rounded-full mr-2 ${isAvailable ? 'bg-green-500' : 'bg-red-500'
                            }`} />
                        {isAvailable ? 'Available' : 'Busy'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold flex items-center">
                            <ListTodo className="w-6 h-6 mr-2 text-indigo-600" />
                            Assigned Tasks
                        </h2>
                        <span className="text-sm text-gray-500">{tasks.length} tasks</span>
                    </div>
                    <div className="space-y-4">
                        {tasks.map((task) => (
                            <div key={task.id} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{task.title}</h3>
                                        <p className="text-sm text-gray-500">Due: {task.deadline}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm ${task.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                                            task.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                                                'bg-blue-100 text-blue-800'
                                        }`}>
                                        {task.priority}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center mt-4">
                                    <span className={`px-3 py-1 rounded-full text-sm ${task.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                            task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-gray-100 text-gray-800'
                                        }`}>
                                        {task.status}
                                    </span>
                                    <button className="text-sm text-indigo-600 hover:text-indigo-800">
                                        Update Status
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex items-center mb-6">
                        <Calendar className="w-6 h-6 mr-2 text-indigo-600" />
                        <h2 className="text-xl font-bold">Weekly Schedule</h2>
                    </div>
                    <div className="space-y-4">
                        {schedule.map((day) => (
                            <div key={day.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <span className="font-semibold text-gray-700">{day.day}</span>
                                <span className="text-gray-600">{day.shift}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="flex items-center justify-center p-4 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200">
                        <Clock className="w-5 h-5 mr-2" />
                        Clock In/Out
                    </button>
                    <button className="flex items-center justify-center p-4 bg-green-100 text-green-700 rounded-lg hover:bg-green-200">
                        <CheckCircle2 className="w-5 h-5 mr-2" />
                        Complete Task
                    </button>
                    <button className="flex items-center justify-center p-4 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200">
                        <AlertCircle className="w-5 h-5 mr-2" />
                        Report Issue
                    </button>
                </div>
            </div>
        </div>
    );
}