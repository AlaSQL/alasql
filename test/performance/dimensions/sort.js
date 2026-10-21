// Full sorts without LIMIT, on one column and on three columns in mixed directions
const regions = [];
for (let i = 0; i < 20; i++) regions.push('region' + String(i).padStart(2, '0'));
module.exports = {
	group: 'sort',
	title: 'Full ORDER BY without LIMIT',
	info: {
		tests:
			'Sorting all 50,000 rows: by one number, and by a string ASC, a number DESC and a string ASC. The same SELECT without ORDER BY is the baseline.',
		why: 'The core case ORDER BY with LIMIT keeps 100 rows. A full sort calls the comparator about 800,000 times, so every branch in the generated comparator, string comparison and NULL handling counts.',
		read: 'Subtract the baseline to get the cost of the sort itself.',
	},
	setup: g => {
		const rows = [];
		for (let id = 0; id < 50000; id++)
			rows.push({
				id,
				region: g.pick(regions),
				score: g.int(1000),
				name: 'n' + String(g.int(1e9)).padStart(9, '0') + '_' + id,
			});
		return {rows};
	},
	cases: [
		{
			name: 'no ORDER BY (baseline)',
			sql: 'SELECT id, region, score, name FROM ?',
			params: c => [c.rows],
		},
		{
			name: 'ORDER BY one number',
			sql: 'SELECT id, score FROM ? ORDER BY score DESC',
			params: c => [c.rows],
			ordered: ['score'],
		},
		{
			name: 'ORDER BY three columns, mixed',
			sql: 'SELECT id, region, score, name FROM ? ORDER BY region ASC, score DESC, name ASC',
			params: c => [c.rows],
			ordered: ['region', 'score', 'name'],
		},
	],
};
