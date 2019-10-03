const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");

//Controllers

const adminLoginController = require("../controllers/adminControllers/adminLoginController");
const getAdminDataController = require("../controllers/adminControllers/getAdminDataController");
const addAdminDataController = require("../controllers/adminControllers/addAdminDataController");
const updateAdminDataController = require("../controllers/adminControllers/updateAdminDataController");
const deleteAdminDataController = require("../controllers/adminControllers/deleteAdminDataController");

//adminLoginController

router.route("/login").post(adminLoginController.adminLogin);

//add admin data controllers

router.route("/users").post(auth, isAdmin, addAdminDataController.addUser);
router
  .route("/workspace")
  .post(auth, isAdmin, addAdminDataController.addWorkspace);
router.route("/project").post(auth, isAdmin, addAdminDataController.addProject);
router.route("/team").post(auth, isAdmin, addAdminDataController.addTeam);
router.route("/task").post(auth, isAdmin, addAdminDataController.addTask);

//get admin data controllers

router
  .route("/workspace")
  .get(auth, isAdmin, getAdminDataController.getAllWorkspace);
router
  .route("/workspace/:id")
  .get(auth, isAdmin, getAdminDataController.getWorkspaceById);
router
  .route("/project")
  .get(auth, isAdmin, getAdminDataController.getAllProjects);
router
  .route("/project/:id")
  .get(auth, isAdmin, getAdminDataController.getProjectById);

router.route("/team").get(auth, isAdmin, getAdminDataController.getAllTeams);
router
  .route("/team/:id")
  .get(auth, isAdmin, getAdminDataController.getTeamById);
router
  .route("/project/task/:id")
  .get(auth, isAdmin, getAdminDataController.getAllTasksByProject); //param id would be the project id
router
  .route("/task/:id")
  .get(auth, isAdmin, getAdminDataController.getTaskById); //Not usefull in current scenario

module.exports = router;
