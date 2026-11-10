// Comparing a number column with a number and with a string, and a LIKE with several wildcards
module.exports = {
	group: 'coercion',
	title: 'Type coercion and complex LIKE',
	info: {
		tests:
			"On 50,000 rows: id = 45000 against id = '45000', and LIKE '%_admin_%@%.org' (several wildcards) against a prefix LIKE.",
		why: 'Shows whether a comparison between types converts once at compile time or for every row, and whether a LIKE pattern becomes one regular expression at compile time or a new one per row.',
		read: 'The string comparison against the number one, and the complex LIKE against the prefix LIKE.',
	},
	setup: g => {
		const rows = [];
		const roles = ['user', 'admin', 'guest', 'editor'];
		const tlds = ['org', 'com', 'net'];
		for (let id = 0; id < 50000; id++)
			rows.push({
				id,
				email: `${roles[g.int(4)]}_${g.pick(roles)}_${id}@mail${g.int(10)}.${g.pick(tlds)}`,
			});
		return {rows};
	},
	cases: [
		{name: 'id = 45000', sql: 'SELECT * FROM ? WHERE id = 45000', params: c => [c.rows]},
		{
			name: "id = '45000'",
			sql: "SELECT * FROM ? WHERE id = '45000'",
			params: c => [c.rows],
			about: "alasql does not convert: '45000' = 45000 is false, so no row matches.",
		},
		{
			name: 'prefix LIKE (baseline)',
			sql: "SELECT id FROM ? WHERE email LIKE 'admin%'",
			params: c => [c.rows],
		},
		{
			name: 'LIKE with several wildcards',
			sql: "SELECT id FROM ? WHERE email LIKE '%_admin_%@%.org'",
			params: c => [c.rows],
		},
	],
};
