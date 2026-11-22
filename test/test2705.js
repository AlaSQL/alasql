if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2705'; // Use the ID of the issue being fixed by this PR

// Every statement that takes db.table, run while another database is the current one.
// The results are the ones 4.23.2 gives: the lookup moved to one place, nothing else changed.
describe(`Test ${testId} - db.table in every statement that takes a table`, function () {
	const other = 'test' + testId + 'b';

	before(function () {
		alasql('create database test' + testId);
		alasql('create database ' + other);
		alasql('use test' + testId);
		alasql.fn.snitch2705 = function () {};
	});

	after(function () {
		delete alasql.fn.snitch2705;
		alasql('drop database test' + testId);
		alasql('drop database ' + other);
	});

	it('A) CREATE TABLE, INSERT, SELECT, JOIN and a foreign key', function () {
		let res = [];
		res.push(alasql(`create table ${other}.parent (id int primary key)`));
		res.push(alasql(`insert into ${other}.parent values (1),(2)`));
		res.push(alasql(`create table ${other}.t (a int, p int references ${other}.parent(id))`));
		res.push(alasql(`insert into ${other}.t values (1,1),(2,2),(3,1)`));
		assert.throws(
			() => alasql(`insert into ${other}.t values (4,9)`),
			/Foreign key "9" not found in table "parent"/
		);
		res.push(alasql(`select * from ${other}.t order by a`));
		res.push(
			alasql(
				`select t.a, parent.id from ${other}.t join ${other}.parent on t.p = parent.id order by a`
			)
		);
		assert.deepStrictEqual(res, [
			1,
			2,
			1,
			3,
			[
				{a: 1, p: 1},
				{a: 2, p: 2},
				{a: 3, p: 1},
			],
			[
				{a: 1, id: 1},
				{a: 2, id: 2},
				{a: 3, id: 1},
			],
		]);
	});

	it('B) UPDATE, DELETE, CREATE INDEX and CREATE TRIGGER', function () {
		let res = [];
		res.push(alasql(`update ${other}.t set a = a + 10 where p = 2`));
		res.push(alasql(`delete from ${other}.t where a = 3`));
		res.push(alasql(`create index ix2705 on ${other}.t (a)`));
		res.push(alasql(`create trigger tr2705 before insert on ${other}.t snitch2705`));
		res.push(alasql(`select * from ${other}.t order by a`));
		res.push(Object.keys(alasql.databases[other].triggers));
		res.push(alasql.databases[other].indices.ix2705);
		assert.deepStrictEqual(res, [
			1,
			1,
			1,
			1,
			[
				{a: 1, p: 1},
				{a: 12, p: 2},
			],
			['tr2705'],
			't',
		]);
	});

	it('C) SHOW COLUMNS, SHOW INDEX and SHOW CREATE TABLE', function () {
		let res = [];
		res.push(alasql(`show columns from ${other}.t`));
		res.push(alasql(`show columns from t from ${other}`));
		res.push(alasql(`show index from ${other}.t`).length);
		res.push(alasql(`show create table ${other}.t`));
		const columns = [
			{columnid: 'a', dbtypeid: 'INT', dbsize: undefined},
			{columnid: 'p', dbtypeid: 'INT', dbsize: undefined},
		];
		assert.deepStrictEqual(res, [columns, columns, 1, 'CREATE TABLE t (a INT, p INT)']);
	});

	it('D) SELECT INTO, CREATE VIEW, ALTER TABLE, TRUNCATE and DROP TABLE', function () {
		let res = [];
		res.push(alasql(`alter table ${other}.t add column c string`));
		res.push(alasql(`create table ${other}.copy (a int)`));
		res.push(alasql(`select a into ${other}.copy from ${other}.t`));
		res.push(alasql(`select * from ${other}.copy order by a`));
		res.push(alasql(`create view ${other}.v as select a from ${other}.t where a > 1`));
		res.push(alasql(`select * from ${other}.v`));
		res.push(alasql(`alter table ${other}.copy rename to copy2`));
		res.push(alasql(`truncate table ${other}.copy2`));
		res.push(alasql(`select * from ${other}.copy2`));
		res.push(alasql(`show tables from ${other}`));
		res.push(alasql(`drop table ${other}.copy2, ${other}.v`));
		res.push(alasql(`drop table if exists ${other}.nothere`));
		res.push(alasql(`show tables from ${other}`));
		assert.deepStrictEqual(res, [
			1,
			1,
			2,
			[{a: 1}, {a: 12}],
			1,
			[{a: 12}],
			1,
			0,
			[],
			[{tableid: 'parent'}, {tableid: 't'}, {tableid: 'v'}, {tableid: 'copy2'}],
			2,
			0,
			[{tableid: 'parent'}, {tableid: 't'}],
		]);
	});

	it('E) Nothing was made in the current database', function () {
		assert.deepStrictEqual(alasql('show tables'), []);
		assert.deepStrictEqual(Object.keys(alasql.databases['test' + testId].triggers), []);
		assert.deepStrictEqual(Object.keys(alasql.databases['test' + testId].indices), []);
	});

	it('G) SEARCH reads the table of the named database', function () {
		alasql(`create table ${other}.s (a int); insert into ${other}.s values (7), (8)`);
		alasql('create table s (a int); insert into s values (1)');
		assert.deepStrictEqual(alasql(`search / a from ${other}.s`), [7, 8]);
		assert.deepStrictEqual(alasql('search / a from s'), [1]);
		alasql(`drop table s; drop table ${other}.s`);
		assert.throws(() => alasql('search / a from nodb2705.s'), TypeError);
	});

	it('F) A table that does not exist, and a database that does not exist', function () {
		assert.throws(
			() => alasql(`drop table ${other}.nothere`),
			/Can not drop table "nothere" because it does not exist in the database\./
		);
		assert.throws(
			() => alasql(`select * from ${other}.t join nodb2705.u on 1=1`),
			/Database does not exist: nodb2705/
		);
		// The other statements throw the TypeError of the JavaScript engine, as in 4.x
		[
			'select * from nodb2705.t',
			'insert into nodb2705.t values (1)',
			'update nodb2705.t set a = 1',
			'delete from nodb2705.t',
			'create table nodb2705.t (a int)',
			'drop table nodb2705.t',
			'truncate table nodb2705.t',
			'alter table nodb2705.t add column c int',
			'create index ix2705b on nodb2705.t (a)',
			'show columns from nodb2705.t',
			'select 1 into nodb2705.t',
		].forEach(sql => assert.throws(() => alasql(sql), TypeError, sql));
	});
});
