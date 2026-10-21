// Foreign key checks on INSERT, DELETE of referenced parents, and an AFTER UPDATE trigger
const {load} = require('./util');
let fired = 0;
module.exports = {
	group: 'constraints',
	title: 'Foreign keys and triggers',
	info: {
		tests:
			'A bulk INSERT of 5,000 child rows with and without a FOREIGN KEY to a 10,000-row parent, a DELETE of 100 parents that 5,000 child rows refer to, and an UPDATE of 5,000 rows with and without an AFTER UPDATE trigger.',
		why: 'If every foreign key check scans the parent table, bulk inserts become N × M. Triggers add a call per row. alasql accepts ON DELETE CASCADE but does not apply it (#2336, #2656), so the DELETE case measures the DELETE without a cascade.',
		read: 'The cost per 1,000 rows of each case against its plain twin.',
	},
	setup: (g, alasql) => {
		alasql.fn.benchTrigger = () => {
			fired++;
		};
		const parents = [];
		for (let id = 0; id < 10000; id++) parents.push({id, name: 'p' + id});
		const children = [];
		for (let id = 0; id < 5000; id++) children.push({id, parent_id: g.int(100) + 1});
		const tr = [];
		for (let id = 1; id <= 10000; id++) tr.push({id, val: 'v' + id});
		return {parents, children, tr};
	},
	cases: [
		...[true, false].map(fk => ({
			name: `INSERT 5,000 child rows, ${fk ? 'with' : 'without'} foreign key`,
			sql: `INSERT INTO ${fk ? 'child_fk' : 'child_plain'} SELECT * FROM ?`,
			init: (alasql, c) => {
				if (fk) {
					alasql('DROP TABLE IF EXISTS parent');
					alasql('CREATE TABLE parent (id INT PRIMARY KEY, name STRING)');
					alasql('INSERT INTO parent SELECT * FROM ?', [c.parents]);
				}
				alasql(`DROP TABLE IF EXISTS ${fk ? 'child_fk' : 'child_plain'}`);
				alasql(
					fk
						? 'CREATE TABLE child_fk (id INT, parent_id INT REFERENCES parent(id) ON DELETE CASCADE)'
						: 'CREATE TABLE child_plain (id INT, parent_id INT)'
				);
			},
			prepare: alasql => alasql(`DELETE FROM ${fk ? 'child_fk' : 'child_plain'}`),
			run: (alasql, c) =>
				alasql(`INSERT INTO ${fk ? 'child_fk' : 'child_plain'} SELECT * FROM ?`, [c.children]),
			check: alasql =>
				alasql(`SELECT COUNT(*) AS n, SUM(parent_id) AS s FROM ${fk ? 'child_fk' : 'child_plain'}`),
		})),
		{
			name: 'DELETE 100 referenced parents',
			sql: 'DELETE FROM parent WHERE id <= 100',
			prepare: (alasql, c) => {
				alasql('DELETE FROM child_fk');
				alasql('DELETE FROM parent');
				alasql('INSERT INTO parent SELECT * FROM ?', [c.parents]);
				alasql('INSERT INTO child_fk SELECT * FROM ?', [c.children]);
			},
			run: alasql => alasql('DELETE FROM parent WHERE id <= 100'),
			check: alasql =>
				alasql('SELECT (SELECT COUNT(*) FROM parent) AS p, (SELECT COUNT(*) FROM child_fk) AS c'),
		},
		...[false, true].map(trig => ({
			name: `UPDATE 5,000 rows, ${trig ? 'with' : 'without'} trigger`,
			sql: `UPDATE ${trig ? 't_trig' : 't_plain'} SET val = 'updated' WHERE id <= 5000`,
			init: alasql => {
				const t = trig ? 't_trig' : 't_plain';
				alasql(`DROP TABLE IF EXISTS ${t}`);
				alasql(`CREATE TABLE ${t} (id INT, val STRING)`);
				if (trig) alasql(`CREATE TRIGGER bench_trg AFTER UPDATE ON ${t} CALL benchTrigger()`);
			},
			prepare: (alasql, c) => {
				load(alasql, trig ? 't_trig' : 't_plain', c.tr);
				fired = 0;
			},
			run: alasql =>
				alasql(`UPDATE ${trig ? 't_trig' : 't_plain'} SET val = 'updated' WHERE id <= 5000`),
			check: (alasql, c, res) => [res, fired],
		})),
	],
};
