//Importing model(s)
const Message = require("../models/message");


//Importing necessary modules
const mongoose = require("mongoose");
const { body, validationResults } = require("express-validator");


//Exporting controller functions
exports.message_list = (req, res, next) => {

    Message.find({}).exec( (err, messages) => {
        if(err) return next(err);
        res.render("index", {
            messages: messages
        })
    })

}

exports.create_message_get = (req, res) => {
     
    res.render("message_form", { isUpdating: false });

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
            const errors = validationResults(req);
            if (!errors.isEmpty()) {
                res.render("message_form", {
                    message: req.body,
                    isUpdating: false,
                    errors: errors.array()
                })
                return;
            }
            else {
                let message = new Message({
                    title: req.body.title,
                    message: req.body.message
                });
                message.save( (err) => {
                    if (err) { return next(err) }
                    res.redirect("/");
                })
            }
        }
]