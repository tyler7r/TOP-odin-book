const asyncHandler = require('express-async-handler');
const { body, validationResult, check } = require('express-validator');
const User = require('../models/user');
require('dotenv').config();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

