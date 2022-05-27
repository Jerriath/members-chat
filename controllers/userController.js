//Importing model(s)
const User = require("../models/user");


//Importing necessary modules
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs/dist/bcrypt");
const passport = require("passport");


//Exporting controller functions
exports.user_create_get = (req, res) => {
    res.render("signup-form", { title: "Sign up to be a Palette Pal!" })
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
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render("signup-form", { title: "Sign up to be a member!", error: "Password must match confirmation."})
        }

        try {
            const userExists = await User.find({ username: req.body.username });
            if (userExists > 0) {
                res.render("signup-form", { title: "Sign up to be a member!", error: "User already exists" });
            }
            bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
                if (err) return next(err);
                const user = new User({
                    username: req.body.username,
                    password: hashedPass,
                    member: false,
                    admin: false,
                    palette: req.body.palette// Need to set up classes to represent color palettes
                }).save( error => error ? next(error) : res.redirect("/"));
            })
        }
        catch (error) {
            return next(error);
        }
    }
]

exports.user_login_get = (req, res) => {
    res.render("login-form", { title: "Palette Pal Log-in" })
}

exports.user_login_post = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in"
});

exports.user_logout_get = (req, res) => {
    req.logout();
    res.redirect("/");
}

exports.user_member_get = (req, res) => {
    res.send("NOT IMPLEMENTED YET");
}

exports.user_member_post = (req, res, next) => {
    res.send("NOT IMPLEMENTED YET");
}

exports.user_admin_get = (req, res) => {
    res.send("NOT IMPLEMENTED YET");
}

exports.user_admin_post = (req, res, next) => {
    res.send("NOT IMPLEMENTED YET");
}