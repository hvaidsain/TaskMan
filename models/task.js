const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const validateTask = task => {
  const schema = Joi.object().keys({
    name: Joi.string()
      .min(3)
      .required(),
    priority: Joi.number()
      .integer()
      .min(1)
      .max(10),
    startTime: Joi.date(),
    endTime: Joi.date(),
    projectId: Joi.string().required(),
    userId: Joi.string().required()
  });
  return Joi.validate(task, schema);
};

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
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

module.exports = { Task, validateTask };
