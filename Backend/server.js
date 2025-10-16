// server/src/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

connectDB();

app.use("/api/auth", authRoutes);

app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/analytics", require("./routes/analyticsRoutes"));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
