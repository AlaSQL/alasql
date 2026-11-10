if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2186'; // database.table.column references

describe(`Test ${testId} - database.table.column references`, function () {
	before(function () {
		alasql('CREATE DATABASE test' + testId);
		alasql(`CREATE TABLE test${testId}.A_2186 (id INT, v STRING)`);
		alasql(`CREATE TABLE test${testId}.B_2186 (id INT, w STRING)`);
		alasql(`INSERT INTO test${testId}.A_2186 VALUES (1, 'a'), (2, 'b')`);
		alasql(`INSERT INTO test${testId}.B_2186 VALUES (1, 'x'), (3, 'y')`);
		alasql(`CREATE DATABASE test${testId}b`);
		alasql(`CREATE TABLE test${testId}b.A_2186 (id INT, v STRING)`);
		alasql(`INSERT INTO test${testId}b.A_2186 VALUES (7, 'z')`);
	});

	after(function () {
		alasql('DROP DATABASE test' + testId);
		alasql(`DROP DATABASE test${testId}b`);
	});

	it('A) In the ON clause of a JOIN', function () {
		const res = alasql(
			`SELECT A_2186.v, B_2186.w FROM test${testId}.A_2186 JOIN test${testId}.B_2186
				ON test${testId}.A_2186.id = test${testId}.B_2186.id`
		);
		assert.deepStrictEqual(res, [{v: 'a', w: 'x'}]);
	});

	it('B) In the SELECT list, WHERE and ORDER BY', function () {
		const res = alasql(
			`SELECT test${testId}.A_2186.v AS v FROM test${testId}.A_2186
				WHERE test${testId}.A_2186.id > 0 ORDER BY test${testId}.A_2186.id DESC`
		);
		assert.deepStrictEqual(res, [{v: 'b'}, {v: 'a'}]);
	});

	it('C) With USE of the database', function () {
		alasql('USE test' + testId);
		let res;
		try {
			res = alasql(
				`SELECT v, w FROM A_2186 LEFT JOIN B_2186 ON test${testId}.A_2186.id = test${testId}.B_2186.id`
			);
		} finally {
			alasql('USE alasql');
		}
		assert.deepStrictEqual(res, [
			{v: 'a', w: 'x'},
			{v: 'b', w: undefined},
		]);
	});

	it('D) alias.column.property still reads a property of an object column', function () {
		const data = [{id: 1, obj: {x: 10, y: {z: 5}}}];
		assert.deepStrictEqual(alasql('SELECT t.obj.x AS x, t.obj.y.z AS z FROM ? t', [data]), [
			{x: 10, z: 5},
		]);
		assert.deepStrictEqual(alasql('SELECT t.obj.x FROM ? t', [data]), [{'t.obj->x': 10}]);
		assert.deepStrictEqual(alasql('SELECT id FROM ? t WHERE t.obj.x = 10', [data]), [{id: 1}]);
	});

	it('E) Without an alias the result column is named after the column', function () {
		assert.deepStrictEqual(alasql(`SELECT test${testId}.A_2186.id FROM test${testId}.A_2186`), [
			{id: 1},
			{id: 2},
		]);
	});

	it('F) In a correlated subquery that refers to the outer table', function () {
		const res = alasql(
			`SELECT id FROM test${testId}.A_2186 WHERE EXISTS
				(SELECT * FROM test${testId}.B_2186 WHERE test${testId}.B_2186.id = test${testId}.A_2186.id)`
		);
		assert.deepStrictEqual(res, [{id: 1}]);
	});

	it('G) As a function argument and in GROUP BY', function () {
		assert.deepStrictEqual(
			alasql(`SELECT UPPER(test${testId}.A_2186.v) AS u FROM test${testId}.A_2186`),
			[{u: 'A'}, {u: 'B'}]
		);
		assert.deepStrictEqual(
			alasql(
				`SELECT test${testId}.A_2186.v, COUNT(*) AS c FROM test${testId}.A_2186 GROUP BY test${testId}.A_2186.v`
			),
			[
				{v: 'a', c: 1},
				{v: 'b', c: 1},
			]
		);
	});

	it('H) A table of another database with the same name is an error', function () {
		assert.throws(
			() => alasql(`SELECT test${testId}.A_2186.id AS i FROM test${testId}b.A_2186`),
			/A_2186 in this query is not a table of database test2186/
		);
	});

	it('I) A table that has an alias must be referred to by the alias', function () {
		assert.throws(
			() => alasql(`SELECT test${testId}.A_2186.id AS i FROM test${testId}.A_2186 AS x`),
			/has the alias x in this query, so use x.id/
		);
	});

	it('J) A table that is not in the query is an error', function () {
		assert.throws(
			() => alasql(`SELECT test${testId}.A_2186.id FROM test${testId}.B_2186`),
			/table test2186.A_2186 is not used in this query/
		);
	});

	it('K) A source named like a database is still read as alias.column.property', function () {
		const data = [{obj: {x: 10}}];
		assert.deepStrictEqual(alasql(`SELECT test${testId}.obj.x AS v FROM ? test${testId}`, [data]), [
			{v: 10},
		]);
	});
});
