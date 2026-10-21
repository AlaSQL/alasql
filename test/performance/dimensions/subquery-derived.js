// The query shape of #937: EXISTS over a derived table (a subquery in FROM) that is itself uncorrelated
module.exports = {
	group: 'subquery-derived',
	title: 'EXISTS over a derived table (#937)',
	info: {
		tests:
			'The pagination query from #937 on 1,000 rows: EXISTS over a derived table with GROUP BY and LIMIT 100, matched to the outer row on a key built with CONCAT_WS, then the same with a plain key, and the JOIN that gives the same rows.',
		why: 'The derived table does not depend on the outer row, so it can be computed once. #937 reported 20 seconds for this shape on 1,000 rows: the derived table is computed again for every outer row.',
		read: 'Compare both EXISTS cases with the JOIN. The gap is the cost of computing the derived table per outer row.',
	},
	setup: () => {
		const person = [];
		for (let i = 0; i < 1000; i++) person.push({pk: 'p' + i, name: 'name' + i});
		return {person};
	},
	cases: [
		{
			name: 'EXISTS, CONCAT_WS key',
			sql: "SELECT p.pk, p.name FROM ? p WHERE EXISTS (SELECT 1 FROM (SELECT CONCAT_WS(':', 'Person', pk) AS k FROM ? GROUP BY pk LIMIT 100) x WHERE x.k = CONCAT_WS(':', 'Person', p.pk))",
			params: c => [c.person, c.person],
			about: 'The query from the issue, reduced to its shape.',
		},
		{
			name: 'EXISTS, plain key',
			sql: 'SELECT p.pk, p.name FROM ? p WHERE EXISTS (SELECT 1 FROM (SELECT pk AS k FROM ? GROUP BY pk LIMIT 100) x WHERE x.k = p.pk)',
			params: c => [c.person, c.person],
		},
		{
			name: 'JOIN (baseline)',
			sql: 'SELECT p.pk, p.name FROM ? p JOIN (SELECT pk AS k FROM ? GROUP BY pk LIMIT 100) x ON x.k = p.pk',
			params: c => [c.person, c.person],
		},
	],
};
