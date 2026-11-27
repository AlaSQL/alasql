if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2666'; // Each SELECT has its own list of subqueries

// Scalar, IN, NOT IN, ALL and EXISTS subqueries in the select list, WHERE, HAVING and ON. Each is
// also placed inside EXISTS, a subquery in FROM, a UNION branch, a view, the WITH part and the
// main SELECT of a WITH, and three levels deep. Every subquery is correlated to the SELECT it is
// written in, by a qualified name.
const kinds = {
	scalar: {
		p: al => '(SELECT MAX(z.zn) FROM z WHERE z.zg = ' + al + '.g) > 20',
		v: al => '(SELECT MAX(z.zn) FROM z WHERE z.zg = ' + al + '.g)',
	},
	in: {p: al => '25 IN (SELECT z.zn FROM z WHERE z.zg = ' + al + '.g)'},
	notin: {p: al => '25 NOT IN (SELECT z.zn FROM z WHERE z.zg = ' + al + '.g)'},
	all: {
		p: al => '30 >= ALL (SELECT z.zn FROM z WHERE z.zg = ' + al + '.g)',
		// SQLite has no ALL
		sqlite: al => 'NOT EXISTS (SELECT 1 FROM z WHERE z.zg = ' + al + '.g AND NOT (30 >= z.zn))',
	},
	exists: {p: al => 'EXISTS (SELECT 1 FROM z WHERE z.zg = ' + al + '.g AND z.zn > 20)'},
};

// The predicate and the value of a kind for one engine, read from the row of alias al
function pred(kind, sqlite, deep) {
	const k = kinds[kind];
	const p = sqlite && k.sqlite ? k.sqlite : k.p;
	if (!deep) return p;
	// Three levels deep: the subquery is in a SELECT in a SELECT in the SELECT that reads t
	return al =>
		'EXISTS (SELECT 1 FROM t AS t2 WHERE t2.g = ' +
		al +
		'.g AND EXISTS (SELECT 1 FROM t AS t3 WHERE t3.g = t2.g AND ' +
		p('t3') +
		'))';
}
function value(kind, sqlite, deep) {
	const k = kinds[kind];
	const v =
		k.v || (al => 'CASE WHEN ' + (sqlite && k.sqlite ? k.sqlite : k.p)(al) + ' THEN 1 ELSE 0 END');
	if (!deep) return v;
	return al =>
		'(SELECT (SELECT ' +
		v('t3') +
		' FROM t AS t3 WHERE t3.g = t2.g) FROM t AS t2 WHERE t2.g = ' +
		al +
		'.g)';
}

// The SELECT that holds the subquery, by position. extra: a condition on the row of p around it
const positions = {
	select: (P, V, src, extra) =>
		'SELECT t.id AS a, ' + V('t') + ' AS v FROM ' + src + (extra ? ' WHERE t.id = p.k' : ''),
	where: (P, V, src, extra) =>
		'SELECT t.id AS a FROM ' + src + ' WHERE ' + P('t') + (extra ? ' AND t.id = p.k' : ''),
	// HAVING does not read the row of a SELECT around it, so the link to p is in WHERE
	having: (P, V, src, extra) =>
		'SELECT t.g AS a, COUNT(*) AS c FROM ' +
		src +
		(extra ? ' WHERE t.g = p.k' : '') +
		' GROUP BY t.g HAVING ' +
		P('t'),
	on: (P, V, src, extra) =>
		'SELECT t.id AS a, p2.k AS k FROM ' +
		src +
		' JOIN p AS p2 ON p2.k = t.id AND ' +
		P('t') +
		(extra ? ' WHERE t.id = p.k' : ''),
};
const width = {select: 2, where: 1, having: 2, on: 2};

const placements = ['plain', 'exists', 'from', 'union', 'view', 'withpart', 'withmain', 'deep'];

