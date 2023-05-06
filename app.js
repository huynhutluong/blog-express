require("dotenv").config();
require("./config/db.config").connect();
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let auth = require("./middleware/auth");

let indexRouter = require('./routes/index');
let registerRouter = require('./routes/register');
let loginRouter = require('./routes/login');
let articlesRouter = require('./routes/article');
let usersRouter = require('./routes/users')
let welcomeRouter = require('./routes/welcome');
let commentRouter = require('./routes/comment');
let relatedRouter = require('./routes/relatedArticle')
let cors = require('cors')

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/welcome', welcomeRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/posts', articlesRouter);
app.use('/api/v1/comments', commentRouter);
app.use('/api/v1/relatedArticles', relatedRouter);

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

