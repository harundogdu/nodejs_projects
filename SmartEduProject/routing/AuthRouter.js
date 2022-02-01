const express = require("express");
const router = express.Router();
/* controller */
const AuthController = require("../controllers/AuthController");
const AuthMiddleware = require("../middlewares/AuthMiddleware");

/* routes */
router.route('/register').post(AuthController.createUser);
router.route('/login').post(AuthController.loginUser);
router.get('/logout', AuthController.logoutUser);
router.route('/dashboard').get(AuthMiddleware, AuthController.getDashboard);

module.exports = router;