// The statements of one case: setup (a view) and the query
function build(kind, pos, place, sqlite) {
	const deep = place === 'deep';
	const P = pred(kind, sqlite, deep);
	const V = value(kind, sqlite, deep);
	const core = (src, extra) => positions[pos](P, V, src || 't', extra);
	const name = 'v_' + kind + '_' + pos;
	switch (place) {
		case 'plain':
		case 'deep':
			return {sql: core()};
		case 'exists':
			return {sql: 'SELECT p.k FROM p WHERE EXISTS (' + core('t', true) + ')'};
		case 'from':
			return {sql: 'SELECT * FROM (' + core() + ') AS s'};
		case 'union':
			return {
				sql:
					'SELECT ' +
					Array.from({length: width[pos]}, (x, i) => '-1 AS c' + i).join(', ') +
					' UNION ALL ' +
					core(),
			};
		case 'view':
			return {setup: 'CREATE VIEW ' + name + ' AS ' + core(), sql: 'SELECT * FROM ' + name};
		case 'withpart':
			return {sql: 'WITH c AS (' + core() + ') SELECT * FROM c'};
		case 'withmain':
			return {sql: 'WITH tt AS (SELECT * FROM t) ' + core('tt AS t')};
	}
}

const fixtures = [
	'CREATE TABLE t (id INT, g INT, n INT)',
	'INSERT INTO t VALUES (1, 1, 10), (2, 1, 20), (3, 2, 30), (4, 3, 40)',
	'CREATE TABLE z (zg INT, zn INT)',
	'INSERT INTO z VALUES (1, 10), (1, 25), (2, 5), (3, 40), (9, 99)',
	'CREATE TABLE p (k INT)',
	'INSERT INTO p VALUES (1), (2), (3), (4)',
];

function cases() {
	const out = [];
	for (const kind of Object.keys(kinds))
		for (const pos of Object.keys(positions))
			for (const place of placements)
				out.push({kind, pos, place, name: kind + ' ' + pos + ' ' + place});
	return out;
}

// Rows as arrays of values, sorted, as the queries have no ORDER BY
function norm(rows) {
	return rows
		.map(r => (Array.isArray(r) ? r : Object.values(r)))
		.map(r => JSON.stringify(r))
		.sort();
}

