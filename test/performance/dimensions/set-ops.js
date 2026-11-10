// Chained set operations: three tables of 2,000 rows with 20 percent overlap between neighbours
function table(from, wide) {
	const t = [];
	for (let id = from; id < from + 2000; id++)
		t.push(
			wide
				? {
						id,
						val: 'v' + (id % 1000),
						i1: id % 7,
						i2: id % 11,
						i3: id % 13,
						s1: 's' + (id % 17),
						s2: 's' + (id % 19),
						s3: 's' + (id % 23),
						f1: id / 3,
						f2: id / 7,
					}
				: {id, val: 'v' + (id % 1000)}
		);
	return t;
}
const three = 'SELECT * FROM ? OP SELECT * FROM ? OP SELECT * FROM ?';

module.exports = {
	group: 'set-ops',
	title: 'Chained set operations',
	info: {
		tests:
			'Three-way UNION ALL (plain concatenation) against three-way UNION (deduplication) over three tables of 2,000 rows, with 2 and with 10 columns per row. The tables are small because UNION compares every row with every row (#2744): with 30,000 rows per table one run takes over a minute.',
		why: 'Chaining two UNIONs shows whether duplicates are removed once or intermediate arrays are built per step. Wide rows show the cost of the key that identifies a duplicate row.',
		read: 'Compare UNION with UNION ALL of the same width, and the heap growth of the UNION cases.',
	},
	setup: () => ({
		n: [table(0), table(1600), table(3200)],
		w: [table(0, true), table(1600, true), table(3200, true)],
	}),
	cases: [
		{
			name: 'UNION ALL, 3 tables, 2 columns',
			sql: three.replace(/OP/g, 'UNION ALL'),
			params: c => c.n,
			about: 'The baseline: concatenation of 6,000 rows.',
		},
		{
			name: 'UNION, 3 tables, 2 columns',
			sql: three.replace(/OP/g, 'UNION'),
			params: c => c.n,
			heap: true,
			about: '5,200 distinct rows.',
		},
		{
			name: 'UNION ALL, 3 tables, 10 columns',
			sql: three.replace(/OP/g, 'UNION ALL'),
			params: c => c.w,
		},
		{
			name: 'UNION, 3 tables, 10 columns',
			sql: three.replace(/OP/g, 'UNION'),
			params: c => c.w,
			heap: true,
		},
	],
};
