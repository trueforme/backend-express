var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => { 
    if (req.query.auth !== 'true'){
        return res.status(401).send('lox');
    }
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
