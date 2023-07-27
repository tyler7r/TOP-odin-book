const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const Post = require('../models/post');

exports.search = asyncHandler(async (req, res, next) => {
    const skip = req.query.skip && /^\d+$/.test(req.query.skip) ? Number(req.query.skip) : 0;

    let posts;
    let users;

    if (req.query.view === 'posts') {
        posts = await Post.find({ 'text': { $regex: req.params.topic }}, undefined, { skip, limit: 2 }).populate('author').populate({ path: 'comments', populate: { path: 'author' } }).sort({ 'time': -1 }).exec();
    } else if (req.query.view === 'users') {
        users = await User.find({  $or: [ { 'username': { $regex: req.params.topic }}, { 'first_name' : { $regex: req.params.topic }}, { 'last_name' : { $regex: req.params.topic }} ]}, undefined, { skip, limit: 1 }).populate('friends sentRequests receivedRequests').exec();
    }

    res.status(200).json({
        posts,
        users
    })
})

exports.friendSearch = asyncHandler(async (req, res, next) => {
    const skip = req.query.skip && /^\d+$/.test(req.query.skip) ? Number(req.query.skip) : 0;

    let results = await User.find({ $and: [ { friends: req.params.userId }, { $or: [{ 'username': { $regex: req.params.topic }}, { 'first_name' : { $regex: req.params.topic }}, { 'last_name' : { $regex: req.params.topic }}]}]}, undefined, { skip, limit: 3 }).populate('friends').exec();

    res.status(200).json({
        results,
    })
})

exports.indexSearch = asyncHandler(async (req, res, next) => {
    const skip = req.query.skip && /^\d+$/.test(req.query.skip) ? Number(req.query.skip) : 0;

    let results = await User.find({ $or: [{ 'username': { $regex: req.params.topic }}, { 'first_name' : { $regex: req.params.topic }}, { 'last_name' : { $regex: req.params.topic }}]}, undefined, { skip, limit: 3 }).populate('friends').exec();

    res.status(200).json({
        results
    })
})