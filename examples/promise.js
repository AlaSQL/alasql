    var alasql = require('..');

    alasql.exec("CREATE TABLE test (language INT, hello STRING)");
    alasql.exec("INSERT INTO test VALUES (1,'Hello!')");
    alasql.exec("INSERT INTO test VALUES (2,'Aloha!')");
    alasql.exec("INSERT INTO test VALUES (3,'Bonjour!')");

    alasql.aexec("SELECT * FROM test WHERE language > 1").then(function(res){
	    console.log(res);
    });