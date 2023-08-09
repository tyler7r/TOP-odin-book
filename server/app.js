var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
require('./passport');
const mongoose = require('mongoose');
const cors = require('cors');

var indexRouter = require('./routes/index');
const odinRouter = require('./routes/odinbook');
const guestRouter = require('./routes/guest');

var app = express();

mongoose.set('strictQuery', false);

const mongoDB = process.env.MONGO_URI;

const main = async () => {
  await mongoose.connect(mongoDB)
}
main().catch(err => console.log(err))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors({ exposedHeaders: 'Authorization' }))
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/odinbook', odinRouter);
app.use('/odinbook/g', guestRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
