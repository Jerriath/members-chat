//Importing necessary modules
var express = require('express');
var router = express.Router();


//Importing controller modules
const message_controller = require("../controllers/messageController");
const user_controller = require("../controllers/userController");


// ----- MESSAGE ROUTES ----- //

// GET home page.
router.get('/', message_controller.index);


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
router.post("/admin", user_controller.user_admin_get)


//Exporting index router
module.exports = router;