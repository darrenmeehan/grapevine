
/**
 * Module dependencies.
 */

var express = require('express')
  //, routes = require('./routes')
 // , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , register = require('./routes/register')
 // , list = require('./routes/list')
  , mysql = require('mysql')
  , fs = require('fs')
  , passport = require('passport')
  , LocalStrategy = require('passport-local')
  , Sequelize = require("sequelize"); //to be used for mySQL db http://www.sequelizejs.com/


var sequelize = new Sequelize('mydb1155', 'mydb1155', 'mydb11555', {
  host: "danu2.it.nuigalway.ie",
 // port: 12345
})

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 8777);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(passport.initialize());
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var Evt_list        = require('./routes/list');
var Evt_login       = require('./routes/login');
var Evt_register    = require('./routes/register');
var Evt_post    = require('./routes/post');

app.get('/', function (req, res) {
  console.log("Calling Root"); 
  var submitForm = fs.readFileSync('form.html'); 
  //res.writeHead(200, {'Content-type': 'text/html'});
  res.end(submitForm);
});

app.get('/list', function (req, res) {
  console.log("Calling /list");
  Evt_list.ListAllUsers(req, res); 
});

app.get('/login', function (req, res) {
  console.log("Calling /login"); 
  var submitForm = fs.readFileSync('login.html'); 
  //res.writeHead(200, {'Content-type': 'text/html'});
  res.end(submitForm);
});

app.post('/login', express.bodyParser(), function(req, res) {
    console.log("Calling /login", req.body.usernameForm, ":", req.body.passwordForm);
    Evt_login.LoginUser(req.body.usernameForm, req.body.passwordForm, req, res );
});

app.get('/post', function (req, res) {
  console.log("Calling /post"); 
  var submitForm = fs.readFileSync('post.html');  //**********
  //res.writeHead(200, {'Content-type': 'text/html'});
  res.end(submitForm);
});

app.post('/post', express.bodyParser(), function(req, res) {
    console.log("Calling /post", req.body.contentForm); //**********
    Evt_post.Posts(req.body.contentForm, req, res );
});

app.post('/register', express.bodyParser(), function(req, res) {
    console.log("Calling /register", req.body.email, ":", req.body.username, ":", req.body.fullname, ":", req.body.password);
    Evt_register.RegisterUser(req.body.email, req.body.username, req.body.fullname, req.body.password, req, res );
});


/* old login, keeping while I test out new one 
app.post('/login', express.bodyParser(), function(req, res) {
    console.log("Calling /login", req.body.username, ":" ,req.body.password);
    passport.use(req.body.username, req.body.password, req, res );
});
*/

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

