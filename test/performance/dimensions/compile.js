// alasql.compile() against ad-hoc calls with parameters, and the compile time of a complex query
const sql = 'SELECT id, val FROM ? WHERE a > ? AND b = ?';
let k = 0;
module.exports = {
	group: 'compile',
	title: 'Compiled statements and compile time',
	info: {
		tests:
			'The same parameterized query on 10,000 rows, called ad hoc and as a statement from alasql.compile(). And the compile time of a query with a LEFT JOIN, GROUP BY, HAVING and ORDER BY: new SQL text every call, on one-row tables, so almost all the time is parsing and code generation.',
		why: 'Apps that run the same query often use alasql.compile(); a regression in its wrapper or in parameter binding hits every call. The cold compile case isolates the compiler on a complex query, which the core cases only measure on a tiny one.',
		read: 'The compiled statement should be at least as fast as the ad-hoc call. The cold compile is the cost of a new complex query.',
	},
	setup: g => {
		const data = [];
		for (let id = 0; id < 10000; id++)
			data.push({id, val: 'v' + id, a: g.int(100), b: 'k' + g.int(5)});
		return {
			data,
			u: [{id: 1, a: 1e9}],
			o: [
				{id: 1, uid: 1},
				{id: 2, uid: 1},
			],
		};
	},
	cases: [
		{
			name: 'ad hoc with parameters',
			sql,
			params: c => [c.data, 50, 'k1'],
			about: 'alasql(sql, [data, 50, "k1"])',
		},
		{
			name: 'alasql.compile() statement',
			show: "const stmt = alasql.compile(sql); stmt([data, 50, 'k1'])",
			init: (alasql, c) => (c.stmt = alasql.compile(sql)),
			run: (alasql, c) => c.stmt([c.data, 50, 'k1']),
		},
		{
			name: 'cold compile, complex query',
			show: 'SELECT u.id, COUNT(o.id) AS n FROM ? u LEFT JOIN ? o ON u.id = o.uid WHERE u.a > <n> GROUP BY u.id HAVING COUNT(o.id) > 1 ORDER BY u.id  (new SQL text every call)',
			run: (alasql, c) =>
				alasql(
					`SELECT u.id, COUNT(o.id) AS n FROM ? u LEFT JOIN ? o ON u.id = o.uid WHERE u.a > ${k++} GROUP BY u.id HAVING COUNT(o.id) > 1 ORDER BY u.id`,
					[c.u, c.o]
				),
		},
	],
};
