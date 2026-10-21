/*
	Set operations (#2718): operator (UNION, UNION ALL, INTERSECT, EXCEPT) × parentheses around each
	branch or none × ORDER BY / LIMIT on none, the first branch, the last branch, the statement, or
	several × chain length two or three × mixed operators (precedence) × a subquery inside a branch.

	SQLite does not accept a parenthesised branch; its spelling of one is SELECT * FROM (branch).
	SQLite evaluates a chain left to right with one precedence for all operators.
	Not covered: CORRESPONDING, INTERSECT ALL and EXCEPT ALL (SQLite has none of them).
*/

const ops = ['UNION', 'UNION ALL', 'INTERSECT', 'EXCEPT'];
const local = ' ORDER BY v DESC LIMIT 2';

// One branch as alasql and SQLite spell it
function branch(sql, parens, withLocal) {
	const inner = sql + (withLocal ? local : '');
	if (!parens) return {a: inner, s: inner};
	return {a: `(${inner})`, s: `SELECT * FROM (${inner})`};
}

function chain(branches, operators, tail) {
	let a = branches[0].a;
	let s = branches[0].s;
	operators.forEach((op, i) => {
		a += ` ${op} ${branches[i + 1].a}`;
		s += ` ${op} ${branches[i + 1].s}`;
	});
	return {sql: a + tail, sqlite: s === a ? undefined : s + tail};
}

module.exports = function () {
	const cases = [];
	const tails = {
		none: '',
		statement: ' ORDER BY v',
		'statement limit': ' ORDER BY v LIMIT 2 OFFSET 1',
	};
	for (const op of ops)
		for (const last of ['SELECT v FROM q', 'SELECT v FROM q WHERE v IN (SELECT v FROM r)'])
			for (const parens of [false, true]) {
				const placements = parens
					? ['none', 'statement', 'statement limit', 'first', 'last', 'several']
					: ['none', 'statement', 'statement limit', 'first'];
				for (const place of placements) {
					const first = branch('SELECT v FROM p', parens, place === 'first' || place === 'several');
					const second = branch(last, parens, place === 'last');
					const tail = place === 'several' ? tails.statement : tails[place] || '';
					cases.push(chain([first, second], [op], tail));
				}
			}
	// three branches: every pair of operators, so precedence and associativity show
	for (const op1 of ops)
		for (const op2 of ops)
			for (const parens of [false, true])
				for (const tail of ['', ' ORDER BY v']) {
					const bs = ['SELECT v FROM p', 'SELECT v FROM q', 'SELECT v FROM r'].map(b =>
						branch(b, parens, false)
					);
					cases.push(chain(bs, [op1, op2], tail));
				}
	return cases;
};
