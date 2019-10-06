const { validateUser, User } = require("../../models/user");
const Workspace = require("../../models/workspace");
const Project = require("../../models/project");
const Team = require("../../models/team");
const Task = require("../../models/task");
const { createHash, compareHash } = require("../../helpers/hash");

exports.deleteWorkspaceById = async (req, res) => {
  try {
    const _id = req.params.id;
    const delWorkspace = await Workspace.findByIdAndDelete(_id);
    if (!delWorkspace) {
      return res.status(404).send({ message: "Workspace doest not exist" });
    }
    res.send(delWorkspace);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.deleteTeamById = async (req, res) => {
  try {
    const _id = req.params.id;
    const delTeam = await Team.findByIdAndDelete(_id);
    if (!delTeam) {
      return res.status(404).send({ message: "Team doest not exist" });
    }
    res.send(delTeam);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.deleteTaskById = async (req, res) => {
  try {
    const _id = req.params.id;
    const delTask = await Task.findByIdAndDelete(_id);
    if (!delTask) {
      return res.status(404).send({ message: "Task doest not exist" });
    }
    res.send(delTask);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.deleteProjectById = async (req, res) => {
  try {
    const _id = req.params.id;
    const delProject = await Project.findByIdAndDelete(_id);
    if (!delProject) {
      return res.status(404).send({ message: "Project doest not exist" });
    }
    res.send(delProject);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
