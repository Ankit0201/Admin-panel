const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv')

require('./db/db-connection')

const clientRoutes = require('./routes/client');
const generalRoutes = require('./routes/general');
const managementRoutes = require('./routes/management');
const saleRoutes = require('./routes/sales');

const app = express();
dotenv.config()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))

app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Define Routes

app.use('/client', clientRoutes);
app.use('/general', generalRoutes);
app.use('/management', managementRoutes);
app.use('/sales',saleRoutes);

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
  console.log(err)
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
