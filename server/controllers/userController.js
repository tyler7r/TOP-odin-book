const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');
const Post = require('../models/post');
const Request = require('../models/request')

exports.getUser = asyncHandler(async (req, res, next) => {
    let user = await User.findById(req.params.userId).populate('posts').populate('sentRequests').populate('receivedRequests').exec()
    res.status(200).json({
        user
    })
})

exports.home = asyncHandler(async (req, res, next) => {
    let posts = await Post.find().populate('author').populate({ path: 'comments', populate: { path: 'author'} }).limit(10).exec();
    let user = await User.findById(req.user._id).exec()

    res.status(200).json({
        posts: posts,
        friends: user.friends,
    })
})

exports.profile = asyncHandler(async (req, res, next) => {
    let userData = await User.findById(req.params.userId).populate('friends posts receivedRequests sentRequests').exec();
    let userPosts = await Post.find({ author: req.params.userId }).populate('author').populate('comments').exec();
    let receivedRequests = await Request.find({ receiver: req.params.userId, status: 'Pending' }).populate('sender').exec();

    res.status(200).json({
        message: 'Profile loaded succesfully',
        data: userData, 
        posts: userPosts,
        receivedRequests,
    })
})

exports.profileInfo = [
    body('bio').trim().isLength({ max: 160 }).withMessage('Bio can not exceed 160 characters'),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(403).json({
                message: 'Profile info update failed',
                errors: errors.array()
            })
        } else {
            await User.findByIdAndUpdate(req.params.userId, {
                profilePic: req.body.profilePic,
                profileBio: req.body.bio,
            }).exec();
            let user = await User.findById(req.params.userId);
            res.status(200).json({
                message: 'User profile updated',
                user,
            })
        }
    })
]

exports.index = asyncHandler(async (req, res, next) => {
    let users = await User.find({ _id: { $nin: [req.user._id] }, username: { $ne: 'guest' }}).populate('friends sentRequests receivedRequests').exec();

    res.status(200).json({
        users,
    })
})