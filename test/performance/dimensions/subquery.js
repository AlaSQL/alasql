// Uncorrelated IN, a semi-join with EXISTS, and NOT IN with NULLs, against a join
module.exports = {
	group: 'subquery',
	title: 'IN, EXISTS and NOT IN subqueries',
	info: {
		tests:
			'A 5,000-row table filtered by a 2,000-row table: with IN (subquery), with a correlated EXISTS, with NOT IN where 5 percent of the keys are NULL, and with a JOIN that gives the same rows as IN.',
		why: 'An uncorrelated IN should be computed once and looked up per row. If it is scanned per outer row, the query goes from N + M to N × M. NOT IN with NULLs is where slowdowns and wrong answers meet: in SQL, NOT IN over a list with a NULL is never true, alasql returns rows (#2597).',
		read: 'Compare each case with the JOIN. A case far slower than the JOIN rescans the inner table. The outer table has 5,000 rows because the correlated EXISTS scans the inner table per outer row: with 50,000 it takes over 6 seconds on develop.',
	},
	setup: g => {
		const t1 = [];
		for (let id = 0; id < 5000; id++) t1.push({id, cat_id: g.int(4000), val: 'v' + g.int(1000)});
		const t2 = [];
		for (let i = 0; i < 2000; i++) t2.push({cat_id: g.rnd() < 0.05 ? null : i, active: g.int(2)});
		return {t1, t2};
	},
	cases: [
		{
			name: 'JOIN (baseline)',
			sql: 'SELECT t1.id, t1.val FROM ? t1 JOIN ? t2 ON t1.cat_id = t2.cat_id WHERE t2.active = 1',
			params: c => [c.t1, c.t2],
		},
		{
			name: 'IN (subquery)',
			sql: 'SELECT id, val FROM ? t1 WHERE cat_id IN (SELECT cat_id FROM ? t2 WHERE active = 1)',
			params: c => [c.t1, c.t2],
		},
		{
			name: 'EXISTS, correlated',
			sql: 'SELECT t1.id, t1.val FROM ? t1 WHERE EXISTS (SELECT 1 FROM ? t2 WHERE t2.cat_id = t1.cat_id AND t2.active = 1)',
			params: c => [c.t1, c.t2],
		},
		{
			name: 'NOT IN with NULLs',
			sql: 'SELECT id, val FROM ? t1 WHERE cat_id NOT IN (SELECT cat_id FROM ? t2)',
			params: c => [c.t1, c.t2],
		},
	],
};
