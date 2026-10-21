// Indexes: what they save on reads and cost on writes
const {table} = require('./util');
const make = (alasql, name, indexed) => {
	alasql(`DROP TABLE IF EXISTS ${name}`);
	alasql(`CREATE TABLE ${name} (id INT${indexed ? ' PRIMARY KEY' : ''}, email STRING, score INT)`);
	if (indexed) {
		alasql(`CREATE INDEX ${name}_email ON ${name} (email)`);
		alasql(`CREATE INDEX ${name}_score_id ON ${name} (score, id)`);
	}
};
const fill = (alasql, name, rows) => alasql(`INSERT INTO ${name} SELECT * FROM ?`, [rows]);
const empty = (alasql, name) => {
	alasql(`DELETE FROM ${name}`);
	return table(alasql, name).data.length;
};
const users = name => `SELECT COUNT(*) AS n, SUM(score) AS s FROM ${name}`;
module.exports = {
	group: 'index',
	title: 'Indexes: reads and the cost of writes',
	info: {
		tests:
			'A 50,000-row table with a primary key and indexes on email and (score, id), against the same table without them: a point lookup on email, a lookup on score = 85 AND id > 400, a bulk INSERT ... SELECT of 25,000 rows, and an UPDATE of an indexed column on 10,000 rows.',
		why: 'An index should replace a full scan on reads without making bulk writes or updates expensive, for example by rebuilding the index for every row.',
		read: 'Read speedup: unindexed time divided by indexed time. Write penalty: indexed time divided by unindexed time.',
	},
	setup: g => {
		const rows = [];
		for (let id = 0; id < 50000; id++)
			rows.push({id, email: 'user_' + id + '@example.com', score: g.int(100)});
		const more = [];
		for (let id = 50000; id < 75000; id++)
			more.push({id, email: 'user_' + id + '@example.com', score: g.int(100)});
		return {rows, more};
	},
	cases: [
		...[true, false].map(indexed => ({
			name: `point lookup, ${indexed ? 'indexed' : 'no index'}`,
			sql: `SELECT * FROM ${indexed ? 'ix' : 'nx'} WHERE email = 'user_9999@example.com'`,
			init: (alasql, c) => {
				make(alasql, indexed ? 'ix' : 'nx', indexed);
				fill(alasql, indexed ? 'ix' : 'nx', c.rows);
			},
			run: alasql =>
				alasql(`SELECT * FROM ${indexed ? 'ix' : 'nx'} WHERE email = 'user_9999@example.com'`),
		})),
		...[true, false].map(indexed => ({
			name: `score = 85 AND id > 400, ${indexed ? 'indexed' : 'no index'}`,
			sql: `SELECT id FROM ${indexed ? 'ix' : 'nx'} WHERE score = 85 AND id > 400`,
			run: alasql =>
				alasql(`SELECT id FROM ${indexed ? 'ix' : 'nx'} WHERE score = 85 AND id > 400`),
		})),
		...[true, false].map(indexed => ({
			name: `bulk INSERT 25,000 rows, ${indexed ? 'indexed' : 'no index'}`,
			sql: `INSERT INTO ${indexed ? 'iw' : 'nw'} SELECT * FROM ?`,
			init: alasql => make(alasql, indexed ? 'iw' : 'nw', indexed),
			prepare: alasql => empty(alasql, indexed ? 'iw' : 'nw'),
			run: (alasql, c) => fill(alasql, indexed ? 'iw' : 'nw', c.more),
			check: alasql => alasql(users(indexed ? 'iw' : 'nw')),
		})),
		...[true, false].map(indexed => ({
			name: `UPDATE an indexed column on 10,000 rows, ${indexed ? 'indexed' : 'no index'}`,
			sql: `UPDATE ${indexed ? 'iu' : 'nu'} SET score = score + 1 WHERE score < 20`,
			init: alasql => make(alasql, indexed ? 'iu' : 'nu', indexed),
			prepare: (alasql, c) => {
				empty(alasql, indexed ? 'iu' : 'nu');
				fill(alasql, indexed ? 'iu' : 'nu', c.rows);
			},
			run: alasql =>
				alasql(`UPDATE ${indexed ? 'iu' : 'nu'} SET score = score + 1 WHERE score < 20`),
			check: alasql => alasql(users(indexed ? 'iu' : 'nu')),
			maxIters: 3, // every iteration reloads 50,000 rows first
		})),
	],
};
