var express = require('express');
var router = express.Router();
// const passport = require('passport');
// require('../passport');

// const auth_controller = require('../guest_controllers/authController');
const user_controller = require('../guest_controllers/userController');
const search_controller = require('../guest_controllers/searchController');

router.get('/', user_controller.home);

/// USER ROUTES ///

router.get('/users/index', user_controller.index)

// router.get('/info/:userId', user_controller.getUser);

router.get('/users/:userId', user_controller.profile);

router.get('/users/:userId/friends', user_controller.userFriends);

/// SEARCH ROUTES ///

router.get('/search/:topic', search_controller.search)

router.get('/search/index/:topic', search_controller.indexSearch);

router.get('/search/:userId/friends/:topic', search_controller.friendSearch);

module.exports = router;