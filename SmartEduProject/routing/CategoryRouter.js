const express = require("express");
const router = express.Router();
/* controller */
const CategoryController = require("../controllers/CategoryController");

/* routes */
router.get("/", CategoryController.getAllCategories);
router.post('/', CategoryController.createCategory);

module.exports = router;
