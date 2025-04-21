const express = require("express");
const { getTasks, createTask } = require("../controllers/taskController");

const router = express.Router();

router.get("/", getTasks);
router.post("/", createTask);

module.exports = router;
