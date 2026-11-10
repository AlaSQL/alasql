// A correlated scalar subquery: the inner query runs for every outer row
module.exports = {
	group: 'correlated',
	title: 'Correlated scalar subquery',
	info: {
		tests:
			'SELECT with a correlated subquery that finds the highest score per user in a 5,000-row table, for 1,000 and for 2,000 outer rows. The inner table is scanned per outer row, so larger tables take seconds per run on develop.',
		why: 'The inner query depends on the outer row, so it runs once per outer row. If its compiled form or its scope is rebuilt every time, the cost per outer row grows.',
		read: 'Doubling the outer rows should double the time. More than double means each inner run got more expensive.',
	},
	setup: g => {
		const t2 = [];
		for (let i = 0; i < 5000; i++) t2.push({user_id: g.int(2000), score: g.int(1000)});
		const ids = n => Array.from({length: n}, (_, id) => ({id}));
		return {t2, t1a: ids(1000), t1b: ids(2000)};
	},
	cases: [
		{
			name: '1,000 outer rows',
			sql: 'SELECT t1.id, (SELECT MAX(t2.score) FROM ? t2 WHERE t2.user_id = t1.id) AS max_score FROM ? t1',
			params: c => [c.t2, c.t1a],
		},
		{
			name: '2,000 outer rows',
			sql: 'SELECT t1.id, (SELECT MAX(t2.score) FROM ? t2 WHERE t2.user_id = t1.id) AS max_score FROM ? t1',
			params: c => [c.t2, c.t1b],
		},
	],
};
