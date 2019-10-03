const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  workspace: { type: mongoose.Schema.Types.ObjectId, ref: "workspace" },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user"
    }
  ]
});

const Team = mongoose.model("team", teamSchema);

module.exports = Team;
