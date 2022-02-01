const Category = require("../models/Category");
const Course = require("../models/Course");

exports.getHomePage = function (req, res) {
    res.render('home', {
        title: 'Home',
    });
}
exports.getAboutPage = function (req, res) {
    res.render('about', {
        title: 'About'
    });
}
exports.getCoursesPage = async function (req, res) {
    const categories = await Category.find({});
    const categorySlug = await req.query.category;
    const category = await Category.findOne({slug: categorySlug})

    let filter = {};
    if (categorySlug) {
        filter = {category: category._id}
    }
    const courses = await Course.find(filter);
    res.render('courses', {
        title: 'Courses',
        courses,
        categories
    });
}
exports.getContactPage = function (req, res) {
    res.render('contact', {
        title: 'Contact'
    });
}

exports.getRegisterPage = function (req, res) {
    res.render('register', {
        title: 'Register'
    });
}

exports.getLoginPage = (req, res) => {
    res.render('login',{
        title: 'Login'
    });
}