const { User } = require("../../models/user");
const Workspace = require("../../models/workspace");
const { Project } = require("../../models/project");
const Team = require("../../models/team");
const { Task } = require("../../models/task");

exports.updateTaskStatus = async (req, res) => {
  try {
    const _id = req.params.id;
    const update = { flag: req.body.flag };

    const task = await Task.findById(_id);

    console.log(task.userId);
    console.log(req.user._id);

    if (task.userId.toString() != req.user._id.toString()) {
      return res.status(401).send({ message: "Not allowed" });
    }

    if (req.body.flag == "completed") {
      const updatedTask = await Task.findByIdAndUpdate(_id, update, {
        new: true
      });
      res.send(updatedTask);
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
