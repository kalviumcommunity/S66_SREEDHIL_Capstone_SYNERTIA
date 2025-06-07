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
        <div>
            <div>
                <div>
                    <h1>Welcome, John Doe</h1>
                    <p>Software Engineer</p>
                </div>
                <div>
                    <span>Availability Status:</span>
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

            <div>
                <div>
                    <div>
                        <h2>
                            <ListTodo/>
                            Assigned Tasks
                        </h2>
                        <span>{tasks.length} tasks</span>
                    </div>
                    <div>
                        {tasks.map((task) => (
                            <div key={task.id}>
                                <div>
                                    <div>
                                        <h3>{task.title}</h3>
                                        <p>Due: {task.deadline}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm ${task.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                                            task.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                                                'bg-blue-100 text-blue-800'
                                        }`}>
                                        {task.priority}
                                    </span>
                                </div>
                                <div>
                                    <span className={`px-3 py-1 rounded-full text-sm ${task.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                            task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-gray-100 text-gray-800'
                                        }`}>
                                        {task.status}
                                    </span>
                                    <button>
                                        Update Status
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <div>
                        <Calendar/>
                        <h2>Weekly Schedule</h2>
                    </div>
                    <div>
                        {schedule.map((day) => (
                            <div key={day.id}>
                                <span>{day.day}</span>
                                <span>{day.shift}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div>
                <h2>Quick Actions</h2>
                <div>
                    <button>
                        <Clock/>
                        Clock In/Out
                    </button>
                    <button>
                        <CheckCircle2/>
                        Complete Task
                    </button>
                    <button>
                        <AlertCircle />
                        Report Issue
                    </button>
                </div>
            </div>
        </div>
    );
}