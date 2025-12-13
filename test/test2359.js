if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 2359 - Advanced Joins (CROSS JOIN and OUTER JOIN)', function () {
	const pluck = (arr, key) => arr.map(e => e[key]);

	// Test data for JOIN tests
	var data1 = [
		{a: 1, b: 10},
		{a: 2, b: 20},
		{a: 3, b: 30},
	];
	var data2 = [
		{b: 10, c: 100},
		{b: 20, c: 200},
		{b: 40, c: 400},
	];

	describe('CROSS JOIN Syntax', function () {
		before(function () {
			alasql('CREATE DATABASE test2359_cross');
			alasql('USE test2359_cross');
		});

		after(function () {
			alasql('DROP DATABASE test2359_cross');
		});

		it('1. FROM JOIN / CROSS JOIN with complex conditions', function (done) {
			alasql('CREATE TABLE tab0; CREATE TABLE tab2');

			var res = alasql(
				'SELECT DISTINCT * FROM tab2 cor0 JOIN tab2 cor1 ON + ( 90 ) \
          IS NOT NULL, tab0 AS cor2 '
			);
			assert(Array.isArray(res));

			alasql('DROP TABLE tab0; DROP TABLE tab2; ');
			done();
		});

		it('2. SELECT ALL with CROSS JOIN and comma syntax', function (done) {
			alasql('CREATE TABLE tab1;CREATE TABLE tab2');
			var res = alasql('SELECT ALL * FROM tab1 cor0 CROSS JOIN tab1, tab2 AS cor1');
			assert(Array.isArray(res));
			alasql('DROP TABLE tab1;DROP TABLE tab2');
			done();
		});

		it('3. Simple CROSS JOIN', function (done) {
			alasql('CREATE TABLE one (a INT, b INT)');
			alasql('INSERT INTO one VALUES (1,10),(2,20)');
			alasql('CREATE TABLE two (e INT, f INT)');
			alasql('INSERT INTO two VALUES (1,100),(2,200)');

			var res = alasql('SELECT * FROM one, two');
			assert.equal(res.length, 4); // 2 x 2 = 4 rows

			var res2 = alasql('SELECT * FROM one CROSS JOIN two');
			assert.equal(res2.length, 4); // Same as comma syntax

			alasql('DROP TABLE one; DROP TABLE two');
			done();
		});
	});

	describe('JOIN with Parameter Arrays (RECORDSET)', function () {
		before(function () {
			alasql('CREATE DATABASE test2359_params; USE test2359_params');
			alasql('CREATE TABLE one(a INT, b INT)');
			alasql('CREATE TABLE two(b INT, c INT)');
			alasql.options.modifier = 'RECORDSET';
		});

		after(function () {
			delete alasql.options.modifier;
			alasql('DROP DATABASE test2359_params');
		});

		it('1. JOIN params with USING clause', function (done) {
			var res = alasql('SELECT one.*,two.* FROM ? one JOIN ? two USING b', [data1, data2]);
			var colres = pluck(res.columns, 'columnid');
			assert.deepEqual(colres, ['a', 'b', 'c']);
			assert.equal(res.data.length, 2); // Matches on b=10 and b=20
			done();
		});

		it('2. JOIN tables with USING clause', function (done) {
			alasql('SELECT * INTO one FROM ?', [data1]);
			alasql('SELECT * INTO two FROM ?', [data2]);
			var res = alasql('SELECT one.*,two.* FROM one JOIN two USING b');
			var colres = pluck(res.columns, 'columnid');
			assert.deepEqual(colres, ['a', 'b', 'b', 'c']);
			assert.equal(res.data.length, 2); // Matches on b=10 and b=20
			done();
		});

		it('3. JOIN params with USING - verify result data', function (done) {
			var res = alasql('SELECT one.*,two.* FROM ? one JOIN ? two USING b', [data1, data2]);
			var colres = pluck(res.columns, 'columnid');
			assert.deepEqual(colres, ['a', 'b', 'c']);
			// Verify the actual joined data
			assert.equal(res.data[0].a, 1);
			assert.equal(res.data[0].b, 10);
			assert.equal(res.data[0].c, 100);
			assert.equal(res.data[1].a, 2);
			assert.equal(res.data[1].b, 20);
			assert.equal(res.data[1].c, 200);
			done();
		});
	});

	describe('Complex Multi-Table Joins (passing tests)', function () {
		before(function () {
			alasql('CREATE DATABASE test2359_multi;USE test2359_multi');
			alasql.options.modifier = 'MATRIX';
			alasql('CREATE TABLE one (id NVARCHAR(3))');
			alasql('CREATE TABLE two (id NVARCHAR(3))');
			alasql('CREATE TABLE three (id NVARCHAR(3))');
			alasql("INSERT INTO one VALUES ('A'),('AB'),('AC'),('ABC')");
			alasql("INSERT INTO two VALUES ('B'),('AB'),('BC'),('ABC')");
			alasql("INSERT INTO three VALUES ('C'),('BC'),('AC'),('ABC')");
		});

		after(function () {
			alasql.options.modifier = undefined;
			alasql('DROP DATABASE test2359_multi');
		});

		it('1. INNER AND INNER', function (done) {
			var res = alasql(
				'SELECT one.id AS a, two.id AS b, three.id AS c FROM one INNER JOIN two ON one.id = two.id INNER JOIN three ON two.id = three.id'
			);
			assert.deepEqual(res, [['ABC', 'ABC', 'ABC']]);
			done();
		});

		it('2. INNER AND LEFT', function (done) {
			var res = alasql(
				'SELECT one.id AS a, two.id AS b, three.id AS c FROM one INNER JOIN two ON one.id = two.id LEFT JOIN three ON two.id = three.id'
			);
			assert.deepEqual(res, [
				['AB', 'AB', undefined],
				['ABC', 'ABC', 'ABC'],
			]);
			done();
		});

		it('3. LEFT AND INNER', function (done) {
			var res = alasql(
				'SELECT one.id AS a, two.id AS b, three.id AS c FROM one LEFT JOIN two ON one.id = two.id INNER JOIN three ON two.id = three.id'
			);
			assert.deepEqual(res, [['ABC', 'ABC', 'ABC']]);
			done();
		});

		it('4. LEFT AND LEFT', function (done) {
			var res = alasql(
				'SELECT one.id AS a, two.id AS b, three.id AS c FROM one LEFT JOIN two ON one.id = two.id LEFT JOIN three ON two.id = three.id'
			);
			assert.deepEqual(res, [
				['A', undefined, undefined],
				['AB', 'AB', undefined],
				['AC', undefined, undefined],
				['ABC', 'ABC', 'ABC'],
			]);
			done();
		});

		it('5. RIGHT AND INNER', function (done) {
			var res = alasql(
				'SELECT one.id AS a, two.id AS b, three.id AS c FROM one RIGHT JOIN two ON one.id = two.id INNER JOIN three ON two.id = three.id'
			);
			assert.deepEqual(res, [
				['ABC', 'ABC', 'ABC'],
				[undefined, 'BC', 'BC'],
			]);
			done();
		});

		it('6. RIGHT AND LEFT', function (done) {
			var res = alasql(
				'SELECT one.id AS a, two.id AS b, three.id AS c FROM one RIGHT JOIN two ON one.id = two.id LEFT JOIN three ON two.id = three.id'
			);
			assert.deepEqual(res, [
				['AB', 'AB', undefined],
				['ABC', 'ABC', 'ABC'],
				[undefined, 'B', undefined],
				[undefined, 'BC', 'BC'],
			]);
			done();
		});

		it('7. OUTER AND INNER', function (done) {
			var res = alasql(
				'SELECT one.id AS a, two.id AS b, three.id AS c FROM one OUTER JOIN two ON one.id = two.id INNER JOIN three ON two.id = three.id'
			);
			assert.deepEqual(res, [
				['ABC', 'ABC', 'ABC'],
				[undefined, 'BC', 'BC'],
			]);
			done();
		});

		it('8. OUTER AND LEFT', function (done) {
			var res = alasql(
				'SELECT one.id AS a, two.id AS b, three.id AS c FROM one OUTER JOIN two ON one.id = two.id LEFT JOIN three ON two.id = three.id'
			);
			assert.deepEqual(res, [
				['A', undefined, undefined],
				['AB', 'AB', undefined],
				['AC', undefined, undefined],
				['ABC', 'ABC', 'ABC'],
				[undefined, 'B', undefined],
				[undefined, 'BC', 'BC'],
			]);
			done();
		});
	});

	describe('Basic OUTER JOIN functionality', function () {
		before(function () {
			alasql('CREATE DATABASE test2359_outer;USE test2359_outer');
		});

		after(function () {
			alasql('DROP DATABASE test2359_outer');
		});

		it('1. OUTER JOIN returns all rows from both tables', function (done) {
			alasql('CREATE TABLE one (a INT, b INT)');
			alasql('INSERT INTO one VALUES (1,10),(2,20),(3,30),(4,40)');
			alasql('CREATE TABLE two (e INT, f INT)');
			alasql('INSERT INTO two VALUES (1,100),(2,200),(3,300),(1000,1000),(2000,2000)');

			var res = alasql('SELECT * FROM one OUTER JOIN two ON one.a = two.e');
			assert.equal(res.length, 6); // 3 matches + 1 unmatched from one + 2 unmatched from two

			alasql('DROP TABLE one; DROP TABLE two');
			done();
		});

		it('2. OUTER JOIN with NULL values', function (done) {
			alasql('CREATE TABLE table1 (id INT, name STRING)');
			alasql("INSERT INTO table1 VALUES (1,'A'),(2,'B'),(3,'C')");
			alasql('CREATE TABLE table2 (id INT, val STRING)');
			alasql("INSERT INTO table2 VALUES (2,'X'),(3,'Y'),(4,'Z')");

			var res = alasql('SELECT * FROM table1 OUTER JOIN table2 ON table1.id = table2.id');
			assert.equal(res.length, 4); // All unique combinations

			// Check that unmatched rows have undefined values
			var unmatchedLeft = res.find(r => r.name === 'A');
			assert.equal(unmatchedLeft.val, undefined);

			var unmatchedRight = res.find(r => r.val === 'Z' && r.name === undefined);
			assert(unmatchedRight);

			alasql('DROP TABLE table1; DROP TABLE table2');
			done();
		});
	});
});
