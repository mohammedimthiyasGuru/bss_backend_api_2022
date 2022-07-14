var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');	
var fileUpload = require('express-fileupload');
var pdf = require('html-pdf');
const puppeteer = require('puppeteer');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
var fs = require('fs');
var pug = require ('pug');

/*Routing*/
var responseMiddleware = require('./middlewares/response.middleware');
var ActivityRouter = require('./routes/Activity.routes');

var employee_detailRouter = require('./routes/employee_detail.routes');
var emp_typeRouter = require('./routes/emp_type.routes');
var site_detailRouter = require('./routes/site_detail.routes');
var allocation_detailRouter = require('./routes/allocation_detail.routes');
var allocation_requestRouter = require('./routes/allocation_request.routes');
var attendanceRouter = require('./routes/attendance.routes');
var shift_attendance_detailRouter = require('./routes/shift_attendance_detail.routes');

var blooduserdetail = require('./routes/blooduserdetail.routes');
var blooddetail = require('./routes/blooddetail.routes');


/*Database connectivity*/

var BaseUrl = "http://3.101.19.51:3000"; 
const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/bss_smart_2022'); 
var db = mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
    console.log("connection succeeded"); 
}) 

var app = express();

app.use(fileUpload());
app.use(responseMiddleware());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('view engine', 'pug');

/*Response settings*/

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
  next();
});




app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api/', express.static(path.join(__dirname, 'public')));
app.use('/api/', express.static(path.join(__dirname, 'routes')));


app.use ('/api/activity', ActivityRouter);
app.use ('/api/employee_detail', employee_detailRouter);
app.use ('/api/site_detail', site_detailRouter);
app.use ('/api/allocation_detail', allocation_detailRouter);
app.use ('/api/allocation_request', allocation_requestRouter);
app.use ('/api/attendance', attendanceRouter);
app.use ('/api/emp_type', emp_typeRouter);

app.use ('/api/shift_attendance_detail',shift_attendance_detailRouter);

app.use ('/api/blooduserdetail', blooduserdetail);
app.use ('/api/blooddetail', blooddetail);



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
