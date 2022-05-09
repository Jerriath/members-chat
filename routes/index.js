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
router.get("/sign-up", user_controller.user_create_post)


//Exporting index router
module.exports = router;