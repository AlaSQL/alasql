if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2723B'; // The binding of a column reference, worked out beside today's lookup

describe(`Test ${testId} - bind.column beside the lookup of Column.toJS`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
		alasql('create table one (a int, b int); create table two (a int, c int); create table bare');
		alasql('insert into one values (1, 10), (2, 20); insert into two values (1, 100), (3, 300)');
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	// The binding check (test/bind/) sets Column.onBind for the whole suite: put it back
	var onBindBefore;
	function restore() {
		if (onBindBefore) alasql.yy.Column.onBind = onBindBefore;
		else delete alasql.yy.Column.onBind;
	}

	// The bindings of the column references of one statement, by the text of the reference
	function bindings(sql, params, compileOnly) {
		var refs = {};
		onBindBefore = alasql.yy.Column.onBind;
		alasql.yy.Column.onBind = function (col, ref) {
			refs[col.toString()] = ref;
		};
		try {
			var statement = alasql.compile(sql);
			if (!compileOnly) statement(params);
		} finally {
			restore();
		}
		return refs;
	}

	it('A) A column that one source defines', function () {
		var refs = bindings('select b, c, one.a from one join two on one.a = two.a');
		assert.deepStrictEqual(refs.b, {scope: 0, source: 'one', column: 'b'});
		assert.deepStrictEqual(refs.c, {scope: 0, source: 'two', column: 'c'});
		assert.deepStrictEqual(refs['one.a'], {scope: 0, source: 'one', column: 'a'});
		assert.deepStrictEqual(refs['two.a'], {scope: 0, source: 'two', column: 'a'});
	});

	it('B) An alias is the name of the source', function () {
		var refs = bindings('select x.b, c from one x join two y on x.a = y.a');
		assert.deepStrictEqual(refs['x.b'], {scope: 0, source: 'x', column: 'b'});
		assert.deepStrictEqual(refs.c, {scope: 0, source: 'y', column: 'c'});
	});

	it('C) A column that two sources define is ambiguous', function () {
		var refs = bindings('select upper(a) as u from one join two on one.b = two.c');
		assert.deepStrictEqual(refs.a, {scope: 0, ambiguous: ['one', 'two'], column: 'a'});
	});

	it('D) Sources without column definitions: one is the source, several are decided per row', function () {
		var data = [{k: 1}];
		assert.deepStrictEqual(bindings('select k from ?', [data]).k, {
			scope: 0,
			source: 'default',
			column: 'k',
		});
		assert.deepStrictEqual(
			bindings('select k from ? p join ? q on p.k = q.k where k > 0', [data, data]).k,
			{scope: 0, any: ['p', 'q'], column: 'k'}
		);
		// a table with definitions that does not have the column is not asked
		assert.deepStrictEqual(bindings('select k from one join ? q on one.a = q.k', [data]).k, {
			scope: 0,
			source: 'q',
			column: 'k',
		});
		assert.deepStrictEqual(bindings('select k from bare').k, {
			scope: 0,
			source: 'bare',
			column: 'k',
		});
	});

	it('E) A column of the SELECT around a subquery', function () {
		var refs = bindings('select a from one where exists (select 1 from two where two.c > one.b)');
		assert.deepStrictEqual(refs['one.b'], {scope: 1, source: 'one', column: 'b'});
		assert.deepStrictEqual(refs['two.c'], {scope: 0, source: 'two', column: 'c'});
		// without the source name: not a column of two, so it is looked up outside
		refs = bindings('select a from one where exists (select 1 from two where c > b)');
		assert.deepStrictEqual(refs.b, {scope: 1, source: 'one', column: 'b'});
		assert.deepStrictEqual(refs.c, {scope: 0, source: 'two', column: 'c'});
	});

	it('F) A name that no source has is unresolved', function () {
		assert.deepStrictEqual(bindings('select a from one where nocolumn = 1').nocolumn, {
			unresolved: true,
			column: 'nocolumn',
		});
		assert.deepStrictEqual(
			bindings('select a from one where nosource.a = 1', [], true)['nosource.a'],
			{
				unresolved: true,
				column: 'a',
			}
		);
	});

	it('G) The binding is not used: results are as before, and a statement outside a SELECT has no scope', function () {
		var seen = 0;
		onBindBefore = alasql.yy.Column.onBind;
		alasql.yy.Column.onBind = function () {
			seen++;
		};
		try {
			alasql('update one set b = b + 1 where a = 1');
			assert.strictEqual(seen, 0);
			assert.deepStrictEqual(alasql('select a, b from one order by a'), [
				{a: 1, b: 11},
				{a: 2, b: 20},
			]);
			assert.ok(seen > 0);
		} finally {
			restore();
			alasql('update one set b = 10 where a = 1');
		}
	});
});
