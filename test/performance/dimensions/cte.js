// A CTE referenced once and twice, against computing it by hand once
const group = 'SELECT region, dept, SUM(amount) AS sum_amount FROM ? GROUP BY region, dept';
const pairs =
	'SELECT a.region, a.dept, a.sum_amount FROM ? a JOIN ? b ON a.region = b.region AND a.sum_amount > b.sum_amount';
module.exports = {
	group: 'cte',
	title: 'Common table expressions (WITH)',
	info: {
		tests:
			'A WITH query on 50,000 rows whose CTE (a GROUP BY into 200 groups) is used once, and used twice in a self-join. The baseline runs the GROUP BY once by hand and joins the result with itself.',
		why: 'A CTE used twice can be computed once or once per use. Computed per use, every extra reference repeats the whole GROUP BY.',
		read: 'The CTE used twice should cost about the baseline. Twice the GROUP BY on top means the CTE runs per reference.',
	},
	setup: g => {
		const rows = [];
		for (let i = 0; i < 50000; i++)
			rows.push({region: 'r' + g.int(10), dept: 'd' + g.int(20), amount: g.int(10000) / 100});
		return {rows};
	},
	cases: [
		{name: 'CTE used once', sql: `WITH rt AS (${group}) SELECT * FROM rt`, params: c => [c.rows]},
		{
			name: 'CTE used twice (self-join)',
			sql: `WITH rt AS (${group}) SELECT a.region, a.dept, a.sum_amount FROM rt a JOIN rt b ON a.region = b.region AND a.sum_amount > b.sum_amount`,
			params: c => [c.rows],
		},
		{
			name: 'GROUP BY once, then the join (baseline)',
			show: `const g = alasql('${group}', [rows]); alasql('${pairs}', [g, g])`,
			run: (alasql, c) => {
				const g = alasql(group, [c.rows]);
				return alasql(pairs, [g, g]);
			},
		},
	],
};
