// A user-defined function in SELECT and in ORDER BY, and how often ORDER BY calls it
let calls = 0;
function customHash(s) {
	calls++;
	let h = 0;
	for (let i = 0; i < s.length; i++) h = (Math.imul(h, 31) + s.charCodeAt(i)) | 0;
	return h;
}
module.exports = {
	group: 'udf',
	title: 'User-defined functions',
	info: {
		tests:
			'A JavaScript function registered on alasql.fn, called in SELECT and in ORDER BY over 50,000 rows, against ORDER BY on a plain column. The extra metric counts the calls per row in ORDER BY.',
		why: 'Shows the cost of calling into user JavaScript, and whether ORDER BY computes the sort key once per row (1 call per row) or inside the comparator (about 2 log N, about 30 per row).',
		read: 'Calls per row: 1 is ideal. The UDF ORDER BY against the plain ORDER BY shows what the extra calls cost.',
	},
	setup: (g, alasql) => {
		alasql.fn.customHash = customHash;
		const rows = [];
		for (let id = 0; id < 50000; id++) rows.push({id, val: 'v' + g.int(1e9)});
		return {rows};
	},
	cases: [
		{name: 'UDF in SELECT', sql: 'SELECT customHash(val) AS h FROM ?', params: c => [c.rows]},
		{
			name: 'ORDER BY a column (baseline)',
			sql: 'SELECT id, val FROM ? ORDER BY val DESC',
			params: c => [c.rows],
			ordered: ['val'],
		},
		{
			name: 'UDF in ORDER BY',
			sql: 'SELECT id, val FROM ? ORDER BY customHash(val) DESC',
			params: c => [c.rows],
			ordered: ['id'],
			extra: {
				name: 'calls per row',
				unit: 'calls',
				about: 'How often ORDER BY calls the function per row.',
				value: (alasql, c) => {
					calls = 0;
					alasql('SELECT id, val FROM ? ORDER BY customHash(val) DESC', [c.rows]);
					return calls / c.rows.length;
				},
			},
		},
	],
};
