const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date },
  priority: { type: Number, min: 1, max: 10 },
  flag: {
    type: String,
    enum: ["ongoing", "completed", "pending"],
    default: "ongoing"
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "project",
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "project",
    required: true
  }
});

const Task = mongoose.model("task", taskSchema);

module.exports = Task;
