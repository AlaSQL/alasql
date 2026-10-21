// LEFT JOIN with 90 percent unmatched rows, alone and feeding a GROUP BY
const reasons = ['damaged', 'late', 'wrong item', 'changed mind', 'other'];
module.exports = {
	group: 'left-join',
	title: 'LEFT JOIN and what follows it',
	info: {
		tests:
			'50,000 orders LEFT JOIN 5,000 returns (90 percent of the orders have none): the join alone, the join feeding a GROUP BY, and the same GROUP BY on a flat table that already holds the joined rows.',
		why: 'Unmatched rows have to be filled with NULLs. If the filled rows do not all get the same properties in the same order, the JavaScript engine sees many object shapes and every later step on them slows down.',
		read: 'Compare the join plus GROUP BY with the join alone and with the flat GROUP BY: the extra cost of grouping joined rows should be close to the flat GROUP BY.',
	},
	setup: g => {
		const orders = [];
		const returns = [];
		const flat = [];
		for (let id = 0; id < 50000; id++) {
			const amount = g.int(10000) / 100;
			orders.push({id, amount, customer: 'c' + g.int(5000)});
			const reason = id % 10 === 0 ? reasons[g.int(reasons.length)] : null;
			if (reason) returns.push({order_id: id, reason});
			flat.push({id, amount, reason});
		}
		return {orders, returns, flat};
	},
	cases: [
		{
			name: 'LEFT JOIN alone',
			sql: 'SELECT o.id, o.amount, r.reason FROM ? o LEFT JOIN ? r ON o.id = r.order_id',
			params: c => [c.orders, c.returns],
		},
		{
			name: 'LEFT JOIN + GROUP BY',
			sql: 'SELECT r.reason, COUNT(*) AS cnt, SUM(o.amount) AS sum_amount FROM ? o LEFT JOIN ? r ON o.id = r.order_id GROUP BY r.reason',
			params: c => [c.orders, c.returns],
		},
		{
			name: 'GROUP BY on the flat table (baseline)',
			sql: 'SELECT reason, COUNT(*) AS cnt, SUM(amount) AS sum_amount FROM ? GROUP BY reason',
			params: c => [c.flat],
		},
	],
};
