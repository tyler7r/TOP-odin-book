var express = require('express');
var router = express.Router();
const passport = require('passport');
require('../passport');

const auth_controller = require('../controllers/authController');
const user_controller = require('../controllers/userController');
const search_controller = require('../controllers/searchController');

router.post('/login', auth_controller.login);

router.post('/signup', auth_controller.signup);

router.get('/', passport.authenticate('jwt', { session: false }), user_controller.home);

/// USER ROUTES ///

router.get('/users/index', passport.authenticate('jwt', { session: false }), user_controller.index)

router.get('/info/:userId', user_controller.getUser);

router.get('/users/:userId', user_controller.profile);

router.get('/users/:userId/friends', passport.authenticate('jwt', { session: false }), user_controller.userFriends);

/// SEARCH ROUTES ///

router.get('/search/:topic', passport.authenticate('jwt', { session: false }), search_controller.search)

router.get('/search/index/:topic', passport.authenticate('jwt', { session: false }), search_controller.indexSearch);

router.get('/search/:userId/friends/:topic', passport.authenticate('jwt', { session: false }), search_controller.friendSearch);

module.exports = router;