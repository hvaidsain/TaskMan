const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const validateWorkSpace = work => {
  const schema = Joi.object().keys({
    name: Joi.string()
      .min(3)
      .required()
  });
  return Joi.validate(work, schema);
};

const workspaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  projects: [
    {
      project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "project"
      }
    }
  ]
});

const Workspace = mongoose.model("workspace", workspaceSchema);

module.exports = Workspace;
