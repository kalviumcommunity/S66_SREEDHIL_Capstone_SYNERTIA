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
        <div>
            <div>
                <div>
                    <Users/>
                    <h3>Total Employees</h3>
                    <p>12</p>
                </div>
                <div>
                    <CheckCircle2/>
                    <h3>Completed Tasks</h3>
                    <p>45</p>
                </div>
                <div>
                    <Clock/>
                    <h3>Ongoing Tasks</h3>
                    <p>8</p>
                </div>
                <div>
                    <AlertCircle/>
                    <h3>Pending Tasks</h3>
                    <p>3</p>
                </div>
            </div>

            <div>
                <div>
                    <h2>Employee Availability</h2>
                    <div>
                        {employees.map((employee) => (
                            <div key={employee.id}>
                                <div>
                                    <h3>{employee.name}</h3>
                                    <p>{employee.tasks} active tasks</p>
                                </div>
                                <span className={`${employee.status === 'Available' ? 'bg-green-100 text-green-800' :
                                        employee.status === 'Busy' ? 'bg-red-100 text-red-800' :
                                            'bg-yellow-100 text-yellow-800'
                                    }`}>
                                    {employee.status}
                                </span>
                            </div>
                        ))}
                    </div>
                    <button>
                        Assign New Task
                    </button>
                </div>

                <div>
                    <h2>Task Progress</h2>
                    <div>
                        {tasks.map((task) => (
                            <div key={task.id}>
                                <div>
                                    <h3>{task.title}</h3>
                                    <span className={`${task.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                                            task.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                                                'bg-blue-100 text-blue-800'
                                        }`}>
                                        {task.priority}
                                    </span>
                                </div>
                                <p>Assigned to: {task.assignee}</p>
                                <div>
                                    <span className={`${task.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                            task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-gray-100 text-gray-800'
                                        }`}>
                                        {task.status}
                                    </span>
                                    <button>
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div>
                <h2>Quick Actions</h2>
                <div>
                    <button>
                        <Users/>
                        Manage Team
                    </button>
                    <button>
                        <CheckCircle2/>
                        Review Tasks
                    </button>
                    <button>
                        <Clock/>
                        Schedule Meeting
                    </button>
                </div>
            </div>
        </div>
    );
}