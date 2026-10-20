// Async select

var db = require('alasql');

db('CREATE TABLE test (language INT, hello STRING)');
db("INSERT INTO test VALUES (1,'Hello!')");
db("INSERT INTO test VALUES (2,'Aloha!')");
db("INSERT INTO test VALUES (3,'Bonjour!')");

db.promise('SELECT * FROM test WHERE language > 1').then(function (res) {
	console.log(res);
});
