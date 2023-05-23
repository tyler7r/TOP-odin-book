const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');
const Post = require('../models/post');

exports.home = asyncHandler(async (req, res, next) => {
    let posts = await Post.find().populate('author').populate('comments').limit(10).exec();

    res.status(200).json({
        user: req.user,
        posts: posts,
    })
})