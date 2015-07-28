#!/usr/bin/env node
//
// Alacon - Command line interface for Alasql
// Version: 0.2.2
// Date: 28.07.2015
// (c) 2014-2015, Andrey Gershun & M. Rangel Wulff
//

var alasql = require('alasql');
var path = require('path');
var fs = require('fs');


/**
 * Is a Directory
 *
 * @param {String} filePath
 * @returns {Boolean}
 */
function isDirectory(filePath){
      	var isDir = false;
      	try {
      	      	var absolutePath = path.resolve(filePath);
      	      	isDir = fs.lstatSync(absolutePath).isDirectory();
      	} catch (e) {
      	      	isDir = e.code === 'ENOENT';
      	}
      	return isDir;
}


if(process.argv.length <= 2) {
	console.log('AlaSQL command-line utility (version '+alasql.version+')');
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
	process.exit(0);
} 


var sql = process.argv[2];

var parami = 3;

if(sql === '-v' || sql === '--version' ) {
	console.log(alasql.version); // Issue #373
	process.exit(0);
}

if(sql === '-f' || sql === '--file' ) {
	if(process.argv.length<=3){
		console.log('Error: filename missing');
		process.exit(1);
	}

	var filePath = path.resolve(process.argv[3]);

	if (!fs.existsSync(filePath)) {
		console.log('Error: file not found');
		process.exit(1);
	}	

	if (isDirectory(filePath)) {
		console.log('Error: file expected but directory found');
		process.exit(1);
	}

	sql = fs.readFileSync(filePath, 'utf8').toString();
	parami++;
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





 alasql.promise(sql,params)
      	.then(function(res){
      	      	if(!alasql.options.stdout){
			console.log(res);
		}
		process.exit(0);
      	}).catch(function(err){
      	      	console.log(err);
      	      	process.exit(1);
      	});





