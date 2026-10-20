#!/usr/bin/env node

//
// Command line interface for Alasql
// Version: 0.2.3
// Date: 28.07.2015
// (c) 2014-2022, Andrey Gershun & Mathias Wulff
//

let alasql = require('../dist/alasql.fs.js');
let path = require('path');
let fs = require('fs');
let yargs = require('yargs')
	.strict()
	.usage(
		'AlaSQL command-line utility (version ' +
			alasql.version +
			')\n\nUsage: $0 [options] [sql] [params]'
	)

	.example('$0 "sql-statement"', 'Run SQL statement and output result as JSON')
	.example('')
	.example("$0 'value of select 2+?' 40", 'Outputs 42')
	.example('')
	.example("$0 'select count(*) from txt()' < city.txt", 'Count lines in city.txt')
	.example('')
	.example(
		'$0 \'select * into xlsx("city.xlsx") from txt("city.txt")\'',
		'Convert from txt to xlsx'
	)
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

	.boolean('ast')
	.describe('ast', 'Print AST instead of result')
	.normalize('ast')

	/*.boolean('comp')
	.describe('comp', 'Print compiled function instead of result')
	.normalize('comp')*/

	.help('h')
	.alias('h', 'help')

	.epilog('\nMore information about the library: www.alasql.org');

let argv = yargs.argv;

// Regex patterns for detecting functions
const re = {
	txt: /txt\s*\(\s*\)/i,
};

// Helper function to check if SQL contains txt() and stdin is piped
function isPipeData(sql) {
	return sql && !process.stdin.isTTY && re.txt.test(sql);
}

// Helper function to setup stdin handling
function pipeIsSQL() {
	const stdin = process.openStdin();
	let pipedData = '';
	stdin.on('data', function (chunk) {
		pipedData += chunk;
	});
	stdin.on('end', function () {
		execute(pipedData, argv._);
	});
	return stdin;
}

// Helper function to load and validate SQL file
function loadSqlFile(filePath) {
	if (!fs.existsSync(filePath)) {
		console.error('Error: file not found');
		process.exit(1);
	}
	if (isDirectory(filePath)) {
		console.error('Error: file expected but directory found');
		process.exit(1);
	}
	return fs.readFileSync(filePath, 'utf8').toString();
}

// Main execution logic
function main() {
	let sql = '';
	let pipeIsData = false;

	if (argv.f) {
		sql = loadSqlFile(argv.f);
		pipeIsData = isPipeData(sql);
	} else {
		sql = argv._.shift() || '';
		pipeIsData = isPipeData(sql);
	}

	// Setup stdin handling only if not using txt() pipe
	if (!pipeIsData) {
		pipeIsSQL();
	}

	// Execute immediately if we have SQL or are using txt() pipe
	if (sql || pipeIsData) {
		execute(sql, argv._);
	}
}

if (argv.v) {
	console.log(alasql.version);
	process.exit(0);
}

main();

/**
 * Execute SQL query
 *
 * @sql {String} SQL query
 * @param {String} Parameters
 * @returns {null} Result will be printet to console.log
 */
function execute(sql, params) {
	if ('' === sql) sql = params.shift() || '';

	if (0 === sql.trim().length) {
		console.error('\nNo SQL to process\n');
		yargs.showHelp();
		process.exit(1);
	}

	for (var i = 1; i < params.length; i++) {
		var a = params[i];
		if (a[0] !== '"' && a[0] !== "'") {
			if (+a == a) {
				// jshint ignore:line
				params[i] = +a;
			}
		}
	}

	if (argv.ast) {
		try {
			console.log(formatOutput(alasql.parse(sql, params)));
			process.exit(0);
		} catch (e) {
			console.error(e);
			process.exit(1);
		}
	}

	/*if (argv.comp) {
		try {
			console.log(alasql.compile(sql, params));
			process.exit(0);
		} catch (e) {
			console.error(e);
			process.exit(1);
		}
	}*/

	alasql
		.promise(sql, params)
		.then(function (res) {
			if (!alasql.options.stdout) {
				console.log(formatOutput(res));
			}
			process.exit(0);
		})
		.catch(function (err) {
			let errorJsonObj = JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err)));
			console.error(
				formatOutput({
					error: errorJsonObj,
				})
			);
			process.exit(1);
		});
}

/**
 * Is this padh a Directory
 *
 * @param {String} filePath
 * @returns {Boolean}
 */
function isDirectory(filePath) {
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
function formatOutput(obj) {
	if (argv.m) {
		return JSON.stringify(obj);
	}
	return JSON.stringify(obj, null, 2);
}
