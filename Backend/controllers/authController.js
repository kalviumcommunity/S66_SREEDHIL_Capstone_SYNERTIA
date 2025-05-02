const User = require("../models/User");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword, role })

        await user.save();
        res.status(201).json({ message: "User registered Successfully ! " });
    } catch (error) {
        res.status(500).json({ error: "Registration failed" })
    }
};

const login = async (req, res) => {
    try {
        console.log(" Login request received ", req.body);

        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            console.log("User not found");
            return res.status(404).json({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Invalid Password");
            return res.status(400).json({ error: "Invalid Credentials" })
        }

        console.log("Login Successful")

    } catch (error) {
        console.error("Login Failed", error);
        res.status(500).json({ error: "Login Failed" });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password");
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch user data" });
    }
};

module.exports = { register, login, getUser }