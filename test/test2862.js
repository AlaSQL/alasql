if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2862'; // Use the ID of the issue being fixed by this PR

describe(`Test ${testId} - system variables`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	// NOTE: Always assert.deepStrictEqual the final and complete output of the last call to alasql

	it('A) @@name reads what SET name = ... stored', function () {
		alasql("SET sql_mode = ''");
		assert.deepStrictEqual(alasql('SELECT @@sql_mode AS m'), [{m: ''}]);
	});

	it('B) SET @@name, @@session.name and a user variable from a system variable', function () {
		let res = [];
		alasql('SET @@sort_buffer_size = 32804');
		alasql('SET @save2862 = @@sort_buffer_size');
		alasql("SET @@session.sql_mode = 'X'");
		res.push(alasql('SELECT @save2862 AS s, @@SESSION.sort_buffer_size AS t, @@sql_mode AS m'));
		assert.deepStrictEqual(res, [[{s: 32804, t: 32804, m: 'X'}]]);
	});

	it('C) SET GLOBAL, SET SESSION and SET NAMES', function () {
		alasql('SET GLOBAL g2862 = 1');
		alasql('set session s2862 = 2');
		alasql('SET NAMES utf8mb4');
		assert.deepStrictEqual(alasql('SELECT @@global.g2862 AS g, @@s2862 AS s, @@names AS n'), [
			{g: 1, s: 2, n: 'utf8mb4'},
		]);
	});

	it('D) an unknown system variable is NULL', function () {
		assert.deepStrictEqual(alasql('SELECT @@nothere2862 IS NULL AS n'), [{n: true}]);
	});

	it('E) global, session and names are still column names', function () {
		alasql('CREATE TABLE g (global INT, session INT, names INT)');
		alasql('INSERT INTO g VALUES (1, 2, 3)');
		assert.deepStrictEqual(alasql('SELECT global, session, names FROM g'), [
			{global: 1, session: 2, names: 3},
		]);
	});
});
