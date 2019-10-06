const { validateUser, User } = require("../../models/user");
const Workspace = require("../../models/workspace");
const Project = require("../../models/project");
const Team = require("../../models/team");
const Task = require("../../models/task");
const { createHash, compareHash } = require("../../helpers/hash");

exports.updateWorkspace = async (req, res) => {
  try {
    const _id = req.params.id;

    const updatedWorkspace = await Workspace.findByIdAndUpdate(_id, req.body, {
      new: true
    });
    res.send(updatedWorkspace);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const _id = req.params.id;

    const updatedUser = await User.findByIdAndUpdate(_id, req.body, {
      new: true
    });
    res.send(updatedUser);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
exports.updateTeam = async (req, res) => {
  try {
    const _id = req.params.id;

    const updateTeam = await User.findByIdAndUpdate(_id, req.body, {
      new: true
    });
    res.send(updateTeam);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
exports.updateTask = async (req, res) => {
  try {
    const _id = req.params.id;

    const updateTask = await User.findByIdAndUpdate(_id, req.body, {
      new: true
    });
    res.send(updateTask);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
