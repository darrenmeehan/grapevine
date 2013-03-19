var mysql = require('mysql');

// export the factory method to create the DBManager object
exports.createDBManager = function ()
{
  console.log('Creating DBManager object...');  
  return new DBManager();
}

function DBManager()
{
  this.connection = mysql.createConnection(
    {
	host     : 'danu2.it.nuigalway.ie',
	user     : 'mydb1155',
	password : 'mydb11555',
	database : 'mydb1155',
    }
  );  
}

//-------------------------- sample function ---------------------------
// KEY IDEA: Add a new function for every separate SQL query
DBManager.prototype.getTimestampData = function (params, callback)
{
  var result;

  this.connection.connect();
 
  var queryString = 'SELECT * FROM USERS';
 
  this.connection.query(queryString, function(err, results, fields) {
    if (err) throw err;

    callback(results); // this sends the results back to the function that called it

  });
 
  this.connection.end();  
}

// Function for loggin user in
DBManager.prototype.LoginUser = function(usernameForm, passwordForm, callback)
{
  var result;
  
  this.connection.connect();
  
  var queryString    = 'SELECT users_username, users_password FROM USERS WHERE users_username = ' + this.connection.escape(usernameForm) + 'AND users_password = ' + this.connection.escape(passwordForm);

  this.connection.query(queryString, function(err, results, fields) {
    if (err) throw err;

    callback(results); // this sends the results back to the function that called it

  });
 
  this.connection.end();  
}
  

  
