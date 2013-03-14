var db = require('./DBManager.js');
var pw = require('./PageWriter.js');

console.log('Hello world');

dbm  = db.createDBManager();
pwtr = pw.createPageWriter();

console.log(pwtr.toString());

// we call a method to get data from the database
// because calls to MySQL are asynchronous, we need
// to pass in a callback function which hen gets called...

params = ["p1", "p2"]; //dummy params for the moment

result = dbm.getTimestampData(params, function(results) {
    console.log('Testing the results...');
    for (var i in results) {
        console.log(results[i].users_ID, results[i].users_email, results[i].users_timestamp);
    }	
});








