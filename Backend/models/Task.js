const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    assignedTo:{ type: mongoose.Schema.Types.ObjectId, ref:"User", required:true },
    status: { type: String, enum: [ "Pending", "In-process", "Completed" ], default: "Pending"},
    priority: { type: String, enum: [ "Low", "Medium", "High" ], default: "Medium"},
    createdAt: { type: Date, default: Date.now()}
});

const Task = mongoose.model("Synertia-task", taskSchema);
module.exports = Task