import React from 'react';
import { useTask } from '../context/TaskContext';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export default function TaskList() {
    const { tasks, loading, error, updateTask } = useTask();

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
            </div>
        );
    }

    const getPriorityIcon = (priority) => {
        switch (priority) {
            case 'critical':
                return <AlertCircle className="w-5 h-5 text-red-500" />;
            case 'high':
                return <Clock className="w-5 h-5 text-orange-500" />;
            default:
                return <CheckCircle2 className="w-5 h-5 text-blue-500" />;
        }
    };

    return (
        <div className="space-y-4">
            {tasks.map((task) => (
                <div
                    key={task.id}
                    className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
                >
                    <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                            {getPriorityIcon(task.priority)}
                            <div>
                                <h3 className="font-semibold text-gray-900">{task.title}</h3>
                                <p className="text-sm text-gray-500">{task.description}</p>
                            </div>
                        </div>
                        <span
                            className={`px-3 py-1 rounded-full text-sm ${task.status === 'completed'
                                    ? 'bg-green-100 text-green-800'
                                    : task.status === 'in_progress'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-gray-100 text-gray-800'
                                }`}
                        >
                            {task.status}
                        </span>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                            Due: {new Date(task.due_date).toLocaleDateString()}
                        </div>
                        <select
                            value={task.status}
                            onChange={(e) => updateTask(task.id, { status: e.target.value })}
                            className="text-sm border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                </div>
            ))}
        </div>
    );
}