//Importing necessary modules
var express = require('express');
var router = express.Router();


//Importing controller modules
const message_controller = require("../controllers/messageController");
const user_controller = require("../controllers/userController");
const message = require('../models/message');


// ----- MESSAGE ROUTES ----- //

// GET request for home page.
router.get('/', message_controller.index);

//GET request for creating message
router.get("/create-message", message_controller.create_message_get);

//POST request for creating message
router.post("/create-message", message_controller.create_message_post);

//POST request for deleteing message
router.post("/", message_controller.delete_message_post);


// ----- USER ROUTES ----- //

// GET request for creating user
router.get("/sign-up", user_controller.user_create_get);

// POST request for creating user
router.post("/sign-up", user_controller.user_create_post);

// GET request for logging in
router.get("/log-in", user_controller.user_login_get);

// GET request for loggin out
router.get("/log-out", user_controller.user_logout_get);

// POST request for logging in
router.post("/log-in", user_controller.user_login_post);

// GET request for becoming a member
router.get("/member", user_controller.user_member_get);

// POST request for becoming a member 
router.post("/member", user_controller.user_member_post)

// GET request for becoming an admin
router.get("/admin", user_controller.user_admin_get);

// POST request for becoming an admin 
router.post("/admin", user_controller.user_admin_post)


//Exporting index router
module.exports = router;