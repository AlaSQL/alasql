if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2689 - window aggregates read the source row', function () {
	before(function () {
		alasql('CREATE DATABASE test2689; USE test2689');
		alasql('CREATE TABLE w (g STRING, v INT)');
		alasql("INSERT INTO w VALUES ('x', 1), ('x', 2), ('y', 5)");
	});

	after(function () {
		alasql('DROP DATABASE test2689');
	});

	it('partition column not in the SELECT list', function () {
		assert.deepEqual(alasql('SELECT v, SUM(v) OVER (PARTITION BY g) AS s FROM w'), [
			{v: 1, s: 3},
			{v: 2, s: 3},
			{v: 5, s: 5},
		]);
	});

	it('argument not in the SELECT list, or under another name', function () {
		assert.deepEqual(alasql('SELECT g, SUM(v) OVER (PARTITION BY g) AS s FROM w'), [
			{g: 'x', s: 3},
			{g: 'x', s: 3},
			{g: 'y', s: 5},
		]);
		assert.deepEqual(alasql('SELECT g, v AS val, SUM(v) OVER (PARTITION BY g) AS s FROM w'), [
			{g: 'x', val: 1, s: 3},
			{g: 'x', val: 2, s: 3},
			{g: 'y', val: 5, s: 5},
		]);
		assert.deepEqual(alasql('SELECT COLUMN SUM(v) OVER () FROM w'), [8, 8, 8]);
	});

	it('expression as argument, and other aggregates', function () {
		assert.deepEqual(alasql('SELECT COLUMN SUM(v * 2) OVER (PARTITION BY g) FROM w'), [6, 6, 10]);
		assert.deepEqual(alasql('SELECT COLUMN MAX(v) OVER (PARTITION BY g) FROM w'), [2, 2, 5]);
		assert.deepEqual(alasql('SELECT COLUMN COUNT(v) OVER (PARTITION BY g) FROM w'), [2, 2, 1]);
		assert.deepEqual(alasql('SELECT COLUMN COUNT(*) OVER (PARTITION BY g) FROM w'), [2, 2, 1]);
	});

	it('no hidden keys in the result, and DISTINCT still applies', function () {
		assert.deepEqual(Object.keys(alasql('SELECT g, SUM(v) OVER (PARTITION BY g) AS s FROM w')[0]), [
			'g',
			's',
		]);
		assert.deepEqual(alasql('SELECT DISTINCT g, SUM(v) OVER (PARTITION BY g) AS s FROM w'), [
			{g: 'x', s: 3},
			{g: 'y', s: 5},
		]);
	});
});
