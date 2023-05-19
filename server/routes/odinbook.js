var express = require('express');
var router = express.Router();
const passport = require('passport');
require('../passport');

const auth_controller = require('../controllers/authController');
const user_controller = require('../controllers/userController');

router.post('/login', auth_controller.login);

router.post('/signup', auth_controller.signup);

module.exports = router;