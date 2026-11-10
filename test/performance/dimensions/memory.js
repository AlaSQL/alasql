// Large results: a CROSS JOIN of 4 million rows, and SELECT * on rows with 100 columns
module.exports = {
	group: 'memory',
	title: 'Large results: CROSS JOIN and wide rows',
	info: {
		tests:
			'A CROSS JOIN of 2,000 × 2,000 rows (4 million result rows), and on 50,000 rows with 100 columns a SELECT * against a SELECT of two columns.',
		why: 'Large results test the memory limit and the cost of building result objects. SELECT * on wide rows copies 100 properties per row.',
		read: 'The heap growth of the CROSS JOIN, and SELECT * divided by the two-column SELECT.',
	},
	setup: g => {
		const a = [];
		for (let id = 0; id < 2000; id++) a.push({id});
		const wide = [];
		for (let id = 0; id < 50000; id++) {
			const r = {id};
			for (let k = 1; k <= 100; k++) r['col' + k] = k === 1 ? g.int(100) : id * k;
			wide.push(r);
		}
		return {a, wide};
	},
	cases: [
		{
			name: 'CROSS JOIN, 4 million rows',
			sql: 'SELECT t1.id AS a, t2.id AS b FROM ? t1 CROSS JOIN ? t2',
			params: c => [c.a, c.a],
			countOnly: true,
			heap: true,
			maxIters: 3,
		},
		{
			name: 'SELECT *, 100 columns',
			sql: 'SELECT * FROM ? WHERE col1 > 50',
			params: c => [c.wide],
			heap: true,
		},
		{
			name: 'SELECT 2 of 100 columns',
			sql: 'SELECT col1, col2 FROM ? WHERE col1 > 50',
			params: c => [c.wide],
		},
	],
};
