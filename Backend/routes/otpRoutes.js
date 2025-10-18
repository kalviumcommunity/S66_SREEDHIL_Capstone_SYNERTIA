const express = require("express");
const { requestLoginOTP, verifyOTP, resendOTP } = require("../controllers/otpController");
const router = express.Router();

// Request OTP for login
router.post("/request", requestLoginOTP);

// Verify OTP
router.post("/verify", verifyOTP);

// Resend OTP
router.post("/resend", resendOTP);

module.exports = router;
