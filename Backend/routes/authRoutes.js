const express = require("express");
const { register, login, completeLogin, getUser, refreshToken, googleAuth, completeProfile } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/complete-login", completeLogin);
router.post("/google", googleAuth);
router.post("/refresh", refreshToken);
router.get("/user", authMiddleware, getUser);
router.post("/complete-profile", authMiddleware, completeProfile);

module.exports = router;
