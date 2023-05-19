const asyncHandler = require('express-async-handler');
const { body, validationResult, check } = require('express-validator');
const User = require('../models/user');
require('dotenv').config();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = asyncHandler(async (req, res, next) => {
    try {
        passport.authenticate('local', { session: false}, (err, user, info) => {
            if (err || !user) {
                return res.status(400).json({
                    info: info,
                })
            }
            req.login(user, { session: false }, (err) => {
                if (err) {
                    next(err)
                }
                const token = jwt.sign({user}, process.env.SECRET_KEY, { expiresIn: '1d' })
                return res.status(200).json({
                    token: token,
                    user: user,
                })
            })
        })(req, res, next)
    } catch (err) {
        res.status(403).json({
            err: err,
        })
    }
})

exports.signup = [
    body('first_name').trim().isLength({ min: 2, max: 15 }).withMessage('First name must be between 2 and 15 characters'),
    body('last_name').trim().isLength({ min: 2, max: 15 }).withMessage('Last name must be between 2 and 15 characters'),
    body('username').trim().isLength({ min: 2, max: 15 }).withMessage('Username must be between 2 and 15 characters').escape(),
    body('password').trim().isLength({ min: 2 }).withMessage('Password must be at least 2 characters').escape(),
    check('confirm_password').trim().isLength({ min: 2 }).withMessage('Password must be at least 2 characters')
        .custom(async (confirmPassword, { req }) => {
            const password = req.body.password;
            if (password !== confirmPassword) {
                throw new Error('Passwords do not match')
            }
        }).escape(),
    
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            password: req.body.password,
        })
        if (!errors.isEmpty()) {
            return res.status(403).json({
                message: 'Sign Up',
                errors: errors.array()
            })
        } else {
            const userExists = await User.findOne({ username: req.body.username }).exec();
            if (userExists) {
                throw new Error('Username already exists')
            } else {
                bcrypt.hash(user.password, 10, async(err, hashedPassword) => {
                    if (err) {
                        return new Error('Hashing error')
                    } else {
                        user.password = hashedPassword;
                        await user.save();
                        res.status(200).json({
                            message: 'User created',
                            user: user,
                        })
                    }
                })
            }
        }
    })
]