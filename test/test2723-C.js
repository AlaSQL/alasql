if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2723C'; // What 4.x reads where it does not read the binding: the 4.x rules of bind.js

// These tests pin today's results. They are not what the results should be: #2928 and #3109
// change them in 5.0. Until then a step of #2723 must not change them unnoticed.
describe(`Test ${testId} - the 4.x rules for an ambiguous and an unknown column`, function () {
	// v is defined by t1 and t2, and not by t0, the first table of FROM
	const three = ' FROM t0 JOIN t1 ON t0.k = t1.k JOIN t2 ON t0.k = t2.k';
	// here the first table of FROM defines it too
	const two = ' FROM t1 JOIN t2 ON t1.k = t2.k';

	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
		alasql('create table t0 (k int, x int); create table t1 (k int, v int)');
		alasql('create table t2 (k int, v int)');
		alasql('insert into t0 values (1, 5), (2, 6); insert into t1 values (1, 10), (2, 11)');
		alasql('insert into t2 values (1, 20), (2, 21)');
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	// What 4.x reads for the column references of one statement, by the text of the reference.
	// The binding check (test/bind/) sets Column.onBind for the whole suite, so it is put back.
	function readings(sql) {
		var reads = {};
		var before = alasql.yy.Column.onBind;
		alasql.yy.Column.onBind = function (col, ref, js, err, context, tableid, defcols, scope, read) {
			reads[col.toString()] = {binding: ref, read: read};
		};
		try {
			alasql.compile(sql);
		} catch (err) {
			reads.error = err.message;
		} finally {
			if (before) alasql.yy.Column.onBind = before;
			else delete alasql.yy.Column.onBind;
		}
		return reads;
	}

	it('A) Alone in the select list, an ambiguous name is the first source that has it', function () {
		assert.deepStrictEqual(alasql('select v' + three), [{v: 10}, {v: 11}]);
		assert.deepStrictEqual(alasql('select v' + two), [{v: 10}, {v: 11}]);
		var r = readings('select v' + three).v;
		assert.deepStrictEqual(r.binding, {scope: 0, ambiguous: ['t1', 't2'], column: 'v'});
		assert.deepStrictEqual(r.read, {
			scope: 0,
			source: 't1',
			column: 'v',
			rule: 'firstWithColumn',
			place: 'select',
		});
	});

	it('B) As a function argument, an ambiguous name is read from the first table of FROM', function () {
		// t0 does not have v, so there is nothing to read
		assert.deepStrictEqual(alasql('select abs(v) as r' + three), [{r: undefined}, {r: undefined}]);
		assert.deepStrictEqual(alasql('select t0.k' + three + ' where abs(v) > 0'), []);
		assert.deepStrictEqual(alasql('select abs(v) as r' + two), [{r: 10}, {r: 11}]);
		var r = readings('select abs(v) as r' + three).v;
		assert.deepStrictEqual(r.binding, {scope: 0, ambiguous: ['t1', 't2'], column: 'v'});
		assert.deepStrictEqual(r.read, {
			scope: 0,
			source: 't0',
			column: 'v',
			rule: 'firstTable',
			place: 'function',
		});
	});

	it('C) In a grouped select list, an ambiguous name is read from the first table of FROM', function () {
		assert.deepStrictEqual(alasql('select v, count(*) as n' + three + ' group by t0.k'), [
			{v: undefined, n: 1},
			{v: undefined, n: 1},
		]);
		assert.deepStrictEqual(alasql('select v, count(*) as n' + two + ' group by t1.k'), [
			{v: 10, n: 1},
			{v: 11, n: 1},
		]);
		var r = readings('select v, count(*) as n' + three + ' group by t0.k').v;
		assert.deepStrictEqual(r.binding, {scope: 0, ambiguous: ['t1', 't2'], column: 'v'});
		assert.deepStrictEqual(r.read, {
			scope: 0,
			source: 't0',
			column: 'v',
			rule: 'firstTable',
			place: 'group',
		});
	});

	it('D) In a plain expression, an ambiguous name is an error', function () {
		const text = /Cannot resolve column "v" because it exists in two source tables/;
		assert.throws(() => alasql('select t0.k' + three + ' where v > 0'), text);
		assert.throws(() => alasql('select v + 0 as r' + three), text);
		assert.throws(() => alasql('select t0.k' + three + ' order by v'), text);
		assert.throws(() => alasql('select t1.k' + two + ' where v > 0'), text);
		var reads = readings('select t0.k' + three + ' where v > 0');
		assert.ok(text.test(reads.error));
		// no rule: what 4.x reads is the binding
		assert.deepStrictEqual(reads.v.read, {scope: 0, ambiguous: ['t1', 't2'], column: 'v'});
	});

	it('E) A name the only table does not define is read from that table', function () {
		assert.deepStrictEqual(alasql('select k from t0 where nosuch is null'), [{k: 1}, {k: 2}]);
		assert.deepStrictEqual(alasql('select abs(nosuch) as r from t0'), [
			{r: undefined},
			{r: undefined},
		]);
		// alone in the select list it is an error already
		assert.throws(() => alasql('select nosuch from t0'), /Column does not exist: nosuch/);
		var r = readings('select k from t0 where nosuch is null').nosuch;
		assert.deepStrictEqual(r.binding, {unresolved: true, column: 'nosuch'});
		assert.deepStrictEqual(r.read, {
			scope: 0,
			source: 't0',
			column: 'nosuch',
			rule: 'onlyTable',
			place: 'row',
		});
	});

	it('F) An alias of the select list inside an aggregate in HAVING is read from the table', function () {
		const sql = 'select k, count(*) as n from t0 group by k having sum(n) > 0';
		assert.deepStrictEqual(alasql(sql), []);
		var r = readings(sql).n;
		assert.deepStrictEqual(r.binding, {unresolved: true, column: 'n'});
		assert.strictEqual(r.read.rule, 'onlyTable');
		assert.strictEqual(r.read.source, 't0');
	});
});
