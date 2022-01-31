const Category = require('../models/Category');
const Course = require('../models/Course');

exports.createCourse = function (req, res) {
    const course = new Course(req.body);
    course.save(function (err) {
        if (err) {
            return res.status(400).json({
                status: 400,
                error: err
            });
        } else {
            res.status(201).json(
                {
                    status: 201,
                    message: "Course created successfully"
                }
            );
        }
    });
}

exports.getCourse = async function (req, res) {
    try {
        const course = await Course.findOne({
            slug: req.params.slug
        })
        const category = await Category.findOne({
            _id: course.category
        })
        return res.status(200).render('course', { title: "Courses", course, category });
    } catch (err) {
        return res.status(400).json({
            status: 400,
            error: err
        });
    }
}

exports.getAllCourses = async function (req, res) {
    try {
        const categorySlug = req.query.categories;
        const category = await Category.findOne({ slug: categorySlug })

        let filter = {};
        if (categorySlug) {
            filter = { category: category._id }
        }
        const courses = await Course.find(filter);
        return res.status(200).json(courses);
    } catch (err) {
        return res.status(400).json({
            status: 400,
            error: err
        });
    }
}
