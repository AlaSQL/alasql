if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2723'; // Use the ID of the issue being fixed by this PR

describe(`Test ${testId} - Expressions are compared by what they are made of, and walked by one walker`, function () {
	var db;
	var data = [
		{a: 1, s: 'a%b'},
		{a: 1, s: 'a!b'},
		{a: 2, s: 'a!b'},
	];

	// The two SELECT items of 'SELECT x, y FROM t' as nodes
	function pair(x, y) {
		return alasql.parse('SELECT ' + x + ', ' + y + ' FROM t').statements[0].columns;
	}

	before(function () {
		alasql('create database test' + testId);
		db = alasql.databases['test' + testId];
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	it('A) equals() ignores parentheses and the case of a built-in function name', function () {
		var same = [
			['(a + 1)', 'a + 1'],
			['((a))', 'a'],
			['upper(s)', 'UPPER(s)'],
			['SUM((a))', 'SUM(a)'],
			['t.a', 't.a'],
			['CASE WHEN a = 1 THEN 1 ELSE 0 END', 'CASE WHEN (a = 1) THEN 1 ELSE 0 END'],
			['a IN (1, 2)', 'a IN (1, 2)'],
			['a BETWEEN 1 AND 2', 'a BETWEEN 1 AND 2'],
			['(SELECT MAX(b) FROM u)', '(SELECT MAX(b) FROM u)'],
		];
		var res = same.map(function (p) {
			var nodes = pair(p[0], p[1]);
			return nodes[0].equals(nodes[1]) && nodes[1].equals(nodes[0]);
		});
		assert.deepStrictEqual(
			res,
			same.map(() => true)
		);
	});

	it('B) equals() sees every part of a node, also the parts its text leaves out', function () {
		var different = [
			["s LIKE 'a!%' ESCAPE '!'", "s LIKE 'a!%'"],
			["s LIKE 'a!%' ESCAPE '!'", "s LIKE 'a!%' ESCAPE '#'"],
			['ARRAY[1, 2]', 'ARRAY[3, 4]'],
			['CASE WHEN a = 1 THEN 1 ELSE 0 END', 'CASE WHEN a = 1 THEN 1 ELSE 9 END'],
			["GROUP_CONCAT(s SEPARATOR '-')", "GROUP_CONCAT(s SEPARATOR '+')"],
			['GROUP_CONCAT(s ORDER BY s DESC)', 'GROUP_CONCAT(s ORDER BY s ASC)'],
			['a BETWEEN 1 AND 2', 'a BETWEEN 1 AND 3'],
			['a IN (1, 2)', 'a IN (1, 3)'],
			['a + 1', 'a - 1'],
			['a + 1', '1 + a'],
			['t.a', 'u.a'],
			['a', "'a'"],
			['SUM(a)', 'SUM(DISTINCT a)'],
			['SUM(a)', 'MAX(a)'],
			['CAST(a AS INT)', 'CAST(a AS STRING)'],
			['(SELECT MAX(b) FROM u)', '(SELECT MAX(b) FROM v)'],
			['(SELECT MAX(b) AS m FROM u)', '(SELECT MAX(b) AS n FROM u)'],
		];
		var res = different.map(function (p) {
			var nodes = pair(p[0], p[1]);
			return nodes[0].equals(nodes[1]) || nodes[1].equals(nodes[0]);
		});
		assert.deepStrictEqual(
			res,
			different.map(() => false)
		);
	});

	it('C) walk() reaches every part of every node', function () {
		var sql =
			'SELECT CASE WHEN c1 BETWEEN c2 AND c3 THEN c4 ELSE c5 END, c6 LIKE c7 ESCAPE c8, ' +
			'ARRAY[c9, c10], f(c11, CAST(c12 AS INT)), c13 IN (c14, c15), -c16, (c17), c18->(c19), ' +
			'SUM(c20) OVER (PARTITION BY c21 ORDER BY c22), @[c23, {k: c24}] ' +
			'FROM t JOIN u ON c25 = c26 WHERE c27 = (SELECT c28 FROM v WHERE c29 > 0) ' +
			'GROUP BY c30 HAVING c31 > 0 ORDER BY c32 LIMIT 5';
		var found = [];
		alasql.parse(sql).statements[0].walk(function (node) {
			if (node instanceof alasql.yy.Column) found.push(node.columnid);
		});
		var expected = [];
		for (var i = 1; i <= 32; i++) expected.push('c' + i);
		assert.deepStrictEqual(
			found.sort((x, y) => x.slice(1) - y.slice(1)),
			expected
		);
	});

	it('D) walk() leaves out what is below a node when the callback returns false', function () {
		var found = [];
		alasql
			.parse('SELECT a + (SELECT b FROM u), c FROM t')
			.statements[0].walk(function (node, slot) {
				if (node instanceof alasql.yy.Select && slot) return false;
				if (node instanceof alasql.yy.Column) found.push(node.columnid);
			});
		assert.deepStrictEqual(found, ['a', 'c']);
	});

	it('E) Aggregates that differ only in ESCAPE do not share one result', function () {
		var res = db.exec(
			"SELECT SUM(CASE WHEN s LIKE '%!%%' THEN 1 ELSE 0 END) AS x, " +
				"SUM(CASE WHEN s LIKE '%!%%' ESCAPE '!' THEN 1 ELSE 0 END) AS y FROM ?",
			[[{s: 'a%b'}, {s: 'a!b'}, {s: 'a!b'}]]
		);
		assert.deepStrictEqual(res, [{x: 2, y: 1}]);
	});

	it('F) Aggregates that differ only in the items of ARRAY[] do not share one result', function () {
		var res = db.exec('SELECT FIRST(ARRAY[1, 2]) AS x, FIRST(ARRAY[3, 4]) AS y FROM ?', [[{a: 1}]]);
		assert.deepStrictEqual(res, [{x: [1, 2], y: [3, 4]}]);
	});

	it('G) Aggregates that differ only in the ELSE of a CASE do not share one result', function () {
		var res = db.exec(
			'SELECT SUM(CASE WHEN a = 1 THEN 1 ELSE 0 END) AS x, ' +
				'SUM(CASE WHEN a = 1 THEN 1 ELSE 10 END) AS y FROM ?',
			[data]
		);
		assert.deepStrictEqual(res, [{x: 2, y: 12}]);
	});

	it('H) GROUP_CONCAT with another separator or order does not share one result', function () {
		var res = db.exec(
			"SELECT GROUP_CONCAT(a SEPARATOR '-') AS x, GROUP_CONCAT(a SEPARATOR '+') AS y, " +
				'GROUP_CONCAT(a ORDER BY a DESC) AS z, GROUP_CONCAT(a ORDER BY a ASC) AS w FROM ?',
			[data]
		);
		assert.deepStrictEqual(res, [{x: '1-1-2', y: '1+1+2', z: '2,1,1', w: '1,1,2'}]);
	});

	it('I) The same aggregate written twice still shares one result', function () {
		var res = db.exec('SELECT SUM(a) AS x, SUM((a)) AS y, sum(a) + 1 AS z FROM ?', [data]);
		assert.deepStrictEqual(res, [{x: 4, y: 4, z: 5}]);
	});

	it('J) An aggregate is found in every part of an expression', function () {
		var res = [];
		res.push(db.exec('SELECT ARRAY[SUM(a), MAX(a)] AS x FROM ?', [data]));
		res.push(
			db.exec('SELECT CASE WHEN 3 BETWEEN MIN(a) AND SUM(a) THEN 1 ELSE 0 END AS x FROM ?', [data])
		);
		assert.deepStrictEqual(res, [[{x: [4, 2]}], [{x: 1}]]);
	});

	it('K) An aggregate inside OVER or a subquery stays where it is', function () {
		var res = [];
		res.push(
			db.exec(
				'SELECT a, ROW_NUMBER() OVER (PARTITION BY a ORDER BY s) AS rn FROM ? ORDER BY a, rn',
				[data]
			)
		);
		res.push(db.exec('SELECT a, (SELECT MAX(a) FROM ?) AS m FROM ?', [data, data]));
		assert.deepStrictEqual(res, [
			[
				{a: 1, rn: 1},
				{a: 1, rn: 2},
				{a: 2, rn: 1},
			],
			[
				{a: 1, m: 2},
				{a: 1, m: 2},
				{a: 2, m: 2},
			],
		]);
	});

	it('L) An unnamed column keeps its name', function () {
		var res = [];
		res.push(db.exec("SELECT s LIKE 'a!%%' ESCAPE '!' FROM ?", [[{s: 'a%b'}]]));
		res.push(db.exec('SELECT ARRAY[1, 2] FROM ?', [[{a: 1}]]));
		res.push(db.exec('SELECT (a + 1), a + 1, upper(s) FROM ?', [[{a: 1, s: 'x'}]]));
		res.push(db.exec('SELECT SUM((a)), SUM(a) FROM ?', [data]));
		assert.deepStrictEqual(res, [
			[{"s LIKE 'a!%%'": true}],
			[{'ARRAY[]': [1, 2]}],
			[{'(a + 1)': 2, 'a + 1': 2, 'UPPER(s)': 'X'}],
			[{'SUM((a))': 4, 'SUM(a)': 4}],
		]);
	});

	it('M) A flag set to false is the same as a flag that is left out', function () {
		var yy = alasql.yy;
		var unset = new yy.FuncValue({funcid: 'F', args: []});
		var off = new yy.FuncValue({funcid: 'F', args: [], newid: false});
		var on = new yy.FuncValue({funcid: 'F', args: [], newid: true});
		var logic = pair('TRUE', 'FALSE');
		assert.deepStrictEqual(
			[
				unset.equals(off),
				off.equals(unset),
				off.equals(on),
				on.equals(unset),
				logic[0].equals(logic[1]),
			],
			[true, true, false, false, false]
		);
	});
});
