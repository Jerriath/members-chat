//Importing model(s)
const Message = require("../models/message");


//Importing necessary modules
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const he = require("he");


//Exporting controller functions
exports.index = (req, res, next) => {

    Message.find({}).populate("user").sort({ date: -1 }).exec( (err, messages) => {
        if(err) return next(err);
        for (i=0; i < messages.length; i++) {
            messages[i].message = he.decode(messages[i].message);
        }
        res.render("index", {
            messages: messages,
            title: "Palette Pals",
            user: req.user ? req.user : null
        })
    })

}

exports.create_message_get = (req, res) => {
     
    res.render("message-form", { isUpdating: false, user: req.user, title: "Create A Message" });

}

exports.create_message_post = [
    body("title")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Must provide a title for the message"),
    body("message")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Please provide a message you want to share"),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.render("message-form", {
                    message: req.body,
                    isUpdating: false,
                    errors: errors.array(),
                    user: req.user,
                    title: "Create A Message"
                })
                return;
            }
            else {
                let message = new Message({
                    title: req.body.title,
                    message: req.body.message,
                    user: req.user,
                    date: Date.now()
                });
                message.save( (err) => {
                    if (err) { return next(err) }
                    res.redirect("/");
                })
            }
        }
]