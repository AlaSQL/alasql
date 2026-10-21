// GROUP BY with few and many groups, on three columns, and with COUNT(DISTINCT)
const regions = ['north', 'south', 'east', 'west', 'central'];
const devices = ['desktop', 'mobile', 'tablet', 'tv'];
const states = ['new', 'paid', 'refunded'];
module.exports = {
	group: 'group-by',
	title: 'GROUP BY cardinality and COUNT(DISTINCT)',
	info: {
		tests:
			'GROUP BY over 100,000 rows into 50 groups and into 25,000 groups, and on three columns at once (60 groups) with COUNT(*) and with COUNT(DISTINCT).',
		why: 'Many groups stress how group keys are hashed and stored. Several columns stress how a composite key is built. COUNT(DISTINCT) keeps a set per group.',
		read: 'Compare 50 with 25,000 groups (same number of rows), and COUNT(DISTINCT) with COUNT(*) on the same groups.',
	},
	setup: g => {
		const rows = [];
		for (let i = 0; i < 100000; i++)
			rows.push({
				u50: g.int(50),
				u25k: g.int(25000),
				region: g.pick(regions),
				device: g.pick(devices),
				state: g.pick(states),
				amount: g.int(10000) / 100,
			});
		return {rows};
	},
	cases: [
		{
			name: '50 groups',
			sql: 'SELECT u50, SUM(amount) AS s FROM ? GROUP BY u50',
			params: c => [c.rows],
		},
		{
			name: '25,000 groups',
			sql: 'SELECT u25k, SUM(amount) AS s FROM ? GROUP BY u25k',
			params: c => [c.rows],
		},
		{
			name: 'three columns, COUNT(*)',
			sql: 'SELECT region, device, state, COUNT(*) AS n, SUM(amount) AS rev FROM ? GROUP BY region, device, state',
			params: c => [c.rows],
		},
		{
			name: 'three columns, COUNT(DISTINCT)',
			sql: 'SELECT region, device, state, COUNT(DISTINCT u25k) AS uniq, SUM(amount) AS rev FROM ? GROUP BY region, device, state',
			params: c => [c.rows],
		},
	],
};
