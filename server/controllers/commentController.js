const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');

exports.create_comment = [
    body('comment', 'Comment must be specified').trim().isLength({ min: 1 }),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const comment = new Comment({
            text: req.body.comment,
            author: req.user._id,
            post: req.params.postId
        })
        if (!errors.isEmpty()) {
            return res.status(403).json({
                message: 'New comment failed',
                errors: errors.array(),
            })
        } else {
            await comment.save()
            await Post.findByIdAndUpdate(req.params.postId, { $push: { comments: comment }}).exec()
            let posts = await Post.find().limit(10).populate('author').exec()
            let post = await Post.findById(req.params.postId).populate('author').populate('comments').exec()
            res.status(200).json({
                message: 'Comment created successfully',
                comment: comment,
                post: post,
                posts: posts,
            })
        }
    })
]

exports.like_comment = asyncHandler(async (req, res, next) => {
    let comment = await Comment.findById(req.params.commentId).exec();
    if (comment.likes.includes(req.user._id)) {
        await Comment.findByIdAndUpdate(req.params.commentId, { $pull: { likes: req.user._id }}).exec()
    } else {
        await Comment.findByIdAndUpdate(req.params.commentId, { $push: { likes: req.user._id }}).exec()
    }
    let post = await Post.findById(req.params.postId).populate('author').populate('comments').exec()
    res.status(200).json({
        message: 'Comment liked successfully',
        comment: comment,
        post: post,
    })
})

exports.delete_comment = asyncHandler(async (req, res, next) => {
    await Post.findByIdAndUpdate(req.params.postId, { $pull: { comments: req.params.commentId }}).exec();
    await Comment.findByIdAndRemove(req.params.commentId).exec();
    let post = await Post.findById(req.params.postId).populate('comments').populate('author').exec();
    let comments = post.comments;
    res.status(200).json({
        message: 'Comment deleted successfully',
        comments: comments,
        post: post,
    })
})