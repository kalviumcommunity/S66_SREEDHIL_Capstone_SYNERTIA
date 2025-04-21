const User = require("../models/User");

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password");
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch user data" });
    }
};

module.exports = { getUser }