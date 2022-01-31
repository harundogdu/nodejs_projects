const express = require("express");
const router = express.Router();
/* controllers */
const PageController = require("../controllers/PageController");

/* methods */
router.get("/", PageController.getHomePage);
router.get("/about", PageController.getAboutPage);
router.get("/dashboard", PageController.getDashboardPage);
router.get("/courses", PageController.getCoursesPage);
router.get("/contact", PageController.getContactPage);

module.exports = router;