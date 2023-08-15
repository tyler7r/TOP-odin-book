var express = require('express');
var router = express.Router();
const passport = require('passport');
require('../passport');

router.get('/', (req, res, next) => {
  // res.redirect('/odinbook')
  // res.send('Hello')
  // res.redirect('/odinbook/g/home')
  res.send('Hello from Express!')
});

module.exports = router;
