const express = require("express");
const router = express.Router();
/* controller */
const CourseController = require("../controllers/CourseController");
/* routes */
router.get('/', CourseController.getAllCourses);
router.post('/', CourseController.createCourse);
router.get('/:slug', CourseController.getCourse);

module.exports = router;