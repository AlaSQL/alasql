if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '202'; // Chains of UNION / EXCEPT / INTERSECT

describe(`Test ${testId} B - set operation chains are evaluated left to right`, function () {
	// e1 = {1,2,3,4}, e2 = {1,5}, e3 = {3,5}, e4 = {2,5}
	before(function () {
		alasql('create database test202b');
		alasql('use test202b');
		alasql('CREATE TABLE e1 (a INT); INSERT INTO e1 VALUES (1),(2),(3),(4)');
		alasql('CREATE TABLE e2 (a INT); INSERT INTO e2 VALUES (1),(5)');
		alasql('CREATE TABLE e3 (a INT); INSERT INTO e3 VALUES (3),(5)');
		alasql('CREATE TABLE e4 (a INT); INSERT INTO e4 VALUES (2),(5)');
	});

	after(function () {
		alasql('drop database test202b');
	});

	const S = t => `SELECT a FROM ${t}`;
	const values = sql =>
		alasql(sql)
			.map(r => r.a)
			.sort((x, y) => x - y);

	it('A) The example from the issue: SELECT * ... EXCEPT ... EXCEPT', function () {
		assert.deepStrictEqual(
			values('SELECT * FROM e1 EXCEPT SELECT * FROM e2 EXCEPT SELECT * FROM e3'),
			[2, 4]
		);
	});

	it('B) EXCEPT and UNION have the same precedence, left to right', function () {
		assert.deepStrictEqual(values(`${S('e1')} UNION ${S('e2')} EXCEPT ${S('e3')}`), [1, 2, 4]);
		assert.deepStrictEqual(values(`${S('e1')} EXCEPT ${S('e2')} UNION ${S('e3')}`), [2, 3, 4, 5]);
		assert.deepStrictEqual(
			values(`${S('e1')} EXCEPT ${S('e2')} EXCEPT ${S('e3')} EXCEPT ${S('e4')}`),
			[4]
		);
		assert.deepStrictEqual(values(`${S('e2')} UNION ALL ${S('e3')} EXCEPT ${S('e4')}`), [1, 3]);
		assert.deepStrictEqual(values(`${S('e1')} UNION ${S('e2')} UNION ${S('e3')}`), [1, 2, 3, 4, 5]);
		assert.deepStrictEqual(
			values(`${S('e2')} UNION ALL ${S('e3')} UNION ALL ${S('e4')}`),
			[1, 2, 3, 5, 5, 5]
		);
	});

	it('C) INTERSECT binds tighter than UNION and EXCEPT', function () {
		assert.deepStrictEqual(values(`${S('e1')} INTERSECT ${S('e2')} UNION ${S('e3')}`), [1, 3, 5]);
		assert.deepStrictEqual(
			values(`${S('e1')} UNION ${S('e2')} INTERSECT ${S('e3')}`),
			[1, 2, 3, 4, 5]
		);
		assert.deepStrictEqual(
			values(`${S('e1')} EXCEPT ${S('e2')} INTERSECT ${S('e3')}`),
			[1, 2, 3, 4]
		);
		assert.deepStrictEqual(values(`${S('e1')} INTERSECT ${S('e2')} EXCEPT ${S('e3')}`), [1]);
		assert.deepStrictEqual(
			values(`${S('e1')} UNION ${S('e2')} INTERSECT ${S('e3')} EXCEPT ${S('e4')}`),
			[1, 3, 4]
		);
		assert.deepStrictEqual(values(`${S('e1')} INTERSECT ${S('e4')} INTERSECT ${S('e2')}`), []);
	});

	it('D) Parentheses group set operations', function () {
		assert.deepStrictEqual(values(`(${S('e1')} EXCEPT ${S('e2')}) EXCEPT ${S('e3')}`), [2, 4]);
		assert.deepStrictEqual(values(`${S('e1')} EXCEPT (${S('e2')} EXCEPT ${S('e3')})`), [2, 3, 4]);
		assert.deepStrictEqual(values(`(${S('e1')} EXCEPT ${S('e2')}) UNION ${S('e3')}`), [2, 3, 4, 5]);
		assert.deepStrictEqual(values(`(${S('e1')} UNION ${S('e2')}) INTERSECT ${S('e3')}`), [3, 5]);
		assert.deepStrictEqual(
			values(`((${S('e1')} EXCEPT ${S('e2')}) EXCEPT ${S('e3')}) UNION ${S('e4')}`),
			[2, 4, 5]
		);
	});

	it('E) ORDER BY applies to the result of the whole chain', function () {
		assert.deepStrictEqual(
			alasql(`${S('e1')} EXCEPT ${S('e2')} EXCEPT ${S('e3')} ORDER BY a DESC`),
			[{a: 4}, {a: 2}]
		);
		assert.deepStrictEqual(
			alasql(`(${S('e1')} EXCEPT ${S('e2')}) UNION ${S('e3')} ORDER BY a DESC`),
			[{a: 5}, {a: 4}, {a: 3}, {a: 2}]
		);
	});

	it('F) CORRESPONDING in a chain', function () {
		alasql('CREATE TABLE cx (a INT, b STRING); INSERT INTO cx VALUES (1,"p"),(2,"q"),(3,"r")');
		alasql('CREATE TABLE cy (b STRING, a INT); INSERT INTO cy VALUES ("p",1)');
		alasql('CREATE TABLE cz (b STRING, a INT); INSERT INTO cz VALUES ("r",3)');
		const res = alasql(
			'SELECT a, b FROM cx EXCEPT CORRESPONDING SELECT b, a FROM cy EXCEPT CORRESPONDING SELECT b, a FROM cz'
		);
		assert.deepStrictEqual(res, [{a: 2, b: 'q'}]);
	});

	const toSQL = sql => alasql.parse(sql).toString();

	it('G) toString() prints parentheses, outer set operations and ORDER BY / LIMIT in the right place', function () {
		const cases = [
			[
				`(${S('e1')} EXCEPT ${S('e2')}) EXCEPT ${S('e3')}`,
				`(${S('e1')} EXCEPT ${S('e2')}) EXCEPT ${S('e3')}`,
			],
			[
				`${S('e1')} EXCEPT (${S('e2')} EXCEPT ${S('e3')})`,
				`${S('e1')} EXCEPT (${S('e2')} EXCEPT ${S('e3')})`,
			],
			[
				`(${S('e1')} UNION ${S('e2')}) INTERSECT ${S('e3')}`,
				`(${S('e1')} UNION ${S('e2')}) INTERSECT ${S('e3')}`,
			],
			[
				`((${S('e1')} EXCEPT ${S('e2')}) EXCEPT ${S('e3')}) UNION ${S('e4')}`,
				`((${S('e1')} EXCEPT ${S('e2')}) EXCEPT ${S('e3')}) UNION ${S('e4')}`,
			],
			[
				`${S('e1')} UNION ${S('e2')} ORDER BY a DESC LIMIT 2`,
				`${S('e1')} UNION ${S('e2')} ORDER BY a DESC LIMIT 2`,
			],
			[
				`(${S('e1')} EXCEPT ${S('e2')}) UNION ${S('e3')} ORDER BY a DESC`,
				`(${S('e1')} EXCEPT ${S('e2')}) UNION ${S('e3')} ORDER BY a DESC`,
			],
			[
				`(${S('e1')} ORDER BY a DESC LIMIT 2) UNION ALL (${S('e2')} ORDER BY a DESC LIMIT 1)`,
				`(${S('e1')} ORDER BY a DESC LIMIT 2) UNION ALL (${S('e2')} ORDER BY a DESC LIMIT 1)`,
			],
			[
				`SELECT * FROM (${S('e1')} EXCEPT ${S('e2')}) AS x`,
				`SELECT * FROM (${S('e1')} EXCEPT ${S('e2')}) AS x`,
			],
		];
		cases.forEach(([sql, expected]) => assert.strictEqual(toSQL(sql), expected));
	});

	it('H) The SQL from toString() returns the same rows as the original query', function () {
		[
			`${S('e1')} EXCEPT ${S('e2')} EXCEPT ${S('e3')}`,
			`${S('e1')} UNION ${S('e2')} INTERSECT ${S('e3')} EXCEPT ${S('e4')}`,
			`(${S('e1')} EXCEPT ${S('e2')}) EXCEPT ${S('e3')}`,
			`${S('e1')} EXCEPT (${S('e2')} EXCEPT ${S('e3')})`,
			`(${S('e1')} UNION ${S('e2')}) INTERSECT ${S('e3')}`,
			`(${S('e1')} EXCEPT ${S('e2')}) EXCEPT (${S('e3')} EXCEPT ${S('e4')})`,
			`((${S('e1')} EXCEPT ${S('e2')}) EXCEPT ${S('e3')}) UNION ${S('e4')}`,
			`${S('e1')} UNION ${S('e2')} ORDER BY a DESC LIMIT 2`,
			`(${S('e1')} EXCEPT ${S('e2')}) UNION ${S('e3')} ORDER BY a DESC`,
			`SELECT * FROM (${S('e1')} EXCEPT ${S('e2')} EXCEPT ${S('e3')}) AS x`,
			'SELECT a, b FROM cx EXCEPT CORRESPONDING SELECT b, a FROM cy EXCEPT CORRESPONDING SELECT b, a FROM cz',
		].forEach(sql => assert.deepStrictEqual(alasql(toSQL(sql)), alasql(sql), sql));
	});
});
