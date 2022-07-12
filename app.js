require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/auth/login');
const registerRouter = require('./routes/auth/register');
const booksRouter = require('./routes/book');
const pengarangRouter = require('./routes/pengarang');
const profileRouter = require('./routes/profile');
const tentangRouter = require('./routes/tentang');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/buku', booksRouter);
app.use('/pengarang', pengarangRouter);
app.use('/profile', profileRouter);
app.use('/tentang', tentangRouter);

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }).then((db) => {

  db.connection.on('error', error => console.error(error));
  db.connection.once('open', () => console.log('koneksi database berhasil'));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(process.env.PORT || 3000)
