var express = require('express')
  , http = require('http')
  , path = require('path')
  , register = require('./routes/register')
  , mysql = require('mysql')
  , fs = require('fs');

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
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var Evt_list        = require('./routes/list');
var Evt_login       = require('./routes/login');
var Evt_register    = require('./routes/register');
var Evt_post        = require('./routes/post');
var db              = require('./routes/DBManager.js');
var pageW = require('./routes/PageWriter.js');


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

//----------------------------------------------------------------------
// new function that calls the database and creates dynamic content
app.get('/dbtest', function (req, res) {
  console.log("Calling Test for database access"); 
  var dbm  = db.createDBManager();     // create a DBManager object
  var pw   = pageW.createPageWriter(); // create a PageWriter object

  params = ["p1", "p2"]; //dummy params for the moment, these can be used later

  // note that because mysql calls are asynchronous we
  // need the function delaration inside the function call as it
  // acts as a callback.
  dbm.getTimestampData(params, function(results) {
        // when the sql calls are complete, this code gets called
        // see the line  callback(results); in DBManager
        pw.addHeader();
        pw.addMenu();    
        pw.addContent(results);
        pw.addRealTime();
        pw.addFooter();

        res.writeHead(200, {'Content-type': 'text/html'});
        res.end(pw.toString());  
  });
});


//----------------------------------------------------------------------
// same as previous example
app.get('/pagewriter', function (req, res) {
  console.log("Calling Test for PageWriter"); 
  var pw = pageW.createPageWriter();

  pw.addHeader();
  pw.addMenu();
  pw.addContent();
  pw.addRealTime();
  pw.addFooter();

  res.writeHead(200, {'Content-type': 'text/html'});
  res.end(pw.toString());
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

