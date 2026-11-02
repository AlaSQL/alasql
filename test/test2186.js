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
	});

	after(function () {
		alasql('DROP DATABASE test' + testId);
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
});
