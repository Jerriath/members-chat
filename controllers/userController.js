//Importing model(s)
const User = require("../models/user");


//Importing necessary modules
const mongoose = require("mongoose");
const { body, validationResults } = require("express-validator");
const bcrypt = require("bcryptjs/dist/bcrypt");


//Exporting controller functions
exports.user_create_get = (req, res, next) => {
    res.render("signup-form", { title: "Sign up to me a member!" })
}

exports.user_create_post = [
    body("username")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Please provide a username"),
    body("password")
        .trim()
        .isLength( { min: 1 })
        .escape()
        .withMessage("Please provide a password"),
    body("confirmation")
        .trim()
        .isLength( { min: 1 })
        .withMessage("Please confirm your password")
        .custom(async (value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Password confirmation must match password")
            }
            return true;
        }),

    async (req, res, next) => {
        const errors = validationResults(req);
        if (!errors.isEmpty()) {
            res.render("signup-form", { title: "Sign up to be a member!", error: "Password must match confirmation."})
        }

        try {
            const userExists = await User.find({ username: req.body.username });
            if (userExists > 0) {
                res.render("signup-form", { title: "Sign up to be a member!", error: "User already exists" });
            }
            bcrypt.hash(reql.body.password, 10, (err, hashedPass) => {
                if (err) return next(err);
                const user = new User({
                    username: req.body.username,
                    password: hashedPass,
                    member: false,
                    admin: false,
                    pallete: req.body.palette// Need to set up classes to represent color palettes
                });
            })
        }
        catch (error) {
            return next(error);
        }
    }
]

exports.user_login_get = (req, res, next) => {
    res.send("NOT IMPLEMENTED YET");
}