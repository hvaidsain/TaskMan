const { User } = require("../../models/user");
const Workspace = require("../../models/workspace");
const Project = require("../../models/project");
const Team = require("../../models/team");
const Task = require("../../models/task");

exports.updateTaskStatus = async (req, res) => {
  try {
    const _id = req.params.id;
    console.log(req.body.flag);
    if (req.body.flag == "completed") {
      const updatedTask = await Task.findByIdAndUpdate(_id, req.body, {
        new: true
      });
      res.send({ updatedTask });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
