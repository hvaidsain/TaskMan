const { validateUser, User } = require("../../models/user");
const Workspace = require("../../models/workspace");
const { Project, validateProject } = require("../../models/project");
const Team = require("../../models/team");
const { Task, validateTask } = require("../../models/task");
const { createHash, compareHash } = require("../../helpers/hash");
const Message = require("../../models/message");

exports.addUser = async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    let email = req.body.email;
    const user = await User.findOne({ email });
    if (user) {
      res.status(409).send({ message: "Email already taken" });
    }
    let newUser = req.body;
    newUser.password = await createHash(newUser.password);

    newUser = await User.create(newUser);
    res.status(201).send(newUser);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.addWorkspace = async (req, res) => {
  try {
    const workspace = await Workspace.create(req.body);
    res.status(201).send(workspace);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.addProject = async (req, res) => {
  try {
    const { error } = validateProject(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    let projectDetails = req.body;

    const workspace = await Workspace.findOne({
      _id: projectDetails.workspace
    });
    if (!workspace) {
      return res.status(404).send({ message: "No Workspace found" });
    }

    const projectName = await Project.findOne({ name: projectDetails.name });
    if (projectName) {
      return res.status(409).send({ message: "Project name taken" });
    }

    const project = await Project.create(req.body);
    res.status(201).send(project);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.addTask = async (req, res) => {
  try {
    const { error } = validateTask(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    let task = req.body;

    if (task.endTime < task.startTime) {
      return res.status(400).send({ message: "endtime shud be greater" });
    }

    const project = await Project.findOne({ _id: task.projectId });

    if (!project) {
      return res.status.send("Project Does Not Exist");
    }

    const newTask = await Task.create(task);
    res.status(201).send(newTask);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.addTeam = async (req, res) => {
  try {
    let team = req.body;
    // const user = await User.findOne({ _id: { $in: team.users } });
    const workspace = await Workspace.findOne({ _id: team.workspace });
    const teamName = await Team.findOne({ name: team.name });

    if (!workspace) {
      return res.status(404).send({ message: "No Workspace Found" });
    }

    if (teamName) {
      return res.status(409).send({ message: "Team name already taken" });
    }

    const newTeam = await Team.create(req.body);

    res.status(201).send(newTeam);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.addMessages = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await Project.find({ _id: projectId });
    if (!project) {
      res.status(404).send({ message: "No project found" });
    }
    let messageBody = req.body;

    messageBody.userId = req.user._id;
    messageBody.projectId = projectId;

    const newMessage = await Message.create(messageBody);
    res.send(newMessage);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
