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
		const parsed = {
			paramWhere: alasql.parse('SELECT 1 FROM ? WHERE x < $y').statements[0].where.expression,
			numWhere: alasql.parse('SELECT 1 FROM ? WHERE x < 10').statements[0].where.expression,
			strWhere: alasql.parse("SELECT 1 FROM ? WHERE x = 'abc'").statements[0].where.expression,
			boolWhere: alasql.parse('SELECT 1 FROM ? WHERE x = TRUE').statements[0].where.expression,
			uniWhere: alasql.parse('SELECT 1 FROM ? WHERE -x < 0').statements[0].where.expression,
		};

		assert.strictEqual(parsed.paramWhere.left.tableid, undefined);
		assert.strictEqual(parsed.numWhere.left.tableid, undefined);
		assert.strictEqual(parsed.strWhere.left.tableid, undefined);
		assert.strictEqual(parsed.boolWhere.left.tableid, undefined);
		assert.strictEqual(parsed.uniWhere.left.right.tableid, undefined);

		const actual = JSON.parse(JSON.stringify(parsed));
		const expected = {
			paramWhere: {left: {columnid: 'x'}, op: '<', right: {param: 'y'}},
			numWhere: {left: {columnid: 'x'}, op: '<', right: {value: 10}},
			strWhere: {left: {columnid: 'x'}, op: '=', right: {value: 'abc'}},
			boolWhere: {left: {columnid: 'x'}, op: '=', right: {value: true}},
			uniWhere: {
				left: {op: '-', right: {columnid: 'x'}},
				op: '<',
				right: {value: 0},
			},
		};

		assert.deepStrictEqual(actual, expected);
	});
});
