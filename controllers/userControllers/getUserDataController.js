const { User } = require("../../models/user");
const Workspace = require("../../models/workspace");
const { Project } = require("../../models/project");
const Team = require("../../models/team");
const { Task } = require("../../models/task");
const Message = require("../../models/message");

exports.getUserTasks = async (req, res) => {
  try {
    console.log(req.user);
    const _id = req.params.id;
    if (req.user._id != _id) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    const user = await User.findOne({ _id });
    if (!user) {
      return res.status(404).send({ message: "User does not exist" });
    }

    if (req.query.filter) {
      const filter = req.query.filter;
      const tasks = await Task.find({ userId: _id, flag: filter });

      res.send(tasks);
    } else {
      const tasks = await Task.find({ userId: _id });
      res.send(tasks);
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const _id = req.params.id;

    if (_id != req.user.teamId) {
      return res.status(401).send({ message: "Unauhorized:Not your team" });
    }

    const team = await Team.findOne({ _id });
    // console.log(team);
    if (!team) {
      return res.status(404).send({ message: "No team found" });
    }

    const project = await Project.findOne({ teamId: _id });
    projectId = project._id;
    // console.log(projectId);
    const message = await Message.find({ projectId }).populate("userId");
    res.send(message);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
