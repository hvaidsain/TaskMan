const { User } = require("../../models/user");
const Workspace = require("../../models/workspace");
const Project = require("../../models/project");
const Team = require("../../models/team");
const Task = require("../../models/task");

exports.getUserTasks = async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findOne({ _id });
    if (!user) {
      return res.status(404).send({ message: "User does not exist" });
    }

    const tasks = await Task.find({ userId: _id });
    res.send(tasks);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
