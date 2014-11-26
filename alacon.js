//
// Alacon - Command line interface for Alasql
// Date: 25.11.2014
// (c) 2014, Andrey Gershun
//

var alasql = require('./alasql.js');
var fs = require('fs');


if(process.argv.length <= 2) {
	console.log('ALACON - Alasql command-line utility (cersion '+alasql.version+') ');
	console.log();
	console.log('Usage:');
	console.log('    node alacon "sql-statement" [ param0 ]... - run SQL statement');
	console.log('    node alacon -f file.sql [ param0 ]...     - run SQL from file');
	console.log();
} else if(process.argv.length > 2) {
	var sql = process.argv[2];
	var parami = 3;
	if(sql == '-f') {
		console.log(sql);
		sql = fs.readFile(sql).toString();
		parami++;
	}

	var params = [];
	for(var i=parami;i<process.argv.length;i++) {
		var a = process.argv[i];
		if(a[0] != '"' && a[0] != "'") {
			if(+a == a) a = +a;
		}
		params.push(a);
	};
	var res = alasql(sql,params);
	console.log(res);
};
