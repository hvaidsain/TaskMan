const { User } = require("../../models/user");
const Workspace = require("../../models/workspace");
const Project = require("../../models/project");
const Team = require("../../models/team");
const Task = require("../../models/task");

exports.getAllWorkspace = async (req, res) => {
  try {
    const workspace = await Workspace.find();
    res.send(workspace);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.getWorkspaceById = async (req, res) => {
  try {
    const _id = req.params.id;
    const workspace = await Workspace.find({ _id });
    res.send(workspace);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({});
    res.send(projects);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const _id = req.params.id;
    const project = await Project.findById({ _id });
    res.send(project);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find({}).populate("users");
    res.send(teams);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.getTeamById = async (req, res) => {
  try {
    const _id = req.params.id;
    const team = await Team.findById({ _id });
    res.send(team);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.getAllTasksByProject = async (req, res) => {
  try {
    const _id = req.params.id;
    const project = await Project.findOne({ _id });
    if (!project) {
      return res.status(404).send({ message: "Project does not exist" });
    }
    const tasks = await Task.find({ projectId: _id });
    res.send(tasks);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const _id = req.params.id;
    const task = await Task.findById({ _id });
    res.send(task);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
