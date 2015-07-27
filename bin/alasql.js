#!/usr/bin/env node
//
// Alacon - Command line interface for Alasql
// Version: 0.2.0
// Date: 27.07.2015
// (c) 2014-2015, Andrey Gershun & M. Rangel Wulff
//

var alasql = require('alasql');
var fs = require('fs');

if(process.argv.length <= 2) {
	console.log('AlaSQL command-line utility (version '+alasql.version+') ');
	console.log();
	console.log('Usage:');
	console.log('  alasql "sql-statement" [ params ]        - Run SQL statement');
	console.log('  alasql --file file.sql [ params ]        - (or -f) Run SQL from file');
	console.log('  alasql --version                         - (or -v) Echo AlaSQL version');
	console.log();
	console.log('Samples:');
	console.log('  alasql \'select 2+2\'');	
	console.log('  alasql \'select count(*) from txt()\' < city.txt');
	console.log('  alasql \'select * into xlsx("city.xlsx") from txt("city.txt")\'');
	console.log();
	return;
} 

var sql = process.argv[2];

var parami = 3;

if(sql === '-f' || sql === '--file' ) {
	if (!fs.existsSync(sql)) {
		console.log('File not found');
		return;
	}		sql = fs.readFile(sql).toString();
	parami++;
} else if(sql === '-v' || sql === '--version' ) {
	console.log(alasql.version); // Issue #373
	return;
}

var params = [];
for(var i=parami;i<process.argv.length;i++) {
	var a = process.argv[i];
	if(a[0] !== '"' && a[0] !== "'") {
		if(+a == a){					// jshint ignore:line
			a = +a;
		}
	}
	params.push(a);
}

alasql(sql,params,function(res){
	if(!alasql.options.stdout){
		console.log(res);
	}
});

