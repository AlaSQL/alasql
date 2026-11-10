/*
	Subqueries (#2717): kind (scalar, IN, EXISTS, FROM, JOIN, CTE) × position (SELECT list, WHERE,
	HAVING, ON) × correlated or not, qualified or unqualified × depth one to three × inside a UNION
	branch or not × grouped or not.

	The outer table is t (id, n, s, g). The inner tables u, w and z have their own column names
	(ug, wg, zg, ...), so an unqualified g can only mean the outer t.g.
	Not covered yet: subqueries in views (each would need its own CREATE VIEW).
*/

const levels = ['u', 'w', 'z'];

// The correlation predicate at one level: none, qualified (u.ug = t.g) or unqualified (ug = g)
function pred(level, corr) {
	if (corr === 'qualified') return `${level}.${level}g = t.g`;
	if (corr === 'unqualified') return `${level}g = g`;
	return `${level}.${level}g IS NOT NULL`;
}

// A subquery over u selecting `select`. Depth 2 and 3 nest IN subqueries over w and z, and the
// correlation sits in the innermost one.
function sub(select, depth, corr) {
	let where = pred(levels[depth - 1], corr);
	for (let d = depth - 1; d >= 1; d--) {
		const inner = levels[d];
		where = `${levels[d - 1]}.${levels[d - 1]}n IN (SELECT ${inner}.${inner}n FROM ${inner} WHERE ${where})`;
	}
	return `SELECT ${select} FROM u WHERE ${where}`;
}

// Each template: body (without ORDER BY), order, width (columns), and whether it can be correlated
const templates = [
	// SELECT list
	{body: s => `SELECT id, (${s('MAX(u.un)')}) FROM t`, order: 'id', width: 2},
	{body: s => `SELECT id, EXISTS (${s('1')}) FROM t`, order: 'id', width: 2},
	{body: s => `SELECT id, n IN (${s('u.un')}) FROM t`, order: 'id', width: 2},
	// WHERE
	{body: s => `SELECT id FROM t WHERE n < (${s('MAX(u.un)')})`, order: 'id', width: 1},
	{body: s => `SELECT id FROM t WHERE n IN (${s('u.un')})`, order: 'id', width: 1},
	{body: s => `SELECT id FROM t WHERE n NOT IN (${s('u.un')})`, order: 'id', width: 1},
	{body: s => `SELECT id FROM t WHERE EXISTS (${s('1')})`, order: 'id', width: 1},
	{body: s => `SELECT id FROM t WHERE NOT EXISTS (${s('1')})`, order: 'id', width: 1},
	// HAVING
	{
		body: s => `SELECT g, COUNT(*) FROM t GROUP BY g HAVING COUNT(*) <= (${s('COUNT(*)')})`,
		order: 'g',
		width: 2,
	},
	{
		body: s => `SELECT g, COUNT(*) FROM t GROUP BY g HAVING MAX(n) IN (${s('u.un')})`,
		order: 'g',
		width: 2,
	},
	{
		body: s => `SELECT g, COUNT(*) FROM t GROUP BY g HAVING EXISTS (${s('1')})`,
		order: 'g',
		width: 2,
	},
	// ON
	{
		body: s => `SELECT t.id, p.v FROM t JOIN p ON p.v = t.id AND EXISTS (${s('1')})`,
		order: 't.id, p.v',
		width: 2,
	},
	{
		body: s => `SELECT t.id, p.v FROM t JOIN p ON p.v = t.id AND t.n IN (${s('u.un')})`,
		order: 't.id, p.v',
		width: 2,
	},
	// grouped outer query
	{body: s => `SELECT g, COUNT(*), (${s('MAX(u.un)')}) FROM t GROUP BY g`, order: 'g', width: 3},
	{body: s => `SELECT g, EXISTS (${s('1')}) FROM t GROUP BY g`, order: 'g', width: 2},
	{
		body: s => `SELECT g, COUNT(*) FROM t WHERE n IN (${s('u.un')}) GROUP BY g`,
		order: 'g',
		width: 2,
	},
	// FROM, JOIN and CTE: derived tables cannot see the outer row, so uncorrelated only
	{
		body: s => `SELECT * FROM (${s('u.uid, u.un')}) AS q`,
		order: null,
		width: 2,
		uncorrelated: true,
	},
	{
		body: s => `SELECT t.id, q.un FROM t JOIN (${s('u.ug, u.un')}) AS q ON q.ug = t.g`,
		order: 't.id, q.un',
		width: 2,
		uncorrelated: true,
	},
	{
		body: s => `SELECT t.id, q.un FROM t LEFT JOIN (${s('u.ug, u.un')}) AS q ON q.ug = t.g`,
		order: 't.id, q.un',
		width: 2,
		uncorrelated: true,
	},
	{
		body: s => `WITH q AS (${s('u.un')}) SELECT id FROM t WHERE n IN (SELECT un FROM q)`,
		order: 'id',
		width: 1,
		uncorrelated: true,
	},
	{
		body: s => `WITH q AS (${s('u.ug, u.un')}) SELECT t.id, q.un FROM t JOIN q ON q.ug = t.g`,
		order: 't.id, q.un',
		width: 2,
		uncorrelated: true,
	},
];

module.exports = function () {
	const cases = [];
	for (const tpl of templates)
		for (const corr of tpl.uncorrelated ? ['none'] : ['none', 'qualified', 'unqualified'])
			for (const depth of [1, 2, 3]) {
				const body = tpl.body(select => sub(select, depth, corr));
				cases.push({sql: tpl.order ? `${body} ORDER BY ${tpl.order}` : body});
				// the same query as the second branch of a UNION ALL; distinct names in the first branch
				const first =
					'SELECT ' + Array.from({length: tpl.width}, (_, i) => `-1 AS c${i + 1}`).join(', ');
				if (!body.startsWith('WITH')) cases.push({sql: `${first} UNION ALL ${body}`});
			}
	return cases;
};
