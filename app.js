const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require("cors");

const fileUpload = require('express-fileupload');

const hasAuthorization = require('./middlewares/auth');

const app = express();
app.use(cors());
app.disable('x-powered-by');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const bookRouter = require('./routes/book');
const loginController = require('./routes/auth');
const petRouter = require('./routes/pet');

app.use('/', indexRouter);
app.use('/login', loginController);
app.use('/users', usersRouter);
app.use('/api/books', hasAuthorization, bookRouter);
app.use('/api/pets', hasAuthorization, petRouter);

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
  console.log(err);
  // res.render('error');
});

module.exports = app;
