exports.RegisterUser = function(email,username,fullname,password,req,res){
	
	res.send('Calling Function Register User');
		
	var mysql = require('mysql');
	
	var connection = mysql.createConnection(
    {
      host     : 'danu2.it.nuigalway.ie',
      user     : 'mydb1155',
      password : 'mydb11555',
      database : 'mydb1155',
    }
);
	
	connection.query('INSERT INTO USERS(users_email, users_username, users_fullname, users_password) VALUES (?,?,?,?)', [email,username,fullname,password]);
	
	console.log('connection.query should have run now.');
	
	connection.end();


};
