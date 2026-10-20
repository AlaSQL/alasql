/*
	GROUP BY (#2722): GROUP BY item (column, qualified column, same name from two tables, alias,
	expression, parenthesised expression, position) × use in SELECT / HAVING / ORDER BY ×
	aggregate (each built-in, DISTINCT) × values (numbers, text, dates, NULL, undefined) × input
	(no rows, one group, many groups).

	Table gb (id, k, num, txt, d): k has a NULL group; row 7 was inserted with id and k only, so
	its other columns are undefined in alasql. gb2 has the same column names k and num.
	Not covered yet: user aggregates and GROUP_CONCAT(... ORDER BY ...) (SQLite 3.44 and later only),
	GROUPING SETS, CUBE and ROLLUP (SQLite has none of them).
*/

// [select list for the key, GROUP BY, ORDER BY reference, FROM]
const items = {
	column: ['k', 'k', 'k'],
	qualified: ['gb.k', 'gb.k', 'gb.k'],
	'two tables': ['gb.k, gb2.k', 'gb.k, gb2.k', 'gb.k, gb2.k', 'gb JOIN gb2 ON gb2.id = gb.id'],
	alias: ['k + 0 AS kk', 'kk', 'kk'],
	expression: ['k % 2', 'k % 2', 'k % 2'],
	'parenthesised in SELECT': ['(k % 2)', 'k % 2', 'k % 2'],
	'parenthesised in GROUP BY': ['k % 2', '(k % 2)', '(k % 2)'],
	position: ['k', '1', '1'],
};
const inputs = {'no rows': ' WHERE gb.id < 0', 'one group': ' WHERE gb.k = 1', 'many groups': ''};
const aggregates = [
	v => `COUNT(${v})`,
	v => `COUNT(DISTINCT ${v})`,
	v => `SUM(${v})`,
	v => `SUM(DISTINCT ${v})`,
	v => `AVG(${v})`,
	v => `MIN(${v})`,
	v => `MAX(${v})`,
	v => `GROUP_CONCAT(${v})`,
];

module.exports = function () {
	const cases = [];
	for (const [select, group, order, from = 'gb'] of Object.values(items))
		for (const where of Object.values(inputs)) {
			const base = `SELECT ${select}, COUNT(*), SUM(gb.num) FROM ${from}${where} GROUP BY ${group}`;
			cases.push({sql: base});
			cases.push({sql: `${base} HAVING SUM(gb.num) > 0`});
			cases.push({sql: `${base} HAVING COUNT(*) > 1`});
			cases.push({sql: `${base} ORDER BY ${order}`});
		}
	for (const where of Object.values(inputs)) {
		cases.push({sql: `SELECT k, COUNT(*) FROM gb${where} GROUP BY k`});
		cases.push({sql: `SELECT COUNT(*) FROM gb${where}`});
		for (const v of ['num', 'txt', 'd'])
			for (const agg of aggregates) {
				cases.push({sql: `SELECT k, ${agg(v)} FROM gb${where} GROUP BY k`});
				// no GROUP BY: one group over all rows, also when there are none
				cases.push({sql: `SELECT ${agg(v)} FROM gb${where}`});
			}
	}
	return cases;
};
