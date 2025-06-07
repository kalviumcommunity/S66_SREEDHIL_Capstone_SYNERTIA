import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';
import { Clock, TrendingUp, Award, CheckCircle2 } from 'lucide-react';

export default function EmployeeAnalytics() {
    const personalPerformanceData = [
        { week: 'Week 1', completed: 8, efficiency: 85 },
        { week: 'Week 2', completed: 12, efficiency: 90 },
        { week: 'Week 3', completed: 10, efficiency: 88 },
        { week: 'Week 4', completed: 15, efficiency: 92 },
    ];

    const taskBreakdownData = [
        { day: 'Mon', hours: 7.5, tasks: 4 },
        { day: 'Tue', hours: 8, tasks: 5 },
        { day: 'Wed', hours: 8.5, tasks: 3 },
        { day: 'Thu', hours: 7, tasks: 4 },
        { day: 'Fri', hours: 8, tasks: 4 },
    ];

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold mb-6">Personal Performance Analytics</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-indigo-600 text-white p-6 rounded-lg shadow-lg">
                    <CheckCircle2 className="w-8 h-8 mb-2" />
                    <h3 className="text-lg font-semibold">Tasks Completed</h3>
                    <p className="text-3xl font-bold">45</p>
                    <p className="text-sm opacity-80">This month</p>
                </div>
                <div className="bg-emerald-600 text-white p-6 rounded-lg shadow-lg">
                    <TrendingUp className="w-8 h-8 mb-2" />
                    <h3 className="text-lg font-semibold">Efficiency Rate</h3>
                    <p className="text-3xl font-bold">89%</p>
                    <p className="text-sm opacity-80">+4% from last month</p>
                </div>
                <div className="bg-amber-600 text-white p-6 rounded-lg shadow-lg">
                    <Clock className="w-8 h-8 mb-2" />
                    <h3 className="text-lg font-semibold">Overtime Hours</h3>
                    <p className="text-3xl font-bold">8.5h</p>
                    <p className="text-sm opacity-80">This month</p>
                </div>
                <div className="bg-rose-600 text-white p-6 rounded-lg shadow-lg">
                    <Award className="w-8 h-8 mb-2" />
                    <h3 className="text-lg font-semibold">Performance Score</h3>
                    <p className="text-3xl font-bold">92</p>
                    <p className="text-sm opacity-80">Out of 100</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold mb-6">Weekly Performance</h3>
                    <LineChart width={500} height={300} data={personalPerformanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Line yAxisId="left" type="monotone" dataKey="completed" stroke="#4F46E5" name="Tasks Completed" />
                        <Line yAxisId="right" type="monotone" dataKey="efficiency" stroke="#10B981" name="Efficiency %" />
                    </LineChart>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold mb-6">Daily Workload</h3>
                    <BarChart width={500} height={300} data={taskBreakdownData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="hours" fill="#4F46E5" name="Hours Worked" />
                        <Bar yAxisId="right" dataKey="tasks" fill="#10B981" name="Tasks Completed" />
                    </BarChart>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-6">Performance Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold text-lg mb-2">Strengths</h4>
                        <ul className="space-y-2 text-gray-600">
                            <li className="flex items-center">
                                <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                                High task completion rate
                            </li>
                            <li className="flex items-center">
                                <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                                Consistent performance
                            </li>
                            <li className="flex items-center">
                                <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                                Good time management
                            </li>
                        </ul>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold text-lg mb-2">Areas for Improvement</h4>
                        <ul className="space-y-2 text-gray-600">
                            <li className="flex items-center">
                                <TrendingUp className="w-5 h-5 text-amber-500 mr-2" />
                                Reduce overtime hours
                            </li>
                            <li className="flex items-center">
                                <TrendingUp className="w-5 h-5 text-amber-500 mr-2" />
                                Balance workload distribution
                            </li>
                            <li className="flex items-center">
                                <TrendingUp className="w-5 h-5 text-amber-500 mr-2" />
                                Improve documentation time
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
