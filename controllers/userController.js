//Importing model(s)
const User = require("../models/user");


//Importing necessary modules
const mongoose = require("mongoose");
const { body, validationResults } = require("express-validator");


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
            return next(errors);
        }
    }
]