// SQLite 3's answers, rows sorted
const expected = {
	'scalar select plain': [
		[1, 25],
		[2, 25],
		[3, 5],
		[4, 40],
	],
	'scalar select exists': [[1], [2], [3], [4]],
	'scalar select from': [
		[1, 25],
		[2, 25],
		[3, 5],
		[4, 40],
	],
	'scalar select union': [
		[-1, -1],
		[1, 25],
		[2, 25],
		[3, 5],
		[4, 40],
	],
	'scalar select view': [
		[1, 25],
		[2, 25],
		[3, 5],
		[4, 40],
	],
	'scalar select withpart': [
		[1, 25],
		[2, 25],
		[3, 5],
		[4, 40],
	],
	'scalar select withmain': [
		[1, 25],
		[2, 25],
		[3, 5],
		[4, 40],
	],
	'scalar select deep': [
		[1, 25],
		[2, 25],
		[3, 5],
		[4, 40],
	],
	'scalar where plain': [[1], [2], [4]],
	'scalar where exists': [[1], [2], [4]],
	'scalar where from': [[1], [2], [4]],
	'scalar where union': [[-1], [1], [2], [4]],
	'scalar where view': [[1], [2], [4]],
	'scalar where withpart': [[1], [2], [4]],
	'scalar where withmain': [[1], [2], [4]],
	'scalar where deep': [[1], [2], [4]],
	'scalar having plain': [
		[1, 2],
		[3, 1],
	],
	'scalar having exists': [[1], [3]],
	'scalar having from': [
		[1, 2],
		[3, 1],
	],
	'scalar having union': [
		[-1, -1],
		[1, 2],
		[3, 1],
	],
	'scalar having view': [
		[1, 2],
		[3, 1],
	],
	'scalar having withpart': [
		[1, 2],
		[3, 1],
	],
	'scalar having withmain': [
		[1, 2],
		[3, 1],
	],
	'scalar having deep': [
		[1, 2],
		[3, 1],
	],
	'scalar on plain': [
		[1, 1],
		[2, 2],
		[4, 4],
	],
	'scalar on exists': [[1], [2], [4]],
	'scalar on from': [
		[1, 1],
		[2, 2],
		[4, 4],
	],
	'scalar on union': [
		[-1, -1],
		[1, 1],
		[2, 2],
		[4, 4],
	],
	'scalar on view': [
		[1, 1],
		[2, 2],
		[4, 4],
	],
	'scalar on withpart': [
		[1, 1],
		[2, 2],
		[4, 4],
	],
	'scalar on withmain': [
		[1, 1],
		[2, 2],
		[4, 4],
	],
	'scalar on deep': [
		[1, 1],
		[2, 2],
		[4, 4],
	],
	'in select plain': [
		[1, 1],
		[2, 1],
		[3, 0],
		[4, 0],
	],
	'in select exists': [[1], [2], [3], [4]],
	'in select from': [
		[1, 1],
		[2, 1],
		[3, 0],
		[4, 0],
	],
	'in select union': [
		[-1, -1],
		[1, 1],
		[2, 1],
		[3, 0],
		[4, 0],
	],
	'in select view': [
		[1, 1],
		[2, 1],
		[3, 0],
		[4, 0],
	],
	'in select withpart': [
		[1, 1],
		[2, 1],
		[3, 0],
		[4, 0],
	],
	'in select withmain': [
		[1, 1],
		[2, 1],
		[3, 0],
		[4, 0],
	],
	'in select deep': [
		[1, 1],
		[2, 1],
		[3, 0],
		[4, 0],
	],
	'in where plain': [[1], [2]],
	'in where exists': [[1], [2]],
	'in where from': [[1], [2]],
	'in where union': [[-1], [1], [2]],
	'in where view': [[1], [2]],
	'in where withpart': [[1], [2]],
	'in where withmain': [[1], [2]],
	'in where deep': [[1], [2]],
	'in having plain': [[1, 2]],
	'in having exists': [[1]],
	'in having from': [[1, 2]],
	'in having union': [
		[-1, -1],
		[1, 2],
	],
	'in having view': [[1, 2]],
	'in having withpart': [[1, 2]],
	'in having withmain': [[1, 2]],
	'in having deep': [[1, 2]],
	'in on plain': [
		[1, 1],
		[2, 2],
	],
	'in on exists': [[1], [2]],
	'in on from': [
		[1, 1],
		[2, 2],
	],
	'in on union': [
		[-1, -1],
		[1, 1],
		[2, 2],
	],
	'in on view': [
		[1, 1],
		[2, 2],
	],
	'in on withpart': [
		[1, 1],
		[2, 2],
	],
	'in on withmain': [
		[1, 1],
		[2, 2],
	],
	'in on deep': [
		[1, 1],
		[2, 2],
	],
	'notin select plain': [
		[1, 0],
		[2, 0],
		[3, 1],
		[4, 1],
	],
	'notin select exists': [[1], [2], [3], [4]],
	'notin select from': [
		[1, 0],
		[2, 0],
		[3, 1],
		[4, 1],
	],
	'notin select union': [
		[-1, -1],
		[1, 0],
		[2, 0],
		[3, 1],
		[4, 1],
	],
	'notin select view': [
		[1, 0],
		[2, 0],
		[3, 1],
		[4, 1],
	],
	'notin select withpart': [
		[1, 0],
		[2, 0],
		[3, 1],
		[4, 1],
	],
	'notin select withmain': [
		[1, 0],
		[2, 0],
		[3, 1],
		[4, 1],
	],
	'notin select deep': [
		[1, 0],
		[2, 0],
		[3, 1],
		[4, 1],
	],
	'notin where plain': [[3], [4]],
	'notin where exists': [[3], [4]],
	'notin where from': [[3], [4]],
	'notin where union': [[-1], [3], [4]],
	'notin where view': [[3], [4]],
	'notin where withpart': [[3], [4]],
	'notin where withmain': [[3], [4]],
	'notin where deep': [[3], [4]],
	'notin having plain': [
		[2, 1],
		[3, 1],
	],
	'notin having exists': [[2], [3]],
	'notin having from': [
		[2, 1],
		[3, 1],
	],
	'notin having union': [
		[-1, -1],
		[2, 1],
		[3, 1],
	],
	'notin having view': [
		[2, 1],
		[3, 1],
	],
	'notin having withpart': [
		[2, 1],
		[3, 1],
	],
	'notin having withmain': [
		[2, 1],
		[3, 1],
	],
	'notin having deep': [
		[2, 1],
		[3, 1],
	],
	'notin on plain': [
		[3, 3],
		[4, 4],
	],
	'notin on exists': [[3], [4]],
	'notin on from': [
		[3, 3],
		[4, 4],
	],
	'notin on union': [
		[-1, -1],
		[3, 3],
		[4, 4],
	],
	'notin on view': [
		[3, 3],
		[4, 4],
	],
	'notin on withpart': [
		[3, 3],
		[4, 4],
	],
	'notin on withmain': [
		[3, 3],
		[4, 4],
	],
	'notin on deep': [
		[3, 3],
		[4, 4],
	],
	'all select plain': [
		[1, 1],
		[2, 1],
		[3, 1],
		[4, 0],
	],
	'all select exists': [[1], [2], [3], [4]],
	'all select from': [
		[1, 1],
		[2, 1],
		[3, 1],
		[4, 0],
	],
	'all select union': [
		[-1, -1],
		[1, 1],
		[2, 1],
		[3, 1],
		[4, 0],
	],
	'all select view': [
		[1, 1],
		[2, 1],
		[3, 1],
		[4, 0],
	],
	'all select withpart': [
		[1, 1],
		[2, 1],
		[3, 1],
		[4, 0],
	],
	'all select withmain': [
		[1, 1],
		[2, 1],
		[3, 1],
		[4, 0],
	],
	'all select deep': [
		[1, 1],
		[2, 1],
		[3, 1],
		[4, 0],
	],
	'all where plain': [[1], [2], [3]],
	'all where exists': [[1], [2], [3]],
	'all where from': [[1], [2], [3]],
	'all where union': [[-1], [1], [2], [3]],
	'all where view': [[1], [2], [3]],
	'all where withpart': [[1], [2], [3]],
	'all where withmain': [[1], [2], [3]],
	'all where deep': [[1], [2], [3]],
	'all having plain': [
		[1, 2],
		[2, 1],
	],
	'all having exists': [[1], [2]],
	'all having from': [
		[1, 2],
		[2, 1],
	],
	'all having union': [
		[-1, -1],
		[1, 2],
		[2, 1],
	],
	'all having view': [
		[1, 2],
		[2, 1],
	],
	'all having withpart': [
		[1, 2],
		[2, 1],
	],
	'all having withmain': [
		[1, 2],
		[2, 1],
	],
	'all having deep': [
		[1, 2],
		[2, 1],
	],
	'all on plain': [
		[1, 1],
		[2, 2],
		[3, 3],
	],
	'all on exists': [[1], [2], [3]],
	'all on from': [
		[1, 1],
		[2, 2],
		[3, 3],
	],
	'all on union': [
		[-1, -1],
		[1, 1],
		[2, 2],
		[3, 3],
	],
	'all on view': [
		[1, 1],
		[2, 2],
		[3, 3],
	],
	'all on withpart': [
		[1, 1],
		[2, 2],
		[3, 3],
	],
	'all on withmain': [
		[1, 1],
		[2, 2],
		[3, 3],
	],
	'all on deep': [
		[1, 1],
		[2, 2],
		[3, 3],
	],
	'exists select plain': [
		[1, 1],
		[2, 1],
		[3, 0],
		[4, 1],
	],
	'exists select exists': [[1], [2], [3], [4]],
	'exists select from': [
		[1, 1],
		[2, 1],
		[3, 0],
		[4, 1],
	],
	'exists select union': [
		[-1, -1],
		[1, 1],
		[2, 1],
		[3, 0],
		[4, 1],
	],
	'exists select view': [
		[1, 1],
		[2, 1],
		[3, 0],
		[4, 1],
	],
	'exists select withpart': [
		[1, 1],
		[2, 1],
		[3, 0],
		[4, 1],
	],
	'exists select withmain': [
		[1, 1],
		[2, 1],
		[3, 0],
		[4, 1],
	],
	'exists select deep': [
		[1, 1],
		[2, 1],
		[3, 0],
		[4, 1],
	],
	'exists where plain': [[1], [2], [4]],
	'exists where exists': [[1], [2], [4]],
	'exists where from': [[1], [2], [4]],
	'exists where union': [[-1], [1], [2], [4]],
	'exists where view': [[1], [2], [4]],
	'exists where withpart': [[1], [2], [4]],
	'exists where withmain': [[1], [2], [4]],
	'exists where deep': [[1], [2], [4]],
	'exists having plain': [
		[1, 2],
		[3, 1],
	],
	'exists having exists': [[1], [3]],
	'exists having from': [
		[1, 2],
		[3, 1],
	],
	'exists having union': [
		[-1, -1],
		[1, 2],
		[3, 1],
	],
	'exists having view': [
		[1, 2],
		[3, 1],
	],
	'exists having withpart': [
		[1, 2],
		[3, 1],
	],
	'exists having withmain': [
		[1, 2],
		[3, 1],
	],
	'exists having deep': [
		[1, 2],
		[3, 1],
	],
	'exists on plain': [
		[1, 1],
		[2, 2],
		[4, 4],
	],
	'exists on exists': [[1], [2], [4]],
	'exists on from': [
		[1, 1],
		[2, 2],
		[4, 4],
	],
	'exists on union': [
		[-1, -1],
		[1, 1],
		[2, 2],
		[4, 4],
	],
	'exists on view': [
		[1, 1],
		[2, 2],
		[4, 4],
	],
	'exists on withpart': [
		[1, 1],
		[2, 2],
		[4, 4],
	],
	'exists on withmain': [
		[1, 1],
		[2, 2],
		[4, 4],
	],
	'exists on deep': [
		[1, 1],
		[2, 2],
		[4, 4],
	],
};

