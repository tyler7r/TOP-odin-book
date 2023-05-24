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

exports.profile = asyncHandler(async (req, res, next) => {
    let userData = await User.findById(req.params.userId).populate('friends').populate('posts').exec();
    let userPosts = await Post.find({ author: req.params.userId }).populate('author').populate('comments').exec();

    res.status(200).json({
        message: 'Profile loaded succesfully',
        data: userData, 
        posts: userPosts,
    })
})