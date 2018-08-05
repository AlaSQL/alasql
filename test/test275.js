if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var _ = require('lodash');
} else {
	__dirname = '.';
}

describe('Test 275 INNER JOIN on empty tables', function() {
	it('1. Prepare databases', function(done) {
		alasql('CREATE DATABASE test275; USE test275');
		alasql('CREATE TABLE one0 (a INT, b NVARCHAR(10))');
		alasql('CREATE TABLE one1 (a INT, b NVARCHAR(10))');
		alasql('INSERT INTO one1 VALUES (1,"One"), (2,"Two"), (3,"Three"), (4,"Four")');

		alasql('CREATE TABLE two0 (b NVARCHAR(10), c INT)');
		alasql('CREATE TABLE two1 (b NVARCHAR(10), c INT)');
		alasql('INSERT INTO two1 VALUES ("One",10), ("Two",20), ("Three",30), ("Five",50)');
		alasql.options.modifier = 'RECORDSET';
		done();
	});

	it('2. INNER JOIN', function(done) {
		var res = alasql('SELECT one0.*, two0.* FROM one0 INNER JOIN two0 ON one0.b = two0.b');
		assert.deepEqual(res.data, []);

		var res = alasql('SELECT one1.*, two0.* FROM one1 INNER JOIN two0 ON one1.b = two0.b');
		assert.deepEqual(res.data, []);

		var res = alasql('SELECT one0.*, two1.* FROM one0 INNER JOIN two1 ON one0.b = two1.b');
		assert.deepEqual(res.data, []);

		var res = alasql('SELECT one1.*, two1.* FROM one1 INNER JOIN two1 ON one1.b = two1.b');
		assert.deepEqual(res.data, [
			{a: 1, b: 'One', c: 10},
			{a: 2, b: 'Two', c: 20},
			{a: 3, b: 'Three', c: 30},
		]);

		done();
	});

	it('2. OUTER JOIN', function(done) {
		var res = alasql('SELECT one0.*, two0.* FROM one0 OUTER JOIN two0 ON one0.b = two0.b');
		//    console.log(res.data);

		var res = alasql('SELECT one1.*, two0.* FROM one1 OUTER JOIN two0 ON one1.b = two0.b');
		//    console.log(res.data);

		var res = alasql('SELECT one0.*, two1.* FROM one0 OUTER JOIN two1 ON one0.b = two1.b');
		//    console.log(res.data);

		var res = alasql('SELECT one1.*, two1.* FROM one1 OUTER JOIN two1 ON one1.b = two1.b');
		//    console.log(res.data);

		done();
	});

	it('3. LEFT JOIN', function(done) {
		var res = alasql('SELECT one0.*, two0.* FROM one0 LEFT JOIN two0 ON one0.b = two0.b');
		//    console.log(res.data);

		var res = alasql('SELECT one1.*, two0.* FROM one1 LEFT JOIN two0 ON one1.b = two0.b');
		//    console.log(res.data);

		var res = alasql('SELECT one0.*, two1.* FROM one0 LEFT JOIN two1 ON one0.b = two1.b');
		//    console.log(res.data);

		var res = alasql('SELECT one1.*, two1.* FROM one1 LEFT JOIN two1 ON one1.b = two1.b');
		//    console.log(res.data);

		done();
	});

	it('99. Drop databases', function(done) {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test275');
		done();
	});
});
