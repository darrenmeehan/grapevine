exports.LoginUser = function (res, req) 
{

  var express = require('express');
  var http = require('http');
  var util = require('util');
  var path = require('path');
  var mysql = require('mysql');
  var fs = require('fs');

var connection = mysql.createConnection(
  {
  host     : 'danu2.it.nuigalway.ie',
  user     : 'mydb1155',
  password : 'mydb11555',
  database : 'mydb1155',
  }
  );
 
var queryString = 'SELECT username , password FROM USERS, WHERE username = ' + ' "user.usernameForm" AND ' + ' password = ' + ' "user.passwordform" ' ;
/*
connection.query(queryString, function(err, rows, fields) {
  if (err) throw err;

	console.log(rows[0]);
	
  if (rows[0] = null ) 
  {
  //  res.send("try again");
  console.log('try again!');
  }
  else 
  {
	console.log("User is logged in");
	console.log(queryString);
  }
  });*/
  
  connection.connect();

	connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;

  console.log('The solution is: ', rows[0].solution);
	});

	connection.end();
};
