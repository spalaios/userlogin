const express = require('express');
const ejs = require('ejs');
const path = require('path');
const logger = require('morgan');
var expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const app = express();




//set the views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//serve public files 
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static('public'));

//serve the files in uploads 

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        console.log('param '+param);
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;
  
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));

//app routes 

app.use('/', indexRouter);
app.use('/users', userRouter);
// app.use('/users', loginRouter);


app.use((req, res, next) => {
    const error = new Error('wrong http method applied to the given route');
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).send({
        message : 'Failure caught in the last error middleware',
        error : err
    });
});

module.exports = app;