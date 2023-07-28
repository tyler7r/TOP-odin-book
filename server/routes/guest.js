var express = require('express');
var router = express.Router();
// const passport = require('passport');
// require('../passport');

// const auth_controller = require('../guest_controllers/authController');
const user_controller = require('../guest_controllers/userController');
const search_controller = require('../guest_controllers/searchController');
const post_controller = require('../guest_controllers/postController');

router.get('/', user_controller.home);

/// USER ROUTES ///

router.get('/users/index', user_controller.index)

router.get('/users/:userId', user_controller.profile);

router.get('/users/:userId/friends', user_controller.userFriends);

/// POST ROUTES ///

router.get('/:postId', post_controller.expand_post);

/// SEARCH ROUTES ///

router.get('/search/:topic', search_controller.search)

module.exports = router;