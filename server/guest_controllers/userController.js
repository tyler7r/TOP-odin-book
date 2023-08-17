const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');
const Post = require('../models/post');
const Request = require('../models/request')

exports.home = asyncHandler(async (req, res, next) => {
    const skip = req.query.skip && /^\d+$/.test(req.query.skip) ? Number(req.query.skip) : 0;

    let posts;

    if (req.query.view === 'popular') {
        posts = await Post.find({}, undefined, { skip, limit: 5 }).populate('author').populate({ path: 'comments', populate: { path: 'author'} }).sort({ 'interactions' : -1, '_id': 1 }).exec();
    } else {
        posts = await Post.find({}, undefined, { skip, limit: 5 }).populate('author').populate({ path: 'comments', populate: { path: 'author'} }).sort({ 'time' : -1, '_id': 1 }).exec();
    }

    res.status(200).json({
        posts
    })
})

exports.profile = asyncHandler(async (req, res, next) => {
    const skip = req.query.skip && /^\d+$/.test(req.query.skip) ? Number(req.query.skip) : 0;

    let userData = await User.findById(req.params.userId).populate('friends posts receivedRequests sentRequests').exec();
    let userPosts = await Post.find({ author: req.params.userId }, undefined, { skip, limit: 5 }).populate('author').populate({ path: 'comments', populate: { path: 'author'} }).sort({ 'time': -1, '_id': 1 }).exec();

    res.status(200).json({
        data: userData, 
        posts: userPosts,
    })
})

exports.index = asyncHandler(async (req, res, next) => {
    const skip = req.query.skip && /^\d+$/.test(req.query.skip) ? Number(req.query.skip) : 0;

    let users = null;

    if (req.query.mode === 'search') {
        users = await User.find({ $or: [ { 'username': { $regex: req.query.search }}, { 'first_name' : { $regex: req.query.search }}, { 'last_name' : { $regex: req.query.search }} ]}, undefined, { skip, limit: 5 }).populate('friends sentRequests receivedRequests').exec();
    } else {
        users = await User.find({}, undefined, { skip, limit: 5 }).populate('friends').sort({ username: 1 }).exec();
    }

    res.status(200).json({
        users,
    })
})

exports.userFriends = asyncHandler(async (req, res, next) => {
    const skip = req.query.skip && /^\d+$/.test(req.query.skip) ? Number(req.query.skip) : 0;

    let viewedUser = await User.findById(req.params.userId).populate('friends sentRequests receivedRequests').exec()

    let friends = null;

    if (req.query.mode === 'search') {
        friends = await User.find({ $and: [ { friends: req.params.userId }, { $or: [{ 'username': { $regex: req.query.search }}, { 'first_name' : { $regex: req.query.search }}, { 'last_name' : { $regex: req.query.search }}]}]}, undefined, { skip, limit: 5 }).populate('friends').exec();
    } else {
        friends = await User.find({ friends: req.params.userId }, undefined, { skip, limit: 5 }).populate('friends').exec()
    }

    res.status(200).json({
        viewedUser,
        friends,
    })
})