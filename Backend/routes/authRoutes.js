const express = require("express");
const { register, login, getUser } = require("../controllers/authController");
// const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user", getUser);
// router.post("/login", authMiddleware, login);
// router.get("/user", authMiddleware, getUser);

module.exports = router;
