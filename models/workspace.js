const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

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
