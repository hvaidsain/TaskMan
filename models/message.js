const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const messageSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "project" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" }
  },
  {
    timestamps: true
  }
);

const Message = mongoose.model("message", messageSchema);

module.exports = Message;
