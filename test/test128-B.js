if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 128-B CROSS JOIN with parentheses (sqllogictest)', function () {
	const test = '128B';

	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	it('A) Setup test tables', function () {
		alasql('CREATE TABLE tab1 (id INT, val VARCHAR(10))');
		alasql('CREATE TABLE tab2 (id INT, name VARCHAR(10))');
		alasql("INSERT INTO tab1 VALUES (1, 'A'), (2, 'B')");
		alasql("INSERT INTO tab2 VALUES (3, 'X'), (4, 'Y')");
	});

	it('B) CROSS JOIN without parentheses (baseline)', function () {
		var res = alasql('SELECT -92 AS col1 FROM tab1 AS cor0 CROSS JOIN tab2 AS cor1');
		assert.deepStrictEqual(res, [{col1: -92}, {col1: -92}, {col1: -92}, {col1: -92}]);
	});

	it('C) CROSS JOIN with parentheses around FROM clause', function () {
		var res = alasql('SELECT -92 AS col1 FROM ( tab1 AS cor0 CROSS JOIN tab2 AS cor1 )');
		assert.deepStrictEqual(res, [{col1: -92}, {col1: -92}, {col1: -92}, {col1: -92}]);
	});

	it('D) Verify CROSS JOIN produces correct results', function () {
		var res = alasql(
			'SELECT cor0.id as id1, cor1.id as id2 FROM ( tab1 AS cor0 CROSS JOIN tab2 AS cor1 )'
		);
		assert.deepStrictEqual(res, [
			{id1: 1, id2: 3},
			{id1: 1, id2: 4},
			{id1: 2, id2: 3},
			{id1: 2, id2: 4},
		]);
	});

	it('E) CROSS JOIN with WHERE clause', function () {
		var res = alasql(
			'SELECT cor0.id FROM ( tab1 AS cor0 CROSS JOIN tab2 AS cor1 ) WHERE cor0.id = 1'
		);
		assert.deepStrictEqual(res, [{id: 1}, {id: 1}]);
	});

	it('F) CROSS JOIN with ORDER BY', function () {
		var res = alasql(
			'SELECT cor0.id as id1, cor1.id as id2 FROM ( tab1 AS cor0 CROSS JOIN tab2 AS cor1 ) ORDER BY cor0.id DESC, cor1.id ASC'
		);
		assert.deepStrictEqual(res, [
			{id1: 2, id2: 3},
			{id1: 2, id2: 4},
			{id1: 1, id2: 3},
			{id1: 1, id2: 4},
		]);
	});

	it('G) Multiple CROSS JOINs with parentheses', function () {
		alasql('CREATE TABLE tab3 (id INT)');
		alasql('INSERT INTO tab3 VALUES (5), (6)');
		var res = alasql(
			'SELECT -92 AS col1 FROM ( tab1 AS cor0 CROSS JOIN tab2 AS cor1 CROSS JOIN tab3 AS cor2 )'
		);
		assert.deepStrictEqual(res, [
			{col1: -92},
			{col1: -92},
			{col1: -92},
			{col1: -92},
			{col1: -92},
			{col1: -92},
			{col1: -92},
			{col1: -92},
		]);
		alasql('DROP TABLE tab3');
	});

	it('H) Nested subquery with CROSS JOIN in parentheses', function () {
		var res = alasql(
			'SELECT * FROM (SELECT cor0.id FROM ( tab1 AS cor0 CROSS JOIN tab2 AS cor1 )) AS sub'
		);
		assert.deepStrictEqual(res, [{id: 1}, {id: 1}, {id: 2}, {id: 2}]);
	});

	it('I) CROSS JOIN in parentheses with complex expression', function () {
		var res = alasql(
			'SELECT cor0.val, cor1.name, cor0.id * 10 + cor1.id AS computed FROM ( tab1 AS cor0 CROSS JOIN tab2 AS cor1 ) WHERE cor0.id > 0'
		);
		assert.deepStrictEqual(res, [
			{val: 'A', name: 'X', computed: 13},
			{val: 'A', name: 'Y', computed: 14},
			{val: 'B', name: 'X', computed: 23},
			{val: 'B', name: 'Y', computed: 24},
		]);
	});
});
