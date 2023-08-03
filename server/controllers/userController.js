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
    const skip = req.query.skip && /^\d+$/.test(req.query.skip) ? Number(req.query.skip) : 0;

    let user = await User.findById(req.user._id).exec();

    let friends = user.friends;

    let posts;

    if (req.query.feed === 'friends') {
        posts = await Post.find({ author: friends }, undefined, { skip, limit: 5 }).populate('author').populate({ path: 'comments', populate: { path: 'author'}}).sort({ 'time': -1 }).exec()
    } else if (req.query.feed === 'popular') {
        posts = await Post.find({}, undefined, { skip, limit: 5 }).populate('author').populate({ path: 'comments', populate: { path: 'author'} }).sort({ 'interactions' : -1, '_id': 1 }).exec();
    } else {    
        posts = await Post.find({}, undefined, { skip, limit: 5 }).populate('author').populate({ path: 'comments', populate: { path: 'author'} }).sort({ 'time' : -1 }).exec();
    }

    res.status(200).json({
        posts,
        friends
    })
})

exports.profile = asyncHandler(async (req, res, next) => {
    const skip = req.query.skip && /^\d+$/.test(req.query.skip) ? Number(req.query.skip) : 0;

    let userData = await User.findById(req.params.userId).populate('friends posts receivedRequests sentRequests').exec();
    let userPosts = await Post.find({ author: req.params.userId }, undefined, { skip, limit: 5 }).populate('author').populate({ path: 'comments', populate: { path: 'author'} }).sort({ '_id': -1 }).sort({ 'time': -1 }).exec();
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
    const skip = req.query.skip && /^\d+$/.test(req.query.skip) ? Number(req.query.skip) : 0;

    let users;

    let currentUser = await User.findById(req.user._id).populate('friends').exec()
    let otherUsers;

    if (req.query.mode === 'search') {
        users = await User.find({ $and: [{ $or: [{ 'username': { $regex: req.query.search }}, { 'first_name' : { $regex: req.query.search }}, { 'last_name' : { $regex: req.query.search }} ]}, { '_id': { $ne: [req.user._id] } }]}, undefined, { skip, limit: 1 }).populate('friends sentRequests receivedRequests').exec();
    } else {
        if (skip === 0) {
            otherUsers = await User.find({ _id: { $ne: [req.user._id] }}, undefined, { skip, limit: 1 }).populate('friends sentRequests receivedRequests').sort({ last_name: 1 }).exec();
            users = [currentUser, ...otherUsers]
        } else {
            otherUsers = await User.find({ _id: { $ne: [req.user._id] }}, undefined, { skip: (skip - 1), limit: 1 }).populate('friends sentRequests receivedRequests').sort({ last_name: 1 }).exec();
            users = [...otherUsers]
        }
    }

    res.status(200).json({
        users,
    })
})

exports.userFriends = asyncHandler(async (req, res, next) => {
    const skip = req.query.skip && /^\d+$/.test(req.query.skip) ? Number(req.query.skip) : 0;

    let viewedUser = await User.findById(req.params.userId).populate('friends sentRequests receivedRequests').exec()

    let friends;

    let allFriends = await User.find({ friends: req.params.userId }, undefined, { skip, limit: 1 }).populate('friends sentRequests receivedRequests').sort({ last_name: 1 }).exec()

    let currentUser = await User.findById(req.user._id).populate('friends').exec();

    let currentUserFriends = currentUser.friends

    if (req.query.mode === 'search'){
        friends = await User.find({ $and: [ { friends: req.params.userId }, { $or: [{ 'username': { $regex: req.query.search }}, { 'first_name' : { $regex: req.query.search }}, { 'last_name' : { $regex: req.query.search }}]}]}, undefined, { skip, limit: 1 }).populate('friends').exec();
    } else {
        if (currentUserFriends.includes(req.params.userId)) {
            if (skip === 0) {
                friends = [currentUser, ...allFriends];
            } else {
                friends = [...allFriends]
            }
        } else {
            friends = [...allFriends];
        }
    }

    res.status(200).json({
        viewedUser,
        friends,
    })
})