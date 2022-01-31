const slugify = require("slugify");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        unique: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    date: { type: Date, default: Date.now },
});

CourseSchema.pre("validate", function (next) {
    this.slug = slugify(this.name, { lower: true, strict: true });
    next();
});

const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;
