#!/usr/bin/env node
//
// Alacon - Command line interface for Alasql
// Version: 0.1
// Date: 07.04.2015
// (c) 2014-2015, Andrey Gershun
//

var alasql = require('alasql');
var fs = require('fs');


if(process.argv.length <= 2) {
	console.log('alacon - Alasql command-line utility (version '+alasql.version+') ');
	console.log();
	console.log('Usage:');
	console.log('  node alacon "sql-statement" [ param0 ]... - run SQL statement');
	console.log('  node alacon -f file.sql [ param0 ]...     - run SQL from file');
	console.log();
	console.log('Samples:');
	console.log('  node alacon \'select 2+2\'');	
	console.log('  node alacon \'select count(*) from txt()\' <city.txt');
	console.log('  node alacon \'select * into xlsx("city.xlsx") from txt("city.txt")\'');
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
	var res = alasql(sql,params,function(res){
		if(!alasql.options.stdout) console.log(res);
	});
//	console.log(res);
};
