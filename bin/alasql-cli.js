#!/usr/bin/env node
//
// Command line interface for Alasql
// Version: 0.2.2
// Date: 28.07.2015
// (c) 2014-2015, Andrey Gershun & M. Rangel Wulff
//

var alasql = require('alasql');
var path = require('path');
var fs = require('fs');
var yargs = require('yargs')
	.demand(1)
	.strict()
    .usage('AlaSQL command-line utility (version '+alasql.version+')\n\nUsage: $0 [options] [sql] [params]')
    
    .example('$0 "sql-statement"', 'Run SQL statement and output result as JSON')
    .example('')
    .example('$0 \'value of select 2+?\' 40', 'Outputs 42')
    .example('')
	.example('$0 \'select count(*) from txt()\' < city.txt', 'Count lines in city.txt')
    .example('')
	.example('$0 \'select * into xlsx("city.xlsx") from txt("city.txt")\'', 'Convert from txt to xlsx')
    .example('')
    .example('$0 --file file.sql France 1960', 'Run SQL from file with 2 parameters')
    
    .version('v', 'Echo AlaSQL version', alasql.version)
    .alias('v', 'version')

    .boolean('m')
    .describe('m', 'Minify json output')
    .alias('m', 'minify')

    .describe('f', 'Load SQL from file')
    .alias('f', 'file')
    .nargs('f', 1)
    .normalize('f')

    .help('h')
    .alias('h', 'help')

    .epilog('\nMore information about the library: www.alasql.org')
var argv = yargs.argv;
var sql = '';
var params = [];


if(argv.v) {
	console.log(alasql.version); 
	process.exit(0);
}

if(argv.f) {
	if (!fs.existsSync(argv.f)) {
		console.log('Error: file not found');
		process.exit(1);
	}	

	if (isDirectory(argv.f)) {
		console.log('Error: file expected but directory found');
		process.exit(1);
	}

	sql = fs.readFileSync(argv.f, 'utf8').toString();
} else {
	sql = argv._.shift() || '';
}

params = argv._;

if(0===sql.trim().length){
	yargs.showHelp();
	process.exit(1);
}

for(var i=1;i<params.length;i++) {
	var a = params[i];
	if(a[0] !== '"' && a[0] !== "'") {
		if(+a == a){					// jshint ignore:line
			params[i] = +a;
		}
	}
}

alasql.promise(sql,params)
	.then(function(res){
		if(!alasql.options.stdout){
			console.log(formatOutput(res));
		}
		process.exit(0);
	}).catch(function(err){
		console.log(formatOutput({error:err}));
		process.exit(1);
	});


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


/**
 * Format output
 *
 * @param {Object} Object to be formatted according to -p flag
 * @returns {JSON string}
 */
function formatOutput(obj){
	if(argv.m){
		return JSON.stringify(obj);
	}
	return JSON.stringify(obj, null, 2);
}



