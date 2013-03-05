exports.LoginUser = function (res, req) 
{

var express = require('express')
  , http = require('http')
  , util = require('util')
  , path = require('path')
  , mysql = require('mysql')
  , fs = require('fs');

var connection = mysql.createConnection(
  {
  host     : 'danu2.it.nuigalway.ie',
  user     : 'mydb1155',
  password : 'mydb11555',
  database : 'mydb1155',
  }
  );
 
var queryString = 'SELECT username,password FROM USERS WHERE username = ' + ' "user.usernameForm" AND ' + ' password = ' + ' "user.passwordform" ' ;

connection.query(queryString, function(err, rows, fields) {
  if (err) throw err;

  if (rows[0] = null ) 
  {
    res.send("try again");
  }
  else 
  {
	res.send("User is logged in");
	console.log(queryString);
  }
  });
};