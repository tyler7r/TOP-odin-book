const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');

exports.login = asyncHandler(async (req, res, next) => {
    res.status(200).json({
        message: 'Login page loaded.'
    })
})