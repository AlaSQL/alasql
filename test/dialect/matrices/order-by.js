/*
	ORDER BY (#2720): item (name, alias, position, quoted name, expression, parameter) × query
	(plain, grouped, set operation, SELECT *, with a subquery) × values (numbers, text, dates,
	mixed, with NULL and undefined) × options (ASC / DESC, NULLS FIRST / LAST, COLLATE NOCASE)
	× LIMIT / OFFSET.

	Table o (id, num, txt, d, mix): row 4 holds NULLs, row 7 was inserted with id only, so its
	columns are undefined in alasql. Queries that keep id end with ", id" so ties sort the same
	way in both engines.
*/

const columns = ['num', 'txt', 'd', 'mix'];
const position = {num: 2, txt: 3, d: 4, mix: 5}; // in SELECT * FROM o
const expression = {num: '0 - num', txt: 'LOWER(txt)', d: 'SUBSTR(d, 6)', mix: "mix || ''"};
const allOptions = [
	'',
	' DESC',
	' NULLS FIRST',
	' DESC NULLS LAST',
	' COLLATE NOCASE',
	' COLLATE NOCASE DESC',
];

module.exports = function () {
	const cases = [];
	for (const c of columns) {
		// plain query: every item with every option
		const plain = {
			name: [`SELECT id, ${c} FROM o`, c],
			alias: [`SELECT id, ${c} AS k FROM o`, 'k'],
			position: [`SELECT id, ${c} FROM o`, '2'],
			quoted: [`SELECT id, ${c} FROM o`, `"${c}"`],
			bracketed: [`SELECT id, ${c} FROM o`, `[${c}]`],
			expression: [`SELECT id, ${c} FROM o`, expression[c]],
		};
		for (const [select, item] of Object.values(plain))
			for (const opt of allOptions) cases.push({sql: `${select} ORDER BY ${item}${opt}, id`});
		for (const opt of ['', ' DESC'])
			cases.push({sql: `SELECT id, ${c} FROM o ORDER BY ?${opt}, id`, params: [c]});

		// SELECT * and a subquery as the source
		for (const from of ['SELECT * FROM o', `SELECT id, ${c} FROM (SELECT * FROM o) AS z`])
			for (const item of [
				c,
				from.startsWith('SELECT *') ? String(position[c]) : '2',
				expression[c],
			])
				for (const opt of ['', ' DESC', ' NULLS FIRST'])
					cases.push({sql: `${from} ORDER BY ${item}${opt}, id`});

		// grouped: the group key is unique, so no tie-break
		const grouped = {
			name: [`SELECT ${c}, COUNT(*) FROM o GROUP BY ${c}`, c],
			alias: [`SELECT ${c} AS k, COUNT(*) FROM o GROUP BY ${c}`, 'k'],
			position: [`SELECT ${c}, COUNT(*) FROM o GROUP BY ${c}`, '1'],
			expression: [`SELECT ${c}, COUNT(*) FROM o GROUP BY ${c}`, expression[c]],
		};
		for (const [select, item] of Object.values(grouped))
			for (const opt of ['', ' DESC', ' NULLS FIRST', ' DESC NULLS LAST'])
				cases.push({sql: `${select} ORDER BY ${item}${opt}`});

		// set operation: SQLite only accepts output columns here, so the expression is an error there
		const union = `FROM o UNION SELECT id, ${c} FROM o2`;
		const setop = {
			name: [`SELECT id, ${c} ${union}`, c],
			alias: [`SELECT id, ${c} AS k ${union}`, 'k'],
			position: [`SELECT id, ${c} ${union}`, '2'],
			expression: [`SELECT id, ${c} ${union}`, expression[c]],
		};
		for (const [select, item] of Object.values(setop))
			for (const opt of ['', ' DESC', ' COLLATE NOCASE'])
				cases.push({sql: `${select} ORDER BY ${item}${opt}, id`});

		// LIMIT and OFFSET
		for (const dir of ['', ' DESC'])
			for (const limit of [' LIMIT 3', ' LIMIT 3 OFFSET 2'])
				cases.push({sql: `SELECT id, ${c} FROM o ORDER BY ${c}${dir}, id${limit}`});
	}
	return cases;
};
