const mongoose = require('mongoose');
const { default: slugify } = require('slugify');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        unique: true
    }
});

CategorySchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true, strict: true });
    next();
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;