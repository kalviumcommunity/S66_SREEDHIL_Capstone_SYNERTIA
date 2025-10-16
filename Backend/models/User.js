// server/src/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        sparse: true
    },
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        sparse: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["employee", "manager"],
        default: "employee"
    },
    refreshToken: {
        type: String,
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
