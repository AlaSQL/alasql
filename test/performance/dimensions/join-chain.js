// Four tables joined, starting from the selective table and starting from the largest one
module.exports = {
	group: 'join-chain',
	title: 'Four-table join and join order',
	info: {
		tests:
			'users (10,000, 5 percent in DK) JOIN orders (30,000) JOIN items (50,000) JOIN products (5,000), filtered on the users: once starting from users, once from items.',
		why: 'Each join step can build full intermediate rows. Starting from the selective table keeps them small, unless alasql pushes the filter down or reorders the joins itself. The heap growth shows how large the intermediate results get.',
		read: 'Compare the two orders. A large gap means alasql runs the joins in the written order without pushing the filter down.',
	},
	setup: g => {
		const users = [];
		for (let id = 0; id < 10000; id++)
			users.push({id, name: 'u' + id, country: g.int(20) === 0 ? 'DK' : 'XX'});
		const orders = [];
		for (let id = 0; id < 30000; id++) orders.push({id, user_id: g.int(10000)});
		const items = [];
		for (let id = 0; id < 50000; id++)
			items.push({id, order_id: g.int(30000), product_id: g.int(5000), qty: 1 + g.int(5)});
		const products = [];
		for (let id = 0; id < 5000; id++) products.push({id, title: 'p' + id});
		return {users, orders, items, products};
	},
	cases: [
		{
			name: 'selective table first',
			sql: "SELECT u.name, p.title, i.qty FROM ? u JOIN ? o ON u.id = o.user_id JOIN ? i ON o.id = i.order_id JOIN ? p ON i.product_id = p.id WHERE u.country = 'DK'",
			params: c => [c.users, c.orders, c.items, c.products],
			heap: true,
		},
		{
			name: 'largest table first',
			sql: "SELECT u.name, p.title, i.qty FROM ? i JOIN ? p ON i.product_id = p.id JOIN ? o ON o.id = i.order_id JOIN ? u ON u.id = o.user_id WHERE u.country = 'DK'",
			params: c => [c.items, c.products, c.orders, c.users],
			heap: true,
		},
	],
};
