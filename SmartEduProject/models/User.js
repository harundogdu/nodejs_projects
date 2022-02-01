const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["student", "teacher", "admin"],
        default: "student"
    }
})

UserSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
})

const User = mongoose.model('User', UserSchema);
module.exports = User;