const express = require("express");
const session = require('express-session')
const MongoStore = require('connect-mongo');
const path = require("path");
const ejs = require("ejs");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 3000;

/* controllers require */
const PageRouter = require("./routing/PageRouter");
const CategoryRouter = require("./routing/CategoryRouter");
const CourseRouter = require("./routing/CourseRouter");
const AuthRouter = require("./routing/AuthRouter");

/* globals */
global.userIN = null;

/* database connect */
mongoose
    .connect("mongodb://localhost/smartedu", {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log("Connected to database");
    })
    .catch((err) => {
        console.log("Not connected to database", err);
    });

/* Template Engine */
app.set("view engine", "ejs");

/* middlewares */
app.use(express.static("public"));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(
    session({
        secret: 'smartedu-secret', // session secret
        resave: false,
        saveUninitialized: true,
    })
);
app.use('*', (req, res, next) => {
    userIN = req.session.userID;
    next();
});
app.use(session({
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/smartedu' })
}));


/* routes */
app.use("/", PageRouter);
app.use("/category", CategoryRouter);
app.use("/course", CourseRouter);
app.use("/users", AuthRouter);

/* server */
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});