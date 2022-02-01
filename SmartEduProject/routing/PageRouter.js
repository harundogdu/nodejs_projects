const express = require("express");
const router = express.Router();

/* controllers */
const PageController = require("../controllers/PageController");
const RedirectMiddleware = require("../middlewares/RedirectMiddleware");

/* methods */
router.get("/", PageController.getHomePage);
router.get("/about", PageController.getAboutPage);
router.get("/courses", PageController.getCoursesPage);
router.get("/contact", PageController.getContactPage);
router.route('/register').get(RedirectMiddleware, PageController.getRegisterPage);
router.route('/login').get(RedirectMiddleware, PageController.getLoginPage);

module.exports = router;