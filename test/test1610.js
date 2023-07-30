const assets = [
	'dist/alasql-echo.js',
	'dist/alasql-prolog.js',
	'test127.sql',
	'test128.sql',
	'test198-1.sql',
	'test198-2.sql',
	'test203myfn.js1',
	'test203myfn2.js1',
	'test305a.gexf',
	'test306.xml',
	'test306a.xml',
];

const fixtures = {};

if (typeof exports === 'object') {
	var fs = require('fs');
	var path = require('path');
	var alasql = require('..');
	globalThis.fixturesAssets = {};
	assets.forEach((asset) => {
		fixtures[asset] = fs.readFileSync(path.join(__dirname, asset), 'utf8');
	});
} else {
	before(async () => {
		return Promise.all(
			assets.map((asset) =>
				fetch(asset)
					.then((res) => res.text())
					.then((text) => {
						fixtures[asset] = text;
					})
			)
		);
	});
}

const load = alasql.utils.loadFile;
alasql.utils.loadFile = function (path, asy, cb, err) {
	if (asy) return load(...arguments);
	const file = assets.find(x => path.split('/').pop() === x.split('/').pop());
	return cb(fixtures[file])
};

describe('Test 000 - multiple statements', function () {
	const test = '000'; // insert test file number

	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	it('A) From single lines', function () {
		var res = [];
		res.push(alasql('create table one (a int)'));
		res.push(alasql('insert into one values (1),(2),(3),(4),(5)'));
		res.push(alasql('select * from one'));
		assert.deepEqual(res, [1, 5, [{a: 1}, {a: 2}, {a: 3}, {a: 4}, {a: 5}]]);
	});

	it('B) Multiple statements in one string', function () {
		//
		var sql = 'create table two (a int);';
		sql += 'insert into two values (1),(2),(3),(4),(5);';
		sql += 'select * from two;';
		var res = alasql(sql);
		assert.deepEqual(res, [1, 5, [{a: 1}, {a: 2}, {a: 3}, {a: 4}, {a: 5}]]);
	});

	it('C) Multiple statements in one string with callback', function (done) {
		// Please note that first parameter (here `done`) must be called if defined - and is needed when testing async code
		var sql = 'create table three (a int);';
		sql += 'insert into three values (1),(2),(3),(4),(5);';
		sql += 'select * from three;';
		alasql(sql, function (res) {
			assert.deepEqual(res, [1, 5, [{a: 1}, {a: 2}, {a: 3}, {a: 4}, {a: 5}]]);
			done();
		});
	});
});
