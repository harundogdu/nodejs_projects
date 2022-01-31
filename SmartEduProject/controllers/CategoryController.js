const Category = require('../models/Category');

exports.createCategory = function (req, res) {
    const category = new Category(req.body);
    category.save(function (err) {
        if (err) {
            return res.status(400).json({
                status: 400,
                error: err
            });
        } else {
            res.status(201).json(
                {
                    status: 201,
                    message: "Category created successfully"
                }
            );
        }
    });
}

exports.getAllCategories = async function (req, res) {
    const categories = await Category.find({});

    if (categories) {
        return res.status(200).json({
            status: 200,
            data: categories
        });
    } else {
        return res.status(404).json({
            status: 404,
            message: "No categories found"
        });
    }

}