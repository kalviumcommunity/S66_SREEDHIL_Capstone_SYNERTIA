// server/src/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
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
    },
    googleId: {
        type: String,
        default: null
    },
    isGoogleAuth: {
        type: Boolean,
        default: false
    },
    hasManualPassword: {
        type: Boolean,
        default: false
    },
    // Profile fields for first-time OAuth users
    gender: {
        type: String,
        enum: ["male", "female", "other", null],
        default: null
    },
    dateOfBirth: {
        type: Date,
        default: null
    },
    profileCompleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
