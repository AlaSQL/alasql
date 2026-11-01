if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

// A bare column inside a function in a query over several tables resolves to its table, as a
// bare column outside a function does (#2917)
describe('Test 2917 - bare column inside a function in a query over several tables', function () {
	const test = '2917';

	before(function () {
		alasql('CREATE DATABASE test' + test);
		alasql('USE test' + test);
		alasql('CREATE TABLE p (id INT, name STRING)');
		alasql('CREATE TABLE q (id INT, uname STRING)');
		alasql('INSERT INTO p VALUES (1, "ann"), (2, "bob")');
		alasql('INSERT INTO q VALUES (1, "ANN"), (2, "BOB")');
	});

	after(function () {
		alasql('DROP DATABASE test' + test);
	});

	it('A) a comma join', function () {
		// UPPER(uname) read p.uname, the first table of FROM, and found nothing
		assert.deepStrictEqual(alasql('SELECT p.id, uname FROM p, q WHERE UPPER(uname) = "ANN"'), [
			{id: 1, uname: 'ANN'},
			{id: 2, uname: 'ANN'},
		]);
		assert.deepStrictEqual(
			alasql('SELECT p.id, uname FROM p, q WHERE UPPER(uname) = "ANN"'),
			alasql('SELECT p.id, uname FROM p, q WHERE UPPER(q.uname) = "ANN"')
		);
	});

	it('B) an explicit JOIN, and functions in SELECT and ORDER BY', function () {
		assert.deepStrictEqual(
			alasql('SELECT p.id, uname FROM p JOIN q ON p.id = q.id WHERE UPPER(uname) = "ANN"'),
			[{id: 1, uname: 'ANN'}]
		);
		assert.deepStrictEqual(
			alasql(
				'SELECT LOWER(uname) AS u, LEN(name) AS n FROM p JOIN q ON p.id = q.id ORDER BY LOWER(uname)'
			),
			[
				{u: 'ann', n: 3},
				{u: 'bob', n: 3},
			]
		);
	});

	it('C) a function inside a function, and a user function', function () {
		assert.deepStrictEqual(
			alasql('SELECT p.id FROM p JOIN q ON p.id = q.id WHERE UPPER(TRIM(uname)) = "BOB"'),
			[{id: 2}]
		);
		alasql.fn.shout = s => String(s).toUpperCase() + '!';
		assert.deepStrictEqual(
			alasql('SELECT p.id FROM p JOIN q ON p.id = q.id WHERE shout(name) = "ANN!"'),
			[{id: 1}]
		);
	});

	it('D) the comma-join filter now places such a condition on its table', function () {
		const compiled = alasql.compile('SELECT p.id, uname FROM p, q WHERE UPPER(uname) = "ANN"');
		assert.ok(compiled.query.sources[1].srcwherefns.includes("p['q']['uname']"), 'a filter on q');
		assert.equal(compiled.query.sources[0].srcwherefns, '', 'nothing on p');
	});

	it('F) CASE and an IN list over a bare column', function () {
		assert.deepStrictEqual(
			alasql(
				'SELECT p.id, CASE WHEN uname = "ANN" THEN 1 ELSE 0 END AS isann FROM p JOIN q ON p.id = q.id ORDER BY p.id'
			),
			[
				{id: 1, isann: 1},
				{id: 2, isann: 0},
			]
		);
		assert.deepStrictEqual(alasql('SELECT p.id FROM p, q WHERE uname IN ("BOB") AND p.id = q.id'), [
			{id: 2},
		]);
	});

	it('G) the cases of #2615, a joined table and a joined subquery', function () {
		alasql('CREATE TABLE one (a INT, b INT)');
		alasql('CREATE TABLE two (a INT, w STRING)');
		alasql('INSERT INTO one VALUES (1, 10)');
		alasql("INSERT INTO two VALUES (1, 'x')");
		assert.deepStrictEqual(alasql('SELECT UPPER(w) AS u FROM one t0 JOIN two t1 ON t0.a = t1.a'), [
			{u: 'X'},
		]);
		assert.deepStrictEqual(
			alasql('SELECT LENGTH(w) AS n FROM one t0 JOIN (SELECT a, w FROM two) t1 ON t0.a = t1.a'),
			[{n: 1}]
		);
	});

	it('H) an ambiguous bare column inside a function still fails as outside', function () {
		alasql('CREATE TABLE r (id INT)');
		assert.throws(
			() => alasql('SELECT p.id FROM p, r WHERE UPPER(id) = "1"'),
			/Cannot resolve column "id" because it exists in two source tables/
		);
	});
});
