const Task = require("../models/Task");

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ assignedTo: req.user.userId });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch tasks" });
    }
};

module.exports = { getTasks }