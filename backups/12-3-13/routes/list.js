exports.ListAllUsers = function(req, res){

	var data = []; // holds data returned from query
	//var queryString = 'SELECT * FROM `USER` WHERE `username` = darrenmeehan';

	var mysql = require('mysql');
	var connection = mysql.createConnection(
	{
	host     : 'danu2.it.nuigalway.ie',
	user     : 'mydb1155',
	password : 'mydb11555',
	database : 'mydb1155',
	}
	);
	
		connection.connect();
		 
		var key = 'darrenmeehan'; 
		var queryString = 'SELECT * FROM USERS';

		connection.query(queryString, function(err, rows, fields) {
			if (err) throw err;
		 
			for (var i in rows) {
				console.log(rows[i]);
				
			}
		});
};