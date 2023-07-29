const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');
const Post = require('../models/post');
const Request = require('../models/request');

exports.sendRequest = asyncHandler(async (req, res, next) => {
    let requestPending = await Request.findOne({ sender: req.user._id, receiver: req.params.userId, status: 'Pending' }).exec();

    const sendingUser = async() => {
        return await User.findById(req.user._id).populate('sentRequests receivedRequests posts friends').exec();
    }
    const receivingUser = async() => {
        return await User.findById(req.params.userId).populate('sentRequests receivedRequests posts friends').exec();
    }

    if (requestPending) {
        await User.findByIdAndUpdate(req.user._id, { $pull: { sentRequests: requestPending._id }}).exec();
        await User.findByIdAndUpdate(req.params.userId, { $pull: { receivedRequests: requestPending._id }}).exec();
        await Request.findByIdAndRemove(requestPending._id).exec();

        res.status(200).json({
            message: 'Request unsent',
            sendingUser: await sendingUser(),
            receivingUser: await receivingUser(),
        })
    } else {
        let request = new Request({
            sender: req.user._id,
            receiver: req.params.userId,
            status: 'Pending',
        })
        await request.save();
        await User.findByIdAndUpdate(req.user._id, { $push: { sentRequests: request._id }, $pull: { friends: req.params.userId }});
        await User.findByIdAndUpdate(req.params.userId, { $push: { receivedRequests: request._id }, $pull: { friends: req.user._id }});
    
        res.status(200).json({
            message: 'Message sent successfully',
            request,
            sendingUser: await sendingUser(),
            receivingUser: await receivingUser(),
        })
    }
})

exports.unfriendUser = asyncHandler(async (req, res, next) => {
    await User.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.user._id }}).exec();
    await User.findByIdAndUpdate(req.user._id, { $pull: { friends: req.params.userId }}).exec();

    let currentUser = await User.findById(req.user._id).exec();
    let profileUser = await User.findById(req.params.userId).exec();

    res.status(200).json({
        message: 'User unfriended',
        sendingUser: currentUser,
        receivingUser: profileUser,
        profileUser,
    })
})

exports.acceptRequest = asyncHandler(async (req, res, next) => {
    let request = await Request.findById(req.params.requestId).populate('sender receiver').exec();
    await User.findByIdAndUpdate(request.sender._id, { $push: { friends: request.receiver._id }, $pull: { sentRequests: request._id }}).exec();
    await User.findByIdAndUpdate(request.receiver._id, { $push: { friends: request.sender._id }, $pull: { receivedRequests: request._id }}).exec();
    await Request.findByIdAndRemove(req.params.requestId).exec()

    let sender = await User.findById(request.sender._id).populate('friends sentRequests receivedRequests').exec();
    let receiver = await User.findById(request.receiver._id).populate('friends sentRequests receivedRequests').exec();
    let receivedRequests = await Request.find({ receiver: request.receiver._id, status: 'Pending' }).populate('sender receiver').exec()

    res.status(200).json({
        message: 'Request accepted',
        sender,
        receiver,
        receivedRequests,
    })
})

exports.rejectRequest = asyncHandler(async (req, res, next) => {
    let request = await Request.findById(req.params.requestId).populate('sender receiver').exec();
    await User.findByIdAndUpdate(request.sender._id, { $pull: { sentRequests: request._id }}).exec();
    await User.findByIdAndUpdate(request.receiver._id, { $pull: { receivedRequests: request._id }}).exec();
    await Request.findByIdAndRemove(req.params.requestId).exec();

    let receivedRequests = await Request.find({ receiver: request.receiver._id, status: 'Pending' }).populate('sender receiver').exec()

    res.status(200).json({
        message: 'Request rejected',
        receivedRequests,
    })
})

