var alasql = require('../alasql.js');

var filename = './test1.json';

// Check if database exists
alasql.utils.fileExists(filename, function (res) {
	//	console.log('res',res);
	if (!res) {
		// Create database
		alasql('CREATE FILESTORAGE DATABASE test1("./test1.json")');
		alasql('ATTACH FILESTORAGE DATABASE test1("./test1.json")');
		alasql('USE test1');
		alasql('CREATE TABLE one(a int, b string);');
		alasql('INSERT INTO one VALUES (10,"alala")');
		alasql('DETACH DATABASE test1');
	}
	// Use database

	alasql('ATTACH FILESTORAGE DATABASE test1("./test1.json")');
	alasql('USE test1');
	alasql('INSERT INTO one VALUES (20,"alala")');
	var res = alasql('SELECT VALUE COUNT(*) FROM one');
	console.log(res);
	//console.log(alasql.databases.test1);
});
