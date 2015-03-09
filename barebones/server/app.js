var express = require('express');
var path = require('path');

var routes = require('./routes/index');
var users = require('./routes/users');
var presentations = require('./routes/presentations');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// serve static content out of public
app.use(express.static('../www'));

app.use('/api', routes);
app.use('/api',users);
app.use('/api',presentations);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
        
 
app.listen(3000);
console.log("listening on port 3000!");
module.exports = app;



