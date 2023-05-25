var express = require('express');
var router = express.Router();
const passport = require('passport');
require('../passport');

const auth_controller = require('../controllers/authController');
const user_controller = require('../controllers/userController');
const post_controller = require('../controllers/postController');
const comment_controller = require('../controllers/commentController');
const request_controller = require('../controllers/requestController');
const request = require('../models/request');

router.post('/login', auth_controller.login);

router.post('/signup', auth_controller.signup);

router.get('/', passport.authenticate('jwt', { session: false }), user_controller.home);

/// USER ROUTES ///

router.get('/info/:userId', user_controller.getUser);

router.get('/users/:userId', user_controller.profile);

/// POST ROUTES ///

router.post('/create/post', passport.authenticate('jwt', { session: false }), post_controller.create_post);

router.get('/:postId/like', passport.authenticate('jwt', { session: false }), post_controller.like_post);

router.get('/:postId/delete', passport.authenticate('jwt', { session: false }), post_controller.delete_post);

/// COMMENT ROUTES ///

router.post('/:postId/create/comment', passport.authenticate('jwt', { session: false }), comment_controller.create_comment);

router.get('/:postId/:commentId/like', passport.authenticate('jwt', { session: false }), comment_controller.like_comment);

router.get('/:postId/:commentId/delete', passport.authenticate('jwt', { session: false }), comment_controller.delete_comment);

/// REQUEST ROUTES ///

router.get('/:userId/request', passport.authenticate('jwt', { session: false }), request_controller.sendRequest);

router.get('/:requestId/accept', passport.authenticate('jwt', { session: false }), request_controller.acceptRequest);

router.get('/:requestId/reject', passport.authenticate('jwt', { session: false }), request_controller.rejectRequest);

module.exports = router;