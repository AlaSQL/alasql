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
		const paramWhere = alasql.parse('SELECT 1 FROM ? WHERE x < $y').statements[0].where.expression;
		assert.strictEqual(paramWhere.left.columnid, 'x');
		assert.strictEqual(paramWhere.left.tableid, undefined);
		assert.strictEqual(paramWhere.op, '<');
		assert.strictEqual(paramWhere.right.param, 'y');

		const numWhere = alasql.parse('SELECT 1 FROM ? WHERE x < 10').statements[0].where.expression;
		assert.strictEqual(numWhere.right.value, 10);

		const strWhere = alasql.parse("SELECT 1 FROM ? WHERE x = 'abc'").statements[0].where.expression;
		assert.strictEqual(strWhere.right.value, 'abc');

		const boolWhere = alasql.parse('SELECT 1 FROM ? WHERE x = TRUE').statements[0].where.expression;
		assert.strictEqual(boolWhere.right.value, true);

		const uniWhere = alasql.parse('SELECT 1 FROM ? WHERE -x < 0').statements[0].where.expression;
		assert.strictEqual(uniWhere.left.op, '-');
		assert.strictEqual(uniWhere.left.right.columnid, 'x');
	});
});
