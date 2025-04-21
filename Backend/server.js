require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");


const app = express();
const PORT = process.env.PORT;

app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/analytics", require("./routes/analyticsRoutes"));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
