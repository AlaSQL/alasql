if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

// A name is pasted into generated code, so a name that holds a quote, a backslash or a line break
// is refused. The alias of a column in the select list is a key of the result: it may hold them,
// and it comes back exactly as written wherever the query uses it.
describe('Test 3130-B - name quoting', function () {
	const refused = /Not a valid name/;
	before(function () {
		alasql('CREATE DATABASE nq; USE nq');
		alasql('CREATE TABLE t (a INT, b INT)');
		alasql('INSERT INTO t VALUES (2, 20), (1, 10), (1, 30)');
	});
	after(function () {
		alasql('USE alasql; DROP DATABASE nq');
	});

	it('A. A name with a quote, a backslash or a line break is refused', function () {
		for (const sql of [
			'SELECT [a\\b] FROM t',
			'SELECT `ab\\` FROM t',
			'SELECT x.a FROM t AS [x\\y]',
			'SELECT * FROM t AS x JOIN t AS y USING [a\\b]',
			'INSERT INTO "a\nb" VALUES (1)',
			'CREATE TABLE u ([a\\b] INT)',
			'INSERT INTO t ([a\\b]) VALUES (1)',
			'UPDATE t SET [a\\b] = 1',
			'CREATE INDEX ix ON t ([a\\b])',
			'SELECT * FROM [v\\w]',
			'WITH [c\\d] AS (SELECT 1 AS a) SELECT * FROM t',
			'SELECT * FROM @`v\\w`',
			'SET @`v\\w` = @{a: 1}; SET @`v\\w`->a = 2',
			'SET @v = @{a: 1}; SET @v->`a\\b` = 2',
			'CREATE TABLE u (a INT, PRIMARY KEY ([a\\b]))',
			'ALTER TABLE t RENAME COLUMN a TO [a\\b]',
			'SELECT a FROM t ORDER BY "x\'y"',
			'SELECT a FROM t ORDER BY [x\\y]',
			'SELECT a AS "a\u2028b", COUNT(*) AS c FROM t GROUP BY [a\u2028b]',
		]) {
			assert.throws(() => alasql(sql), refused, sql);
		}
	});

	it('B. A quote, a backslash or a line break in a string or JSON value is data', function () {
		assert.deepStrictEqual(alasql("SELECT VALUE 'it''s'"), "it's");
		assert.deepStrictEqual(alasql('SELECT VALUE @{"a\'b": 1}'), {"a'b": 1});
		assert.deepStrictEqual(alasql('SELECT a FROM t WHERE ? = "x\'y"', ["x'y"]).length, 3);
	});

	const aliases = ["a'b", 'a\\b', "a']b", 'a\nb', 'ab\\'];
	// a double-quoted name that ends in a backslash cannot be followed by a second double quote
	const twice = aliases.filter(n => !n.endsWith('\\'));
	const dq = n => '"' + n + '"';

	it('C. An alias in a grouped select list comes back as written', function () {
		for (const n of aliases) {
			assert.deepStrictEqual(alasql(`SELECT a AS ${dq(n)} FROM t GROUP BY a ORDER BY a`), [
				{[n]: 1},
				{[n]: 2},
			]);
			assert.deepStrictEqual(
				alasql(`SELECT a, COUNT(*) AS ${dq(n)} FROM t GROUP BY a ORDER BY a`),
				[
					{a: 1, [n]: 2},
					{a: 2, [n]: 1},
				]
			);
			assert.deepStrictEqual(
				alasql(`SELECT a, SUM(b) AS ${dq(n)} FROM t GROUP BY a HAVING SUM(b) > 30 ORDER BY a`),
				[{a: 1, [n]: 40}]
			);
		}
	});

	it('D. An alias in ROLLUP, CUBE and GROUPING SETS comes back as written', function () {
		for (const n of aliases) {
			for (const g of ['ROLLUP(a)', 'CUBE(a)', 'GROUPING SETS(a)']) {
				const res = alasql(`SELECT a AS ${dq(n)}, COUNT(*) AS c FROM t GROUP BY ${g}`);
				assert.ok(
					res.some(r => r[n] === 1 && r.c === 2),
					g + ' ' + JSON.stringify(n)
				);
			}
		}
	});

	it('E. ORDER BY on an alias sorts by it', function () {
		for (const n of twice) {
			assert.deepStrictEqual(alasql(`SELECT a AS ${dq(n)} FROM t ORDER BY ${dq(n)} DESC`), [
				{[n]: 2},
				{[n]: 1},
				{[n]: 1},
			]);
			assert.deepStrictEqual(
				alasql(`SELECT a AS ${dq(n)}, COUNT(*) AS c FROM t GROUP BY a ORDER BY ${dq(n)}`),
				[
					{[n]: 1, c: 2},
					{[n]: 2, c: 1},
				]
			);
		}
		assert.deepStrictEqual(alasql('SELECT a AS [a\\b] FROM t ORDER BY [a\\b]'), [
			{'a\\b': 1},
			{'a\\b': 1},
			{'a\\b': 2},
		]);
	});

	it('F. A plain alias works as before', function () {
		for (const n of twice) {
			assert.deepStrictEqual(alasql(`SELECT DISTINCT a AS ${dq(n)} FROM t ORDER BY a`), [
				{[n]: 1},
				{[n]: 2},
			]);
			assert.deepStrictEqual(
				alasql(
					`SELECT a AS ${dq(n)} FROM t WHERE a = 2 UNION ALL SELECT b AS ${dq(n)} FROM t WHERE b = 10`
				),
				[{[n]: 2}, {[n]: 10}]
			);
		}
	});

	it('G. A double quote in a table alias stays in the name', function () {
		// the multisheet branch of the select list finds no row here, for a plain name too; the
		// generated code compiles and the double quote does not end the string
		const sheets = [[{sheetid: 's', x: 1}], [{x: 2}]];
		for (const n of ['t', 'a"b', 'a"]b']) {
			assert.throws(
				() => alasql('SELECT `' + n + '`.x FROM ? AS `' + n + '`', sheets),
				TypeError,
				n
			);
		}
		assert.deepStrictEqual(alasql('SELECT `a"b`.* FROM (SELECT 1 AS x) AS `a"b`'), [{x: 1}]);
	});

	it('H. constructor and prototype are names', function () {
		alasql('CREATE TABLE p (constructor INT, prototype INT)');
		alasql('INSERT INTO p VALUES (1, 2)');
		assert.deepStrictEqual(alasql('SELECT constructor, prototype FROM p'), [
			{constructor: 1, prototype: 2},
		]);
	});

	it('I. A string in a JSON value stays a string', function () {
		// [the string as written between single quotes in SQL, its value]; a backslash pair keeps
		// its JavaScript meaning
		const strings = [
			['x"y', 'x"y'],
			['xy\\', 'xy\\'],
			['a"\\', 'a"\\'],
			['x\ny', 'x\ny'],
			['x\\ny', 'x\ny'],
			['x\\\\y', 'x\\y'],
			['x\\"y', 'x"y'],
			['\\u0041', 'A'],
		];
		for (const [s, v] of strings) {
			const q = "'" + s + "'";
			assert.strictEqual(alasql(`SELECT VALUE @{a:${q}}`).a, v, 'value ' + s);
			assert.deepStrictEqual(Object.keys(alasql(`SELECT VALUE @{${q}:1}`)), [v], 'key ' + s);
			assert.strictEqual(alasql(`SELECT VALUE @[${q}]`)[0], v, 'array ' + s);
			assert.strictEqual(alasql(`SELECT VALUE @{a:{b:${q}}}`).a.b, v, 'nested ' + s);
		}
	});

	it('J. A parameter name and the key after -> and ! stay in their string', function () {
		assert.strictEqual(alasql('SELECT VALUE $`a\\` + $`b`', {'a\\': 1, b: 2}), 3);
		assert.deepStrictEqual(alasql('SELECT * FROM $`d\\`', {'d\\': [{x: 1}]}), [{x: 1}]);
		assert.deepStrictEqual(
			alasql('SELECT t.x, u.y FROM $t AS t JOIN $`d\\` AS u ON t.x = u.x', {
				t: [{x: 1}],
				'd\\': [{x: 1, y: 2}],
			}),
			[{x: 1, y: 2}]
		);
		assert.strictEqual(alasql('SELECT VALUE @{"x\\"y": 1}->`x"y`'), 1);
		assert.throws(() => alasql('SELECT VALUE 1!`x"y`'), TypeError);
	});

	it('K. The name of a graph item and a SEARCH RETURNS alias are data', function () {
		const objects = alasql.databases.nq.objects;
		for (const n of ["O'Brien", 'a\\b']) {
			const id = 'nq' + Buffer.from(n).toString('hex');
			alasql(`CREATE GRAPH #${id} "${n}"`);
			assert.strictEqual(objects[id].name, n);
			alasql(`CREATE GRAPH "${n}" > "likes" > "Ann"`);
			assert.ok(
				Object.values(objects).some(o => o.name === n && o.$out && o.$out.length),
				n
			);
			assert.deepStrictEqual(alasql(`SEARCH RETURNS(name AS "${n}") FROM #${id}`), [{[n]: n}]);
		}
	});
	it('L. A name used only at run time keeps working', function () {
		const db = alasql.databases.nq;
		for (const n of ['a\\b', 'ab\\']) {
			const b = '`' + n + '`';
			alasql(`CREATE TABLE lx (a INT); CREATE INDEX ${b} ON lx (a); INSERT INTO lx VALUES (1)`);
			assert.deepStrictEqual(alasql('SELECT * FROM lx'), [{a: 1}]);
			alasql(`DROP INDEX ${b}; DROP TABLE lx`);
			alasql(`CREATE TABLE lt (a INT); CREATE TRIGGER ${b} AFTER INSERT ON lt SELECT 1`);
			assert.ok(db.triggers[n], 'trigger ' + n);
			alasql(`INSERT INTO lt VALUES (1); DROP TRIGGER ${b}; DROP TABLE lt`);
			assert.strictEqual(db.triggers[n], undefined);
			assert.strictEqual(alasql(`DECLARE @${b} INT; SET @${b} = 5; SELECT VALUE @${b}`)[2], 5);
		}
	});
});
