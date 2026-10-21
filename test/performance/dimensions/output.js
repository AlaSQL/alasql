// Output modifiers (COLUMN, MATRIX), ROLLUP against three GROUP BYs, and PIVOT
module.exports = {
	group: 'output',
	title: 'Output modifiers, ROLLUP and PIVOT',
	info: {
		tests:
			'On 50,000 rows: a plain SELECT, SELECT COLUMN and SELECT MATRIX; GROUP BY ROLLUP against the same three levels written as GROUP BYs joined with UNION ALL; and PIVOT of four quarters.',
		why: 'People use COLUMN, MATRIX and PIVOT to skip a .map() over the result in JavaScript. If they cost more than the plain SELECT plus that map, they lose their point. ROLLUP should not cost more than the GROUP BYs it replaces.',
		read: 'COLUMN and MATRIX against the plain SELECT; ROLLUP against the UNION ALL of GROUP BYs.',
	},
	setup: g => {
		const rows = [];
		const pivot = [];
		for (let i = 0; i < 50000; i++) {
			const r = {
				region: 'r' + g.int(10),
				category: 'c' + g.int(20),
				quarter: 'Q' + (1 + g.int(4)),
				amount: g.int(10000) / 100,
			};
			rows.push(r);
			pivot.push({region: r.region, quarter: r.quarter, amount: r.amount});
		}
		return {rows, pivot};
	},
	cases: [
		{
			name: 'plain SELECT (baseline)',
			sql: 'SELECT region, category, amount FROM ?',
			params: c => [c.rows],
		},
		{name: 'SELECT COLUMN', sql: 'SELECT COLUMN amount FROM ?', params: c => [c.rows]},
		{
			name: 'SELECT MATRIX',
			sql: 'SELECT MATRIX region, category, amount FROM ?',
			params: c => [c.rows],
		},
		{
			name: 'GROUP BY ROLLUP',
			sql: 'SELECT region, category, SUM(amount) AS s FROM ? GROUP BY ROLLUP(region,category)',
			params: c => [c.rows],
		},
		{
			name: 'three GROUP BYs with UNION ALL (baseline)',
			sql: 'SELECT region, category, SUM(amount) AS s FROM ? GROUP BY region, category UNION ALL SELECT region, NULL AS category, SUM(amount) AS s FROM ? GROUP BY region UNION ALL SELECT NULL AS region, NULL AS category, SUM(amount) AS s FROM ?',
			params: c => [c.rows, c.rows, c.rows],
		},
		{
			name: 'PIVOT',
			sql: 'SELECT * FROM ? PIVOT (SUM(amount) FOR quarter IN (Q1, Q2, Q3, Q4))',
			params: c => [c.pivot],
		},
	],
};
