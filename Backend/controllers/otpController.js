const OTP = require("../models/OTP");
const User = require("../models/User");
const { sendOTPEmail } = require("../utils/emailService");
const crypto = require("crypto");

// Generate 6-digit OTP
const generateOTP = () => {
    return crypto.randomInt(100000, 999999).toString();
};

// Request OTP for login (called after initial credentials validation)
const requestLoginOTP = async (req, res) => {
    try {
        const { userId, email, userName, userRole } = req.body;

        if (!userId || !email || !userName || !userRole) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Verify user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check for recent OTP request (rate limiting - 30 seconds cooldown)
        const recentOTP = await OTP.findOne({
            userId,
            purpose: "login",
            createdAt: { $gte: new Date(Date.now() - 30000) } // Within last 30 seconds
        });

        if (recentOTP && !recentOTP.isVerified) {
            const remainingTime = Math.ceil((30000 - (Date.now() - recentOTP.createdAt)) / 1000);
            return res.status(429).json({ 
                error: `Please wait ${remainingTime} seconds before requesting a new OTP`,
                remainingTime
            });
        }

        // Invalidate all previous unverified OTPs for this user
        await OTP.updateMany(
            { userId, purpose: "login", isVerified: false },
            { $set: { isVerified: true } } // Mark as used/invalid
        );

        // Generate new OTP
        const otp = generateOTP();
        const expiresAt = new Date(Date.now() + 60000); // 60 seconds from now

        // Save OTP to database
        const otpRecord = new OTP({
            userId,
            email,
            otp,
            purpose: "login",
            expiresAt,
            attempts: 0,
            isVerified: false
        });

        await otpRecord.save();

        // Send OTP via email
        try {
            await sendOTPEmail(email, otp, userName, userRole);
            console.log(`✅ OTP sent to ${email} for user ${userName} (${userRole})`);
        } catch (emailError) {
            console.error('❌ Email sending error:', emailError.message);
            return res.status(500).json({ 
                error: "Failed to send OTP email. Please check email configuration.",
                details: emailError.message 
            });
        }

        res.status(200).json({
            message: "OTP sent successfully to your email",
            otpId: otpRecord._id,
            expiresIn: 60 // seconds
        });

    } catch (error) {
        console.error("❌ Request OTP error:", error.message);
        console.error("Error stack:", error.stack);
        res.status(500).json({ 
            error: "Failed to send OTP. Please try again.",
            details: error.message 
        });
    }
};

// Verify OTP
const verifyOTP = async (req, res) => {
    try {
        const { otpId, otp, userId } = req.body;

        if (!otpId || !otp || !userId) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Find OTP record
        const otpRecord = await OTP.findOne({
            _id: otpId,
            userId,
            isVerified: false
        });

        if (!otpRecord) {
            return res.status(404).json({ error: "OTP not found or already used" });
        }

        // Check if OTP has expired
        if (otpRecord.expiresAt < new Date()) {
            return res.status(400).json({ error: "OTP has expired. Please request a new one." });
        }

        // Check maximum attempts (3 attempts allowed)
        if (otpRecord.attempts >= 3) {
            return res.status(400).json({ error: "Maximum verification attempts exceeded. Please request a new OTP." });
        }

        // Verify OTP
        if (otpRecord.otp !== otp) {
            // Increment attempts
            otpRecord.attempts += 1;
            await otpRecord.save();

            return res.status(400).json({ 
                error: "Invalid OTP. Please try again.",
                attemptsRemaining: 3 - otpRecord.attempts
            });
        }

        // OTP is valid - mark as verified
        otpRecord.isVerified = true;
        await otpRecord.save();

        console.log(`✅ OTP verified successfully for user ${userId}`);

        res.status(200).json({
            message: "OTP verified successfully",
            verified: true
        });

    } catch (error) {
        console.error("Verify OTP error:", error);
        res.status(500).json({ error: "Failed to verify OTP. Please try again." });
    }
};

// Resend OTP
const resendOTP = async (req, res) => {
    try {
        const { userId, email, userName, userRole } = req.body;

        if (!userId || !email || !userName || !userRole) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Check rate limiting (30 seconds between resend requests)
        const recentOTP = await OTP.findOne({
            userId,
            purpose: "login",
            createdAt: { $gte: new Date(Date.now() - 30000) }
        }).sort({ createdAt: -1 });

        if (recentOTP) {
            const remainingTime = Math.ceil((30000 - (Date.now() - recentOTP.createdAt)) / 1000);
            return res.status(429).json({ 
                error: `Please wait ${remainingTime} seconds before requesting a new OTP`,
                remainingTime
            });
        }

        // Invalidate all previous OTPs
        await OTP.updateMany(
            { userId, purpose: "login", isVerified: false },
            { $set: { isVerified: true } }
        );

        // Generate new OTP
        const otp = generateOTP();
        const expiresAt = new Date(Date.now() + 60000);

        const otpRecord = new OTP({
            userId,
            email,
            otp,
            purpose: "login",
            expiresAt,
            attempts: 0,
            isVerified: false
        });

        await otpRecord.save();

        // Send OTP via email
        try {
            await sendOTPEmail(email, otp, userName, userRole);
            console.log(`✅ OTP resent to ${email}`);
        } catch (emailError) {
            console.error('❌ Email sending error:', emailError.message);
            return res.status(500).json({ 
                error: "Failed to send OTP email. Please check email configuration.",
                details: emailError.message 
            });
        }

        res.status(200).json({
            message: "New OTP sent successfully",
            otpId: otpRecord._id,
            expiresIn: 60
        });

    } catch (error) {
        console.error("❌ Resend OTP error:", error.message);
        console.error("Error stack:", error.stack);
        res.status(500).json({ 
            error: "Failed to resend OTP. Please try again.",
            details: error.message 
        });
    }
};

module.exports = {
    requestLoginOTP,
    verifyOTP,
    resendOTP
};
