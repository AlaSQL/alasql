if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

var test = '846';

describe('Test ' + test + ' - non-numeric values for SUM, MIN and MAX', function () {
	it('MAX dealing with non-numeric values', function () {
		var data = [
			{a: null, b: 9, c: true, c2: 1, d: null, e: 'XYZ1', f: new Number(2)},
			{a: null, b: 1, c: false, c2: false, d: 5, e: 'XYZ2', f: new Number(11)},
		];
		res = alasql(
			`SELECT 
				MAX(a) AS a, 
				max(b) as b, 
				mAx(c) as c, 
				mAx(c2) as c2, 
				MaX(d) as d,
				MAX(e) as e,	
				MAX(f) as f	
			FROM ?`,
			[data]
		);
		assert.deepEqual(res, [{a: null, b: 9, c: null, c2: 1, d: 5, e: null, f: 11}]);
	});

	it('MIN dealing with non-numeric values', function () {
		var data = [
			{a: null, b: 9, c: true, c2: 1, d: null, e: 'XYZ1', f: new Number(2)},
			{a: null, b: 1, c: false, c2: false, d: 5, e: 'XYZ2', f: new Number(11)},
		];
		res = alasql(
			`SELECT 
				MIN(a) AS a, 
				min(b) as b, 
				mIn(c) as c, 
				mIn(c2) as c2, 
				MiN(d) as d,
				MIN(e) as e,
				MIN(f) as f	
			FROM ?`,
			[data]
		);
		assert.deepEqual(res, [{a: null, b: 1, c: null, c2: 1, d: 5, e: null, f: 2}]);
	});

	it('SUM dealing with non-numeric values', function () {
		var data = [
			{a: null, b: 9, c: true, c2: 1, d: null, e: 'XYZ1', f: new Number(2)},
			{a: null, b: 1, c: false, c2: false, d: 5, e: 'XYZ2', f: new Number(11)},
		];
		res = alasql(
			`SELECT 
				SUM(a) AS a, 
				sum(b) as b, 
				sUm(c) as c, 
				sUm(c2) as c2, 
				SuM(d) as d,
				SUM(e) as e,
				SUM(f) as f	
			FROM ?`,
			[data]
		);
		assert.deepEqual(res, [{a: null, b: 10, c: null, c2: 1, d: 5, e: null, f: 13}]);
	});

	it('Simple select test', function (done) {
		// http://jsfiddle.net/agershun/38hj2uwy/3/
		var db = new alasql.Database();

		db.exec('CREATE TABLE person (name STRING, sex STRING, income INT)');

		db.tables.person.data = [
			{name: 'bill', sex: 'M', income: 50000},
			{name: 'sara', sex: 'F', income: 100000},
		];

		assert.deepEqual([{'SUM(income)': 150000}], db.exec('SELECT SUM(income) FROM person'));
		assert.deepEqual([{'SUM(name)': 0}], db.exec('SELECT SUM(name) FROM person'));
		assert.deepEqual([{'MAX(name)': 0}], db.exec('SELECT MAX(name) FROM person'));
		assert.deepEqual([{'MIN(name)': 0}], db.exec('SELECT MIN(name) FROM person'));
		done();
	});
});
