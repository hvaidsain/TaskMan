const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

const validateUser = user => {
  const schema = Joi.object().keys({
    name: Joi.string()
      .min(3)
      .required(),
    email: Joi.string()
      .required()
      .email(),
    isAdmin: Joi.boolean(),
    password: Joi.string()
      .min(3)
      .required(),
    teamId: Joi.string().required()
  });
  return Joi.validate(user, schema);
};

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: "team" },
  // projectId: { type: mongoose.Schema.Types.ObjectId, ref: "project" },
  isAdmin: { type: Boolean, default: false }
});

userSchema.methods.generateAuthToken = async function() {
  const jwtSecret = process.env.jwt;
  const payload = _.pick(this, ["_id", "name", "isAdmin"]);
  const token = jwt.sign(payload, jwtSecret);
  return token;
};

const User = mongoose.model("user", userSchema);

module.exports = { User, validateUser };
