const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

//Controllers

const addUserDataController = require("../controllers/userControllers/addUserDataController");
const getUserDataController = require("../controllers/userControllers/getUserDataController");
const updateUserDataController = require("../controllers/userControllers/updateUserDataController");

router.route("/task/:id").get(auth, getUserDataController.getUserTasks); //params would be the user id.

router.route("/task/:id").put(auth, updateUserDataController.updateTaskStatus);

router.route("/message/:id").get(auth, getUserDataController.getMessages); //id would be the team id

module.exports = router;
