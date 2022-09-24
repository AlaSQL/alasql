if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

/*
 This sample beased on this article:

	http://stackoverflow.com/questions/30442969/group-by-in-angularjs

*/

describe('Test 407 - TWO JOINS', function () {
	it('0.1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test407;USE test407');
		alasql.options.modifier = 'MATRIX';
		done();
	});

	it('0.2. Create table', function (done) {
		alasql(function () {
			/*
      CREATE TABLE one (id NVARCHAR(3));
      CREATE TABLE two (id NVARCHAR(3));
      CREATE TABLE three (id NVARCHAR(3));

      INSERT INTO one VALUES ('A'),('AB'),('AC'),('ABC');
      INSERT INTO two VALUES ('B'),('AB'),('BC'),('ABC');
      INSERT INTO three VALUES ('C'),('BC'),('AC'),('ABC');
    */
		});
		done();
	});

	it('1.1. INNER AND INNER', function (done) {
		var res = alasql(
			'SELECT one.id AS a, two.id AS b, three.id AS c FROM one INNER JOIN two ON one.id = two.id INNER JOIN three ON two.id = three.id'
		);
		assert.deepEqual(res, [['ABC', 'ABC', 'ABC']]);
		done();
	});

	it('1.2. INNER AND LEFT', function (done) {
		var res = alasql(
			'SELECT one.id AS a, two.id AS b, three.id AS c FROM one INNER JOIN two ON one.id = two.id LEFT JOIN three ON two.id = three.id'
		);
		assert.deepEqual(res, [
			['AB', 'AB', undefined],
			['ABC', 'ABC', 'ABC'],
		]);
		done();
	});

	it.skip('1.3. INNER AND RIGHT', function (done) {
		var res = alasql(
			'SELECT one.id AS a, two.id AS b, three.id AS c FROM one INNER JOIN two ON one.id = two.id RIGHT JOIN three ON two.id = three.id'
		);
		assert.deepEqual(res, [
			[undefined, undefined, 'C'],
			[undefined, undefined, 'BC'],
			[undefined, undefined, 'AC'],
			['ABC', 'ABC', 'ABC'],
		]);
		done();
	});

	it.skip('1.4. INNER AND OUTER', function (done) {
		var res = alasql(
			'SELECT one.id AS a, two.id AS b, three.id AS c FROM one INNER JOIN two ON one.id = two.id OUTER JOIN three ON two.id = three.id'
		);
		assert.deepEqual(res, [
			['AB', 'AB', undefined],
			['ABC', 'ABC', 'ABC'][(undefined, undefined, 'C')],
			[undefined, undefined, 'BC'],
			[undefined, undefined, 'AC'],
		]);
		done();
	});

	it('2.1. LEFT AND INNER', function (done) {
		var res = alasql(
			'SELECT one.id AS a, two.id AS b, three.id AS c FROM one LEFT JOIN two ON one.id = two.id INNER JOIN three ON two.id = three.id'
		);
		assert.deepEqual(res, [['ABC', 'ABC', 'ABC']]);
		done();
	});

	it('2.2. LEFT AND LEFT', function (done) {
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

	it.skip('2.3. LEFT AND RIGHT', function (done) {
		var res = alasql(
			'SELECT one.id AS a, two.id AS b, three.id AS c FROM one LEFT JOIN two ON one.id = two.id RIGHT JOIN three ON two.id = three.id'
		);
		console.log(res);
		assert.deepEqual(res, [
			[undefined, undefined, 'C'],
			[undefined, undefined, 'BC'],
			[undefined, undefined, 'AC'],
			['ABC', 'ABC', 'ABC'],
		]);
		done();
	});

	it.skip('2.4. LEFT AND OUTER', function (done) {
		var res = alasql(
			'SELECT one.id AS a, two.id AS b, three.id AS c FROM one LEFT JOIN two ON one.id = two.id OUTER JOIN three ON two.id = three.id'
		);
		console.log(res);
		assert.deepEqual(res, [
			['A', undefined, undefined],
			['AB', 'AB', undefined],
			['AC', undefined, undefined],
			['ABC', 'ABC', 'ABC'],
			[undefined, undefined, 'C'],
			[undefined, undefined, 'BC'],
			[undefined, undefined, 'AC'],
		]);
		done();
	});

	it('3.1. RIGHT AND INNER', function (done) {
		var res = alasql(
			'SELECT one.id AS a, two.id AS b, three.id AS c FROM one RIGHT JOIN two ON one.id = two.id INNER JOIN three ON two.id = three.id'
		);
		assert.deepEqual(res, [
			['ABC', 'ABC', 'ABC'],
			[undefined, 'BC', 'BC'],
		]);
		done();
	});

	it('3.2. RIGHT AND LEFT', function (done) {
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

	it.skip('3.3. RIGHT AND RIGHT', function (done) {
		var res = alasql(
			'SELECT one.id AS a, two.id AS b, three.id AS c FROM one RIGHT JOIN two ON one.id = two.id RIGHT JOIN three ON two.id = three.id'
		);
		assert.deepEqual(res, [
			[undefined, undefined, 'C'],
			[undefined, 'BC', 'BC'],
			[undefined, undefined, 'AC'],
			['ABC', 'ABC', 'ABC'],
		]);
		done();
	});

	it.skip('3.4. RIGHT AND OUTER', function (done) {
		var res = alasql(
			'SELECT one.id AS a, two.id AS b, three.id AS c FROM one RIGHT JOIN two ON one.id = two.id OUTER JOIN three ON two.id = three.id'
		);
		console.log(res);
		assert.deepEqual(res, [
			[undefined, 'B', undefined],
			['AB', 'AB', undefined],
			[undefined, 'BC', 'BC'],
			['ABC', 'ABC', 'ABC'],
			[undefined, undefined, 'C'],
			[undefined, undefined, 'AC'],
		]);
		done();
	});

	it('4.1. OUTER AND INNER', function (done) {
		var res = alasql(
			'SELECT one.id AS a, two.id AS b, three.id AS c FROM one OUTER JOIN two ON one.id = two.id INNER JOIN three ON two.id = three.id'
		);
		assert.deepEqual(res, [
			['ABC', 'ABC', 'ABC'],
			[undefined, 'BC', 'BC'],
		]);
		done();
	});

	it('4.2. OUTER AND LEFT', function (done) {
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

	it.skip('4.3. OUTER AND RIGHT', function (done) {
		var res = alasql(
			'SELECT one.id AS a, two.id AS b, three.id AS c FROM one OUTER JOIN two ON one.id = two.id RIGHT JOIN three ON two.id = three.id'
		);
		assert.deepEqual(res, [
			[undefined, undefined, 'C'],
			[undefined, 'BC', 'BC'],
			[undefined, undefined, 'AC'],
			['ABC', 'ABC', 'ABC'],
		]);
		done();
	});

	it.skip('4.4. OUTER AND OUTER', function (done) {
		var res = alasql(
			'SELECT one.id AS a, two.id AS b, three.id AS c FROM one OUTER JOIN two ON one.id = two.id OUTER JOIN three ON two.id = three.id'
		);
		assert.deepEqual(res, [
			['A', undefined, undefined],
			['AB', 'AB', undefined],
			['AC', undefined, undefined],
			['ABC', 'ABC', 'ABC'],
			[undefined, 'B', undefined],
			[undefined, 'BC', 'BC'],
			[undefined, undefined, 'C'],
			[undefined, undefined, 'AC'],
		]);
		done();
	});

	it('99. DROP DATABASE', function (done) {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test407');
		done();
	});
});
