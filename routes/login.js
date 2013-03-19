var db = require('./DBManager.js');
var pw = require('./PageWriter.js');

dbm  = db.createDBManager();
pwtr = pw.createPageWriter();

var express = require('express')
  , http = require('http')
  , util = require('util')
  , path = require('path')
  , mysql = require('mysql')
  , fs = require('fs');

result = dbm.LoginUser(usernameForm,passwordForm, function(results) {
    console.log('User queried...');
    /*for (var i in results) {
        console.log(results[i].users_ID, results[i].users_email, results[i].users_timestamp);
    }*/

  if (results[0] == null ) 
  {
	//res.send("try again", 400);
	console.log('No matches - ACCESS DENIED.');
	res.redirect('/login');
  }
  else 
  {
	//res.send("User is logged in", 200);
	console.log('ACCESS GRANTED - logged in.');
	res.redirect('/post');
	//console.log(sql);
  }	
});