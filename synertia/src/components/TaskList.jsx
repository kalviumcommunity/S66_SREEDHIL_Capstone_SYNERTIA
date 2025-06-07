import React from 'react';
import { useTask } from '../context/TaskContext';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export default function TaskList() {
    const { tasks, loading, error, updateTask } = useTask();

    if (loading) {
        return (
            <div>
                <div></div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                {error}
            </div>
        );
    }

    const getPriorityIcon = (priority) => {
        switch (priority) {
            case 'critical':
                return <AlertCircle/>;
            case 'high':
                return <Clock/>;
            default:
                return <CheckCircle2/>;
        }
    };

    return (
        <div>
            {tasks.map((task) => (
                <div
                    key={task.id}
                >
                    <div>
                        <div>
                            {getPriorityIcon(task.priority)}
                            <div>
                                <h3>{task.title}</h3>
                                <p>{task.description}</p>
                            </div>
                        </div>
                        <span
                            className={`${task.status === 'completed'
                                    ? 'bg-green-100 text-green-800'
                                    : task.status === 'in_progress'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-gray-100 text-gray-800'
                                }`}
                        >
                            {task.status}
                        </span>
                    </div>
                    <div>
                        <div>
                            Due: {new Date(task.due_date).toLocaleDateString()}
                        </div>
                        <select
                            value={task.status}
                            onChange={(e) => updateTask(task.id, { status: e.target.value })}
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