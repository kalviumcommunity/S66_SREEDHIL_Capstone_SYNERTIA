import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Users, TrendingUp, Clock, Award } from 'lucide-react';

export default function ManagerAnalytics() {
    const teamPerformanceData = [
        { month: 'Jan', productivity: 85, efficiency: 78, satisfaction: 90 },
        { month: 'Feb', productivity: 88, efficiency: 82, satisfaction: 85 },
        { month: 'Mar', productivity: 92, efficiency: 87, satisfaction: 88 },
        { month: 'Apr', productivity: 90, efficiency: 85, satisfaction: 92 },
    ];

    const taskDistributionData = [
        { name: 'Development', value: 45 },
        { name: 'Design', value: 25 },
        { name: 'Testing', value: 20 },
        { name: 'Documentation', value: 10 },
    ];

    const employeePerformanceData = [
        { name: 'John Doe', tasks: 23, completion: 95, overtime: 12 },
        { name: 'Jane Smith', tasks: 19, completion: 88, overtime: 8 },
        { name: 'Mike Johnson', tasks: 27, completion: 92, overtime: 15 },
        { name: 'Sarah Williams', tasks: 21, completion: 87, overtime: 10 },
    ];

    const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444'];

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold mb-6">Team Analytics Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-indigo-600 text-white p-6 rounded-lg shadow-lg">
                    <Users className="w-8 h-8 mb-2" />
                    <h3 className="text-lg font-semibold">Total Employees</h3>
                    <p className="text-3xl font-bold">15</p>
                    <p className="text-sm opacity-80">+3 from last month</p>
                </div>
                <div className="bg-emerald-600 text-white p-6 rounded-lg shadow-lg">
                    <TrendingUp className="w-8 h-8 mb-2" />
                    <h3 className="text-lg font-semibold">Team Productivity</h3>
                    <p className="text-3xl font-bold">92%</p>
                    <p className="text-sm opacity-80">+5% increase</p>
                </div>
                <div className="bg-amber-600 text-white p-6 rounded-lg shadow-lg">
                    <Clock className="w-8 h-8 mb-2" />
                    <h3 className="text-lg font-semibold">Avg. Overtime</h3>
                    <p className="text-3xl font-bold">11.2h</p>
                    <p className="text-sm opacity-80">Per employee/month</p>
                </div>
                <div className="bg-rose-600 text-white p-6 rounded-lg shadow-lg">
                    <Award className="w-8 h-8 mb-2" />
                    <h3 className="text-lg font-semibold">Team Satisfaction</h3>
                    <p className="text-3xl font-bold">88%</p>
                    <p className="text-sm opacity-80">Based on surveys</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold mb-6">Team Performance Trends</h3>
                    <LineChart width={500} height={300} data={teamPerformanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="productivity" stroke="#4F46E5" />
                        <Line type="monotone" dataKey="efficiency" stroke="#10B981" />
                        <Line type="monotone" dataKey="satisfaction" stroke="#F59E0B" />
                    </LineChart>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold mb-6">Task Distribution</h3>
                    <PieChart width={400} height={300}>
                        <Pie
                            data={taskDistributionData}
                            cx={200}
                            cy={150}
                            innerRadius={60}
                            outerRadius={100}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {taskDistributionData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-6">Individual Performance Metrics</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tasks Completed</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion Rate</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overtime Hours</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {employeePerformanceData.map((employee, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.tasks}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.completion}%</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.overtime}h</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}