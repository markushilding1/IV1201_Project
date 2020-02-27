const express = require("express");
const router = express.Router();

//Import Controllers
const applicationsController = require("./applications.controller");

//Import middleware
const {
  isRecruiter,
  isAuthenticated
} = require("../common/middlewares/authentication");

//Middleware for all routes here to check if the requests
//Are made from authenticated users with valid token
router.use(isAuthenticated);

//Setup Controllers
router.post(
  "/submit",
  applicationsController.validate("submitApplication"),
  applicationsController.submitApplication
);
router.get("/expertise", applicationsController.getAreaOfExpertise);
router.get("/", isRecruiter, applicationsController.getApplications);
router.patch("/:id", isRecruiter, applicationsController.updateStatus);
router.get("/:id", isRecruiter, applicationsController.getApplication);

module.exports = router;
