const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const validateProject = project => {
  const schema = Joi.object().keys({
    name: Joi.string()
      .min(3)
      .required(),
    priority: Joi.number()
      .integer()
      .min(1)
      .max(10),
    teamId: Joi.string().required(),
    workspace: Joi.string().required()
  });
  return Joi.validate(project, schema);
};

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // startTime: { type: Date, default: Date.now },
  // endTime: { type: Date },
  priority: { type: Number, min: 1, max: 10 },
  flag: {
    type: String,
    enum: ["ongoing", "completed", "pending"],
    default: "ongoing"
  },
  workspace: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "workspace"
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: "team" }
});

const Project = mongoose.model("project", projectSchema);

module.exports = { Project, validateProject };
