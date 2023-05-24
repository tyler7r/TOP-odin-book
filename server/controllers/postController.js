const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');
const Post = require('../models/post');

exports.create_post = [
    body('postText', 'Post must be specified').trim().isLength({ min: 1 }),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const post = new Post({
            text: req.body.postText,
            author: req.user._id,
        })
        if (!errors.isEmpty()) {
            return res.status(403).json({
                message: 'New Post',
                errors: errors.array(),
            })
        } else {
            await post.save()
            await User.findByIdAndUpdate(req.user._id, { $push: { posts: post }}).exec()
            let postI = await Post.findById(post.id).populate('author').exec();
            console.log(postI);
            res.status(200).json({
                message: 'Post created successfully',
                post: postI,
            })
        }
    })
]

exports.like_post = asyncHandler(async (req, res, next) => {
    let post = await Post.findById(req.params.postId).exec();
    if (post.likes.includes(req.user._id)) {
        await Post.findByIdAndUpdate(req.params.postId, { $pull: { likes: req.user._id }}).exec();
    } else {
        await Post.findByIdAndUpdate(req.params.postId, { $push: { likes: req.user._id }}).exec();
    }
    let posts = await Post.find().populate('author').limit(10).exec()
    res.status(200).json({
        message: 'Post liked successfully',
        posts: posts
    })
})

exports.delete_post = asyncHandler(async (req, res, next) => {
    await Post.findByIdAndRemove(req.params.postId).exec()
    let posts = await Post.find().limit(10).populate('author').exec();
    res.status(200).json({
        message: 'Post deleted successfully',
        posts: posts,
    })
})