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
	console.log('    node alacon "sql-statement" param0 param1...');
	console.log('    node alacon -f file.sql param0 param1...');
	console.log();
} else if(process.argv.length > 2) {
	var sql = process.argv[2];
	console.log(sql);
	sql = fs.readFile(sql).toString();

	if((sql.substr(0,1) == '"' && sql.substr(-1) == '"')||(sql.substr(0,1) == '\'' && sql.substr(-1) == '\'')) {
		sql = sql.substr(1,sql.length-2);
	var params = [];
	}
	for(var i=1;i<process.argv.length;i++) {
		params.push(process.argv[i]);
	};
	var res = alasql(sql);
	console.log(res);
};
