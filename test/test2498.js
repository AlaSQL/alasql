if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2498';

describe(`Test ${testId} - parser AST surface`, function () {
	it('A) exposes statements[] and where.toJS() for parsed statements', function () {
		const ast = alasql.parse('SELECT 1 FROM ? WHERE x < $y');
		assert.ok(Array.isArray(ast.statements));
		assert.strictEqual(ast.statements.length, 1);

		const where = ast.statements[0].where;
		assert.strictEqual(typeof where.toJS, 'function');

		const js = where.toJS('p', '', null);
		assert.strictEqual(typeof js, 'string');

		const fn = new Function('alasql', 'p', 'params', `return Boolean(${js});`);
		assert.strictEqual(fn(alasql, {x: 1}, {y: 2}), true);
		assert.strictEqual(fn(alasql, {x: 3}, {y: 2}), false);
	});

	it('B) preserves stable expression node shapes used by parser consumers', function () {
		const actual = {
			paramWhere: alasql.parse('SELECT 1 FROM ? WHERE x < $y').statements[0].where.expression,
			numWhere: alasql.parse('SELECT 1 FROM ? WHERE x < 10').statements[0].where.expression,
			strWhere: alasql.parse("SELECT 1 FROM ? WHERE x = 'abc'").statements[0].where.expression,
			boolWhere: alasql.parse('SELECT 1 FROM ? WHERE x = TRUE').statements[0].where.expression,
			uniWhere: alasql.parse('SELECT 1 FROM ? WHERE -x < 0').statements[0].where.expression,
		};

		assert.deepStrictEqual(
			{
				paramWhere: {
					left: {
						columnid: actual.paramWhere.left.columnid,
						tableid: actual.paramWhere.left.tableid,
					},
					op: actual.paramWhere.op,
					right: {param: actual.paramWhere.right.param},
				},
				numWhere: {
					left: {columnid: actual.numWhere.left.columnid, tableid: actual.numWhere.left.tableid},
					op: actual.numWhere.op,
					right: {value: actual.numWhere.right.value},
				},
				strWhere: {
					left: {columnid: actual.strWhere.left.columnid, tableid: actual.strWhere.left.tableid},
					op: actual.strWhere.op,
					right: {value: actual.strWhere.right.value},
				},
				boolWhere: {
					left: {columnid: actual.boolWhere.left.columnid, tableid: actual.boolWhere.left.tableid},
					op: actual.boolWhere.op,
					right: {value: actual.boolWhere.right.value},
				},
				uniWhere: {
					left: {
						op: actual.uniWhere.left.op,
						right: {
							columnid: actual.uniWhere.left.right.columnid,
							tableid: actual.uniWhere.left.right.tableid,
						},
					},
					op: actual.uniWhere.op,
					right: {value: actual.uniWhere.right.value},
				},
			},
			{
				paramWhere: {left: {columnid: 'x', tableid: undefined}, op: '<', right: {param: 'y'}},
				numWhere: {left: {columnid: 'x', tableid: undefined}, op: '<', right: {value: 10}},
				strWhere: {left: {columnid: 'x', tableid: undefined}, op: '=', right: {value: 'abc'}},
				boolWhere: {left: {columnid: 'x', tableid: undefined}, op: '=', right: {value: true}},
				uniWhere: {
					left: {op: '-', right: {columnid: 'x', tableid: undefined}},
					op: '<',
					right: {value: 0},
				},
			}
		);
	});
});
