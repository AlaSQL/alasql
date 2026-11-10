// UPDATE and DELETE on 20 percent of 50,000 rows, and a scan after DELETE
const {load} = require('./util');
const statuses = ['active', 'inactive', 'pending', 'pending', 'pending'];
const create = alasql => {
	alasql('DROP TABLE IF EXISTS bench_mut');
	alasql('CREATE TABLE bench_mut (id INT, status STRING, score NUMBER)');
};
const sumScore = alasql => alasql('SELECT COUNT(*) AS n, SUM(score) AS s FROM bench_mut');
module.exports = {
	group: 'mutation',
	title: 'Bulk UPDATE and DELETE',
	info: {
		tests:
			'UPDATE of 20 percent of 50,000 rows in a parameter array and in a table, DELETE of 20 percent of a table, and a COUNT(*) scan on the table right after the DELETE, against the same scan on a table that holds the same rows freshly loaded.',
		why: 'A DELETE that removes rows one by one with splice moves the rest of the array every time (N squared). A DELETE that leaves holes makes every later scan slower. The table is reloaded before every run, outside the timing.',
		read: 'The scan after DELETE should cost the same as the scan on the fresh table. A slower scan means the DELETE left the table in a worse state.',
	},
	setup: g => {
		const rows = [];
		for (let id = 0; id < 50000; id++) rows.push({id, status: statuses[id % 5], score: g.int(100)});
		return {rows, kept: rows.filter(r => r.status !== 'inactive')};
	},
	cases: [
		{
			name: 'UPDATE a parameter array',
			sql: "UPDATE ? SET score = score * 1.1 WHERE status = 'active'",
			prepare: (alasql, c) => (c.arr = c.rows.map(r => Object.assign({}, r))),
			run: (alasql, c) =>
				alasql("UPDATE ? SET score = score * 1.1 WHERE status = 'active'", [c.arr]),
			check: (alasql, c) => c.arr.reduce((s, r) => s + r.score, 0),
		},
		{
			name: 'UPDATE a table',
			sql: "UPDATE bench_mut SET score = score * 1.1 WHERE status = 'active'",
			init: create,
			prepare: (alasql, c) => load(alasql, 'bench_mut', c.rows),
			run: alasql => alasql("UPDATE bench_mut SET score = score * 1.1 WHERE status = 'active'"),
			check: sumScore,
		},
		{
			name: 'DELETE from a table',
			sql: "DELETE FROM bench_mut WHERE status = 'inactive'",
			init: create,
			prepare: (alasql, c) => load(alasql, 'bench_mut', c.rows),
			run: alasql => alasql("DELETE FROM bench_mut WHERE status = 'inactive'"),
			check: sumScore,
			heap: true,
		},
		{
			name: 'scan after DELETE',
			sql: 'SELECT COUNT(*) AS n FROM bench_mut WHERE score > 50',
			init: create,
			prepare: (alasql, c) => {
				load(alasql, 'bench_mut', c.rows);
				alasql("DELETE FROM bench_mut WHERE status = 'inactive'");
			},
			run: alasql => alasql('SELECT COUNT(*) AS n FROM bench_mut WHERE score > 50'),
		},
		{
			name: 'scan on a fresh table (baseline)',
			sql: 'SELECT COUNT(*) AS n FROM bench_mut WHERE score > 50',
			init: create,
			prepare: (alasql, c) => load(alasql, 'bench_mut', c.kept),
			run: alasql => alasql('SELECT COUNT(*) AS n FROM bench_mut WHERE score > 50'),
		},
	],
};
