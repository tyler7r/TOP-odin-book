var express = require('express');
var router = express.Router();
const passport = require('passport');
require('../passport');

const auth_controller = require('../controllers/authController');
const user_controller = require('../controllers/userController');
const post_controller = require('../controllers/postController');

router.post('/login', auth_controller.login);

router.post('/signup', auth_controller.signup);

router.get('/', passport.authenticate('jwt', { session: false }), user_controller.home);

router.post('/create/post', passport.authenticate('jwt', { session: false }), post_controller.create_post);

module.exports = router;