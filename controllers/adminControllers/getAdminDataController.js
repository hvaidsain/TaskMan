const { User } = require("../../models/user");
const Workspace = require("../../models/workspace");
const { Project } = require("../../models/project");
const Team = require("../../models/team");
const { Task } = require("../../models/task");

exports.getAllWorkspace = async (req, res) => {
  try {
    const workspace = await Workspace.find();
    res.send(workspace);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("teamId");
    res.send(users);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.find({ _id });
    if (!user) {
      return res.status(404).send({ message: "team does not exist" });
    }
    res.send(user);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.getWorkspaceById = async (req, res) => {
  try {
    const _id = req.params.id;
    const workspace = await Workspace.find({ _id });
    if (!workspace) {
      return res.status(404).send({ message: "team does not exist" });
    }
    res.send(workspace);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({}).populate("teamId");
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
    if (!project) {
      return res.status(404).send({ message: "team does not exist" });
    }
    res.send(project);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find({}).populate("workspace");
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

    if (!team) {
      return res.status(404).send({ message: "team does not exist" });
    }
    res.send(team);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

//Will work on this method for filtering as well --

exports.getAllTask = async (req, res) => {
  try {
    const task = await Task.find().sort({ startTime: "asc" });
    res.send(task);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

//params project:id

exports.getAllTasksByProject = async (req, res) => {
  try {
    const _id = req.params.id;
    const project = await Project.findOne({ _id });
    if (!project) {
      return res.status(404).send({ message: "Project does not exist" });
    }
    now = new Date();
    const tasks = await Task.find({ projectId: _id })
      .populate([
        { path: "userId", model: "user" },
        { path: "projectId", model: "project" }
      ])

      .sort({ startTime: "asc" });

    for (let x in tasks) {
      if (tasks[x].endTime < now && tasks[x].flag != "completed") {
        tasks[x].flag = "delayed";
      }
    }

    // console.log(tasks);
    res.send(tasks);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.getMemberOfTeam = async (req, res) => {
  try {
    console.log(req.user);
    const projectId = req.params.id;
    const project = await Project.findOne({ _id: projectId });
    if (!project) {
      return res.status(404).send({ message: "Project not found" });
    }
    const teamId = project.teamId;
    const users = await User.find({ teamId });

    res.send(users);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Internal Server error" });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const _id = req.params.id;
    const task = await Task.findById({ _id });
    if (!task) {
      return res.status(404).send({ message: "Task does not exist" });
    }
    res.send(task);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.getProjectsByWorkspace = async (req, res) => {
  try {
    const _id = req.params.id;
    const workspace = await Workspace.find({ _id: _id });
    if (!workspace) {
      res.status(404).send({ message: "No workspace found" });
    }

    const projects = await Project.find({ workspace: _id }).populate("teamId");
    res.send(projects);
  } catch (e) {
    console.log(e);

    res.status(500).send({ message: "Internal Server Error" });
  }
};
