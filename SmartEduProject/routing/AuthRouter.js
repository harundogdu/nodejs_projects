const express = require("express");
const router = express.Router();
/* controller */
const AuthController = require("../controllers/AuthController");

/* routes */
router.post("/register", AuthController.createUser);
router.post('/login', AuthController.loginUser);
router.get('/logout', AuthController.logoutUser);

module.exports = router;
