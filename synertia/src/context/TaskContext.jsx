import React, { createContext, useContext, useState, useEffect } from 'react';
import { tasks } from '../utils/api';
import { useAuth } from './AuthContext';

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
    const [taskList, setTaskList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    const refreshTasks = async () => {
        if (!user) return;

        try {
            setLoading(true);
            const data = await tasks.getTasks(user.id);
            setTaskList(data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
        } finally {
            setLoading(false);
        }
    };

    const createTask = async (taskData) => {
        try {
            await tasks.createTask(taskData);
            await refreshTasks();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create task');
            throw err;
        }
    };

    const updateTask = async (taskId, updates) => {
        try {
            await tasks.updateTask(taskId, updates);
            await refreshTasks();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update task');
            throw err;
        }
    };

    useEffect(() => {
        if (user) {
            refreshTasks();
        }
    }, [user]);

    return (
        <TaskContext.Provider
            value={{
                tasks: taskList,
                loading,
                error,
                createTask,
                updateTask,
                refreshTasks,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
}

export const useTask = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTask must be used within a TaskProvider');
    }
    return context;
};