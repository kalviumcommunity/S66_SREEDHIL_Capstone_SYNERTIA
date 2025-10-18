const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    purpose: {
        type: String,
        enum: ["login", "registration"],
        default: "login"
    },
    expiresAt: {
        type: Date,
        required: true,
        index: { expires: 0 } // Auto-delete when expired (TTL index)
    },
    attempts: {
        type: Number,
        default: 0
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// Create index for efficient lookups
otpSchema.index({ userId: 1, purpose: 1, isVerified: 1 });
otpSchema.index({ expiresAt: 1 });

module.exports = mongoose.model("OTP", otpSchema);
