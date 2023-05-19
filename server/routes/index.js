var express = require('express');
var router = express.Router();
const passport = require('passport');
require('../passport');

router.get('/', (req, res, next) => {
  res.redirect('/odinbook')
});

module.exports = router;
