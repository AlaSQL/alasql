// The same query on objects of one shape and on objects of many shapes
module.exports = {
	group: 'shapes',
	title: 'Object shapes: uniform and mixed JSON',
	info: {
		tests:
			'The same WHERE and GROUP BY on 50,000 objects that all have the keys {id, a, b, c} in the same order, and on 50,000 objects with the keys in random order and some extra keys.',
		why: 'alasql is often used on JSON from APIs, where objects do not all look alike. V8 and JavaScriptCore optimize property access per object shape; many shapes can make the compiled query much slower.',
		read: 'Time with mixed shapes divided by time with one shape, per runtime.',
	},
	setup: g => {
		const same = [];
		const mixed = [];
		for (let id = 0; id < 50000; id++) {
			const a = g.int(3);
			const b = 'b' + g.int(20);
			const c = g.int(100);
			same.push({id, a, b, c});
			const keys = [
				['id', id],
				['a', a],
				['b', b],
				['c', c],
			];
			for (let i = g.int(4); i > 0; i--) keys.push(['x' + g.int(10), g.int(100)]);
			for (let i = keys.length - 1; i > 0; i--) {
				const j = g.int(i + 1);
				[keys[i], keys[j]] = [keys[j], keys[i]];
			}
			const o = {};
			for (const [k, v] of keys) o[k] = v;
			mixed.push(o);
		}
		return {same, mixed};
	},
	cases: [
		{
			name: 'one shape',
			sql: 'SELECT b, SUM(c) AS s FROM ? WHERE a > 0 GROUP BY b',
			params: c => [c.same],
		},
		{
			name: 'mixed shapes',
			sql: 'SELECT b, SUM(c) AS s FROM ? WHERE a > 0 GROUP BY b',
			params: c => [c.mixed],
		},
	],
};
