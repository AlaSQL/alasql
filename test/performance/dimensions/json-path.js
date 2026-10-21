// Nested JSON: arrow paths against flat properties, and SEARCH over nested arrays
const cities = ['Copenhagen', 'Aarhus', 'Odense', 'Aalborg', 'Esbjerg'];
module.exports = {
	group: 'json-path',
	title: 'Nested JSON: arrow paths and SEARCH',
	info: {
		tests:
			'50,000 nested documents: a four-level arrow path (meta->user->address->city) in SELECT and WHERE, the same query on flat rows that hold the city directly, and SEARCH through nested arrays of orders and items.',
		why: 'Querying JSON as it comes, without flattening it first, is what alasql offers over SQLite or DuckDB in the browser. A path that is resolved again for every row, instead of compiled to property access, makes this slow.',
		read: 'Compare the arrow path with the flat query: the ratio is the cost of the path.',
	},
	setup: g => {
		const docs = [];
		const flat = [];
		for (let id = 0; id < 50000; id++) {
			const city = g.pick(cities);
			const orders = [];
			for (let o = g.int(3); o >= 0; o--) {
				const items = [];
				for (let i = g.int(3); i >= 0; i--) items.push({price: g.int(200)});
				orders.push({items});
			}
			docs.push({id, meta: {user: {address: {city}}}, orders});
			flat.push({id, city});
		}
		return {docs, flat, few: docs.slice(0, 5000)};
	},
	cases: [
		{
			name: 'flat property (baseline)',
			sql: "SELECT id, city FROM ? WHERE city = 'Copenhagen'",
			params: c => [c.flat],
		},
		{
			name: 'arrow path, 4 levels',
			sql: "SELECT id, meta->user->address->city AS city FROM ? WHERE meta->user->address->city = 'Copenhagen'",
			params: c => [c.docs],
		},
		{
			name: 'SEARCH through nested arrays',
			sql: 'SEARCH / orders / items / WHERE(price > 100) price FROM ?',
			params: c => [c.few],
			about: 'On the first 5,000 documents: SEARCH takes about a second for all 50,000 on develop.',
		},
	],
};
