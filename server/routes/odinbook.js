var express = require('express');
var router = express.Router();
const passport = require('passport');
require('../passport');

const user_controller = require('../controllers/userController');

router.get('/', user_controller.login);

module.exports = router;