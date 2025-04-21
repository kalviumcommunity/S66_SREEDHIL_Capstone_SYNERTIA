const Task = require('../models/Task');
const User = require('../models/User');

const getEmployeeAnalytics = async (req, res) => {
    try {
        const userId = req.user.id;

        const tasks = await Task.find({ assignedTo: userId });

        const completed = tasks.filter(t => t.status === 'completed').length;
        const total = tasks.length;
        const efficiency = Math.round((completed / total) * 100 || 0);

        const overtimeHours = tasks.reduce((sum, t) => sum + (t.overtimeHours || 0), 0);
        const performanceScore = efficiency + Math.min(overtimeHours, 10);

        res.json({
            completed,
            efficiency,
            overtimeHours,
            performanceScore,
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch employee analytics' });
    }
};

const getManagerAnalytics = async (req, res) => {
    try {
        const users = await User.find({ role: 'employee' });
        const tasks = await Task.find({});

        const employeeCount = users.length;
        const productivity = Math.round((tasks.filter(t => t.status === 'completed').length / tasks.length) * 100 || 0);
        const averageOvertime = tasks.reduce((sum, t) => sum + (t.overtimeHours || 0), 0) / employeeCount;
        const satisfaction = 88;

        const taskDistribution = {
            development: tasks.filter(t => t.category === 'Development').length,
            design: tasks.filter(t => t.category === 'Design').length,
            testing: tasks.filter(t => t.category === 'Testing').length,
            documentation: tasks.filter(t => t.category === 'Documentation').length,
        };

        res.json({
            employeeCount,
            productivity,
            averageOvertime,
            satisfaction,
            taskDistribution,
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch manager analytics' });
    }
};

module.exports = { getEmployeeAnalytics, getManagerAnalytics }