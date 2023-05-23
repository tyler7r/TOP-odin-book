const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');
const Post = require('../models/post');

exports.home = asyncHandler(async (req, res, next) => {
    let posts = await Post.find().populate('author').limit(10);

    res.status(200).json({
        user: req.user,
        posts: posts,
    })
})