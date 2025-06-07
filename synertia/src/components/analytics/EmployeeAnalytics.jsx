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
        <div>
            <h1>Personal Performance Analytics</h1>

            <div>
                <div>
                    <CheckCircle2/>
                    <h3>Tasks Completed</h3>
                    <p>45</p>
                    <p>This month</p>
                </div>
                <div>
                    <TrendingUp/>
                    <h3>Efficiency Rate</h3>
                    <p>89%</p>
                    <p>+4% from last month</p>
                </div>
                <div>
                    <Clock/>
                    <h3>Overtime Hours</h3>
                    <p>8.5h</p>
                    <p>This month</p>
                </div>
                <div>
                    <Award/>
                    <h3>Performance Score</h3>
                    <p>92</p>
                    <p>Out of 100</p>
                </div>
            </div>

            <div>
                <div>
                    <h3>Weekly Performance</h3>
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

                <div>
                    <h3>Daily Workload</h3>
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

            <div>
                <h3>Performance Insights</h3>
                <div>
                    <div>
                        <h4>Strengths</h4>
                        <ul>
                            <li>
                                <CheckCircle2/>
                                High task completion rate
                            </li>
                            <li>
                                <CheckCircle2 />
                                Consistent performance
                            </li>
                            <li>
                                <CheckCircle2 />
                                Good time management
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4>Areas for Improvement</h4>
                        <ul>
                            <li>
                                <TrendingUp/>
                                Reduce overtime hours
                            </li>
                            <li>
                                <TrendingUp/>
                                Balance workload distribution
                            </li>
                            <li>
                                <TrendingUp/>
                                Improve documentation time
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
