exports.Posts = function(contentForm,req,res){

	res.send('Calling Function Post');

	var mysql = require('mysql');

	var connection = mysql.createConnection(
    {
      host     : 'danu2.it.nuigalway.ie',
      user     : 'mydb1155',
      password : 'mydb11555',
      database : 'mydb1155',
    }
	);

	var myID = 1;
	
	connection.query('INSERT INTO POSTS(posts_userID, posts_content) VALUES (?,?)', [myID,contentForm]);

	console.log('Content has been posted.');

	connection.end();


};