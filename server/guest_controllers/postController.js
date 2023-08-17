const asyncHandler = require('express-async-handler');
const Post = require('../models/post');
const Comment = require('../models/comment')

exports.expand_post = asyncHandler(async (req, res, next) => {
    const skip = req.query.skip && /^\d+$/.test(req.query.skip) ? Number(req.query.skip) : 0;

    let post = await Post.findById(req.params.postId).populate('author').populate({ path: 'comments', populate: { path: 'author'}}).exec();
    let comments = await Comment.find({ post: req.params.postId }, undefined, { skip, limit: 5 }).populate('author').sort({ 'time': -1, '_id': 1 }).exec()

    res.status(200).json({
        post,
        comments
    })
})