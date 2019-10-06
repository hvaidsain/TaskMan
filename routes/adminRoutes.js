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
router.route("/task").get(auth, isAdmin, getAdminDataController.getAllTask);
router
  .route("/project/task/:id")
  .get(auth, isAdmin, getAdminDataController.getAllTasksByProject); //param id would be the project id
router
  .route("/task/:id")
  .get(auth, isAdmin, getAdminDataController.getTaskById); //Not usefull in current scenario

router.route("/user").get(auth, isAdmin, getAdminDataController.getAllUsers);
router
  .route("/user/:id")
  .get(auth, isAdmin, getAdminDataController.getUserById);

//Delete Admin data controllers

router
  .route("/workspace/:id")
  .delete(auth, isAdmin, deleteAdminDataController.deleteWorkspaceById);
router
  .route("/team/:id")
  .delete(auth, isAdmin, deleteAdminDataController.deleteTeamById);

router
  .route("/task/:id")
  .delete(auth, isAdmin, deleteAdminDataController.deleteTaskById);

router
  .route("/project/:id")
  .delete(auth, isAdmin, deleteAdminDataController.deleteProjectById);

//Update Admin data controllers

router
  .route("/workspace/:id")
  .put(auth, isAdmin, updateAdminDataController.updateWorkspace);
router
  .route("/User/:id")
  .put(auth, isAdmin, updateAdminDataController.updateUser);

router
  .route("/Team/:id")
  .put(auth, isAdmin, updateAdminDataController.updateTeam);

router
  .route("/Task/:id")
  .put(auth, isAdmin, updateAdminDataController.updateTask);

module.exports = router;
