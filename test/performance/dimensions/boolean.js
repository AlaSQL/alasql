// The same WHERE with the cheap, selective condition first and last
module.exports = {
	group: 'boolean',
	title: 'Boolean trees and predicate order',
	info: {
		tests:
			"The same WHERE on 50,000 rows written two ways: the cheap condition a = 1 (true for 0.1 percent of the rows) first, and the expensive LIKE '%foo%' OR IN (...) first.",
		why: 'Shows whether the generated code short-circuits AND and OR like JavaScript does, and whether alasql reorders conditions so the cheap one runs first.',
		read: 'The ratio of the two. Close to 1 means alasql reorders (or both are cheap); a large ratio means the written order decides the cost.',
	},
	setup: g => {
		const words = ['alpha', 'bravo', 'foo', 'charlie', 'delta', 'echo'];
		const rows = [];
		for (let id = 0; id < 50000; id++)
			rows.push({
				id,
				a: g.int(1000) === 0 ? 1 : 0,
				b: g.int(100),
				c: 'c' + g.int(50),
				d: g.int(10),
				e: words[g.int(6)] + '-' + words[g.int(6)] + '-' + g.int(1000),
				f: g.int(1000) / 10,
				h: g.int(2),
			});
		return {rows};
	},
	cases: [
		{
			name: 'cheap condition first',
			sql: "SELECT id FROM ? WHERE a = 1 AND (e LIKE '%foo%' OR d IN (1, 2, 3))",
			params: c => [c.rows],
		},
		{
			name: 'expensive condition first',
			sql: "SELECT id FROM ? WHERE (e LIKE '%foo%' OR d IN (1, 2, 3)) AND a = 1",
			params: c => [c.rows],
		},
	],
};