describe(`Test ${testId} - each SELECT has its own subqueries`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
		fixtures.forEach(sql => alasql(sql));
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	describe('A) Kind, position and placement as in SQLite', function () {
		cases().forEach(c => {
			it(c.name, function () {
				const b = build(c.kind, c.pos, c.place, false);
				if (b.setup) alasql(b.setup);
				assert.deepStrictEqual(
					norm(alasql(b.sql)).map(r => JSON.parse(r)),
					expected[c.name]
				);
			});
		});
	});

	it('B) A statement with 12 EXISTS compiles each SELECT once (#3133)', function () {
		const Select = alasql.yy.Select.prototype;
		const compile = Select.compile;
		let calls = 0;
		Select.compile = function () {
			calls++;
			return compile.apply(this, arguments);
		};
		let res;
		try {
			res = alasql(
				'SELECT id FROM t WHERE ' + Array(12).fill('EXISTS (SELECT 1 FROM p)').join(' AND ')
			);
		} finally {
			Select.compile = compile;
		}
		assert.deepStrictEqual([calls, res], [13, [{id: 1}, {id: 2}, {id: 3}, {id: 4}]]);
	});

	it('C) A scalar or IN subquery in a WITH statement (#3132)', function () {
		assert.deepStrictEqual(
			[
				alasql('WITH c AS (SELECT id FROM t) SELECT id, (SELECT MAX(zn) FROM z) AS m FROM c'),
				alasql('WITH c AS (SELECT id, (SELECT MAX(zn) FROM z) AS m FROM t) SELECT * FROM c'),
				alasql('WITH c AS (SELECT n FROM t) SELECT n FROM c WHERE n IN (SELECT zn FROM z)'),
			],
			[
				[
					{id: 1, m: 99},
					{id: 2, m: 99},
					{id: 3, m: 99},
					{id: 4, m: 99},
				],
				[
					{id: 1, m: 99},
					{id: 2, m: 99},
					{id: 3, m: 99},
					{id: 4, m: 99},
				],
				[{n: 10}, {n: 40}],
			]
		);
	});

	it('D) An IN subquery inside an EXISTS subquery (#3097)', function () {
		assert.deepStrictEqual(
			[
				alasql('SELECT id FROM t WHERE EXISTS (SELECT 1 FROM p WHERE p.k IN (SELECT z.zg FROM z))'),
				alasql(
					'SELECT id FROM t WHERE EXISTS (SELECT 1 FROM p WHERE p.k IN (SELECT z.zg FROM z WHERE z.zg = t.g))'
				),
				alasql(
					'SELECT id, EXISTS (SELECT 1 FROM p WHERE p.k IN (SELECT z.zg FROM z WHERE z.zn = t.n)) AS e FROM t'
				),
			],
			[
				[{id: 1}, {id: 2}, {id: 3}, {id: 4}],
				[{id: 1}, {id: 2}, {id: 3}, {id: 4}],
				[
					{id: 1, e: true},
					{id: 2, e: false},
					{id: 3, e: false},
					{id: 4, e: true},
				],
			]
		);
	});

	it('E) Nested scalar subqueries and a scalar subquery in a subquery in FROM', function () {
		assert.deepStrictEqual(
			[
				alasql('SELECT (SELECT (SELECT 1 AS c) AS b) AS a'),
				alasql(
					'SELECT id, (SELECT MAX(zn) FROM z WHERE zg = (SELECT MIN(g) FROM t)) AS m FROM t WHERE id = 1'
				),
				alasql('SELECT * FROM (SELECT id, (SELECT MIN(zn) FROM z) AS m FROM t WHERE id < 3) AS s'),
			],
			[
				[{a: 1}],
				[{id: 1, m: 25}],
				[
					{id: 1, m: 5},
					{id: 2, m: 5},
				],
			]
		);
	});

	it('F) A view with scalar, IN and EXISTS subqueries', function () {
		alasql(
			'CREATE VIEW vf AS SELECT id, (SELECT MAX(zn) FROM z) AS m FROM t WHERE g IN (SELECT zg FROM z WHERE zn > 20) AND EXISTS (SELECT 1 FROM p WHERE p.k = t.id)'
		);
		assert.deepStrictEqual(alasql('SELECT * FROM vf'), [
			{id: 1, m: 99},
			{id: 2, m: 99},
			{id: 4, m: 99},
		]);
	});

	it('G) Subqueries in a UNION branch and in ON', function () {
		assert.deepStrictEqual(
			[
				alasql(
					'SELECT id FROM t WHERE n IN (SELECT zn FROM z) UNION SELECT id FROM t WHERE id = (SELECT MAX(k) FROM p) ORDER BY id'
				),
				alasql('SELECT t.id, p.k FROM t JOIN p ON p.k = t.id AND t.n IN (SELECT zn FROM z)'),
			],
			[
				[{id: 1}, {id: 4}],
				[
					{id: 1, k: 1},
					{id: 4, k: 4},
				],
			]
		);
	});

	it('H) Outer subqueries of IN and ALL with their own subqueries (#2879)', function () {
		assert.deepStrictEqual(
			[
				alasql('SELECT id FROM t WHERE g IN (SELECT zg FROM z WHERE zn = (SELECT MAX(n) FROM t))'),
				alasql(
					'SELECT id FROM t WHERE n >= ALL (SELECT zn FROM z WHERE zg IN (SELECT k FROM p WHERE k < 3))'
				),
			],
			[[{id: 4}], [{id: 3}, {id: 4}]]
		);
	});

	it('I) A subquery in the ORDER BY of a SELECT in parentheses', function () {
		assert.deepStrictEqual(
			alasql('(SELECT k FROM p WHERE k IN (SELECT zg FROM z)) ORDER BY k * (SELECT -1)'),
			[{k: 3}, {k: 2}, {k: 1}]
		);
	});

	it('J) IF with a subquery in its condition and in the SELECT or UPDATE in it', function () {
		alasql('CREATE TABLE ifa (a INT); INSERT INTO ifa VALUES (1), (2), (3)');
		assert.deepStrictEqual(
			[
				alasql('IF (SELECT COUNT(*) FROM ifa) > 0 SELECT a FROM ifa WHERE a IN (SELECT zg FROM z)'),
				alasql(
					'IF (SELECT COUNT(*) FROM ifa) > 9 SELECT 1 ELSE UPDATE ifa SET a = 7 WHERE a = (SELECT MAX(a) FROM ifa)'
				),
				alasql('IF EXISTS (SELECT * FROM ifa WHERE a = 1) SELECT (SELECT 8) AS b'),
				alasql('SELECT * FROM ifa'),
			],
			[[{a: 1}, {a: 2}, {a: 3}], 1, [{b: 8}], [{a: 1}, {a: 2}, {a: 7}]]
		);
	});

	it('K) UPDATE, DELETE, INSERT and SET with subqueries', function () {
		alasql('CREATE TABLE uda (a INT); INSERT INTO uda VALUES (1), (2), (3)');
		assert.deepStrictEqual(
			[
				alasql(
					'UPDATE uda SET a = a + 10 WHERE a IN (SELECT zg FROM z) AND EXISTS (SELECT 1 FROM p)'
				),
				alasql(
					'DELETE FROM uda WHERE a = (SELECT MAX(a) FROM uda) OR NOT EXISTS (SELECT 1 FROM p)'
				),
				alasql('INSERT INTO uda VALUES ((SELECT MIN(zn) FROM z))'),
				alasql('SET @x = (SELECT MAX(a) FROM uda)'),
				alasql('SELECT @x AS x'),
				alasql('SELECT * FROM uda'),
			],
			[3, 1, 1, 1, [{x: 12}], [{a: 11}, {a: 12}, {a: 5}]]
		);
	});
	it('L) A subquery in the condition of a nested IF, of WHILE and of IF around BEGIN ... END', function () {
		alasql('CREATE TABLE wla (a INT); INSERT INTO wla VALUES (1), (2), (3)');
		assert.deepStrictEqual(
			[
				alasql('IF EXISTS (SELECT 1 FROM z) IF (SELECT MIN(zn) FROM z) = 5 SELECT 1 AS a'),
				alasql(
					'IF EXISTS (SELECT 1 FROM z WHERE zn > 99) SELECT 0 AS a ELSE IF (SELECT MAX(zn) FROM z) = 99 SELECT 2 AS a'
				),
				alasql(
					'SET @i = 0; WHILE @i < (SELECT COUNT(*) FROM p) SET @i = @i + 1; SELECT @i AS i'
				)[2],
				alasql(
					'WHILE EXISTS (SELECT 1 FROM wla) DELETE FROM wla WHERE a = (SELECT MIN(a) FROM wla); SELECT COUNT(*) AS n FROM wla'
				)[1],
				alasql(
					'IF (SELECT COUNT(*) FROM p) = 4 BEGIN INSERT INTO wla SELECT k FROM p WHERE k IN (SELECT zg FROM z); SET @m = (SELECT MAX(zn) FROM z) END; SELECT @m AS m, (SELECT COUNT(*) FROM wla) AS n'
				)[1],
				alasql(
					'SET @i = 0; SET @s = 0; WHILE @i < (SELECT COUNT(*) FROM p) BEGIN SET @i = @i + 1; IF EXISTS (SELECT 1 FROM z WHERE zg = @i) SET @s = @s + (SELECT MAX(zn) FROM z WHERE zg = @i) END; SELECT @s AS s'
				)[3],
			],
			[[{a: 1}], [{a: 2}], [{i: 4}], [{n: 0}], [{m: 99, n: 3}], [{s: 70}]]
		);
	});

	it('M) The same with a callback', function (done) {
		alasql('SET @j = 0; WHILE @j < (SELECT COUNT(*) FROM p) SET @j = @j + 1', [], function () {
			assert.deepStrictEqual(alasql('SELECT @j AS j'), [{j: 4}]);
			alasql(
				'IF EXISTS (SELECT 1 FROM z) IF (SELECT MIN(zn) FROM z) = 5 SELECT 1 AS a',
				[],
				function (res) {
					assert.deepStrictEqual(res, [{a: 1}]);
					done();
				}
			);
		});
	});
});
