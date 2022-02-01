const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.createUser = function (req, res) {
    const user = new User(req.body);
    user.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            res.redirect('/login');
        }
    });
}

exports.loginUser = function (req, res) {
    const user = User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        }
        if (!user) {
            return res.status(404).send({
                message: 'User not found'
            });
        }

        bcrypt.compare(req.body.password, user.password, function (err, result) {
            if (!err || result) {
                req.session.userID = user._id;
                res.redirect('/users/dashboard');
            }
        });

    })
}

exports.logoutUser = function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            res.redirect('/');
        }
    });
}

exports.getDashboard = function (req, res) {
    User.findById(req.session.userID, function (err, user) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        }
        if (!user) {
            return res.status(404).send({
                message: 'User not found'
            });
        }
        res.render('dashboard', {
            title: 'Dashboard',
            user: user
        });
    });
}