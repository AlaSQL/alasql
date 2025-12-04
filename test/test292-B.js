if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 292-B - MySQL-like WITH ROLLUP/CUBE syntax', function () {
	var testData = [
		{Phase: 'Phase 1', Step: 'Step 1', Task: 'Task 1', Val: 5},
		{Phase: 'Phase 1', Step: 'Step 2', Task: 'Task 2', Val: 20},
		{Phase: 'Phase 2', Step: 'Step 1', Task: 'Task 1', Val: 25},
		{Phase: 'Phase 2', Step: 'Step 2', Task: 'Task 2', Val: 40},
	];

	it('1. GROUP BY columns WITH ROLLUP', function (done) {
		var res = alasql(
			'SELECT Phase, Step, SUM(Val) AS Val FROM ? \
			GROUP BY Phase, Step WITH ROLLUP',
			[testData]
		);
		assert.deepEqual(res, [
			{Phase: null, Step: null, Val: 90},
			{Phase: 'Phase 1', Step: null, Val: 25},
			{Phase: 'Phase 1', Step: 'Step 1', Val: 5},
			{Phase: 'Phase 1', Step: 'Step 2', Val: 20},
			{Phase: 'Phase 2', Step: null, Val: 65},
			{Phase: 'Phase 2', Step: 'Step 1', Val: 25},
			{Phase: 'Phase 2', Step: 'Step 2', Val: 40},
		]);
		done();
	});

	it('2. GROUP BY columns WITH CUBE', function (done) {
		var res = alasql(
			'SELECT Phase, Step, SUM(Val) AS Val FROM ? \
			GROUP BY Phase, Step WITH CUBE',
			[testData]
		);

		assert.deepEqual(res, [
			{Phase: null, Step: null, Val: 90},
			{Phase: 'Phase 1', Step: null, Val: 25},
			{Phase: null, Step: 'Step 1', Val: 30},
			{Phase: 'Phase 1', Step: 'Step 1', Val: 5},
			{Phase: null, Step: 'Step 2', Val: 60},
			{Phase: 'Phase 1', Step: 'Step 2', Val: 20},
			{Phase: 'Phase 2', Step: null, Val: 65},
			{Phase: 'Phase 2', Step: 'Step 1', Val: 25},
			{Phase: 'Phase 2', Step: 'Step 2', Val: 40},
		]);
		done();
	});

	it('3. WITH ROLLUP with HAVING clause', function (done) {
		var res = alasql(
			'SELECT Phase, Step, SUM(Val) AS Val FROM ? \
			GROUP BY Phase, Step WITH ROLLUP \
			HAVING SUM(Val) > 20',
			[testData]
		);
		assert.deepEqual(res, [
			{Phase: null, Step: null, Val: 90},
			{Phase: 'Phase 1', Step: null, Val: 25},
			{Phase: 'Phase 2', Step: null, Val: 65},
			{Phase: 'Phase 2', Step: 'Step 1', Val: 25},
			{Phase: 'Phase 2', Step: 'Step 2', Val: 40},
		]);
		done();
	});

	it('4. Backward compatibility - ROLLUP() function still works', function (done) {
		var res = alasql(
			'SELECT Phase, Step, SUM(Val) AS Val FROM ? \
			GROUP BY ROLLUP(Phase,Step)',
			[testData]
		);
		assert.deepEqual(res, [
			{Phase: null, Step: null, Val: 90},
			{Phase: 'Phase 1', Step: null, Val: 25},
			{Phase: 'Phase 1', Step: 'Step 1', Val: 5},
			{Phase: 'Phase 1', Step: 'Step 2', Val: 20},
			{Phase: 'Phase 2', Step: null, Val: 65},
			{Phase: 'Phase 2', Step: 'Step 1', Val: 25},
			{Phase: 'Phase 2', Step: 'Step 2', Val: 40},
		]);
		done();
	});

	it('5. Backward compatibility - CUBE() function still works', function (done) {
		var res = alasql(
			'SELECT Phase, Step, SUM(Val) AS Val FROM ? \
			GROUP BY CUBE(Phase,Step)',
			[testData]
		);

		assert.deepEqual(res, [
			{Phase: null, Step: null, Val: 90},
			{Phase: 'Phase 1', Step: null, Val: 25},
			{Phase: null, Step: 'Step 1', Val: 30},
			{Phase: 'Phase 1', Step: 'Step 1', Val: 5},
			{Phase: null, Step: 'Step 2', Val: 60},
			{Phase: 'Phase 1', Step: 'Step 2', Val: 20},
			{Phase: 'Phase 2', Step: null, Val: 65},
			{Phase: 'Phase 2', Step: 'Step 1', Val: 25},
			{Phase: 'Phase 2', Step: 'Step 2', Val: 40},
		]);
		done();
	});

	// Edge cases and additional combinations
	it('6. WITH ROLLUP with single column', function (done) {
		var res = alasql(
			'SELECT Phase, SUM(Val) AS Val FROM ? \
			GROUP BY Phase WITH ROLLUP',
			[testData]
		);
		assert.deepEqual(res, [
			{Phase: null, Val: 90},
			{Phase: 'Phase 1', Val: 25},
			{Phase: 'Phase 2', Val: 65},
		]);
		done();
	});

	it('7. WITH CUBE with single column', function (done) {
		var res = alasql(
			'SELECT Phase, SUM(Val) AS Val FROM ? \
			GROUP BY Phase WITH CUBE',
			[testData]
		);
		assert.deepEqual(res, [
			{Phase: null, Val: 90},
			{Phase: 'Phase 1', Val: 25},
			{Phase: 'Phase 2', Val: 65},
		]);
		done();
	});

	it('8. WITH ROLLUP with three columns', function (done) {
		var res = alasql(
			'SELECT Phase, Step, Task, SUM(Val) AS Val FROM ? \
			GROUP BY Phase, Step, Task WITH ROLLUP',
			[testData]
		);
		// Verify the grand total exists
		assert(res[0].Phase === null && res[0].Step === null && res[0].Task === null);
		assert.equal(res[0].Val, 90);
		done();
	});

	it('9. WITH CUBE with three columns', function (done) {
		var res = alasql(
			'SELECT Phase, Step, Task, SUM(Val) AS Val FROM ? \
			GROUP BY Phase, Step, Task WITH CUBE',
			[testData]
		);
		// Verify the grand total exists
		assert(res[0].Phase === null && res[0].Step === null && res[0].Task === null);
		assert.equal(res[0].Val, 90);
		done();
	});

	it('10. WITH ROLLUP with ORDER BY', function (done) {
		var res = alasql(
			'SELECT Phase, SUM(Val) AS Val FROM ? \
			GROUP BY Phase WITH ROLLUP \
			ORDER BY Val DESC',
			[testData]
		);
		assert.equal(res[0].Val, 90);
		assert.equal(res[1].Val, 65);
		assert.equal(res[2].Val, 25);
		done();
	});

	it('11. WITH CUBE with ORDER BY', function (done) {
		var res = alasql(
			'SELECT Phase, SUM(Val) AS Val FROM ? \
			GROUP BY Phase WITH CUBE \
			ORDER BY Val ASC',
			[testData]
		);
		assert.equal(res[0].Val, 25);
		assert.equal(res[1].Val, 65);
		assert.equal(res[2].Val, 90);
		done();
	});

	it('12. WITH ROLLUP with COUNT aggregation', function (done) {
		var res = alasql(
			'SELECT Phase, COUNT(*) AS Cnt FROM ? \
			GROUP BY Phase WITH ROLLUP',
			[testData]
		);
		assert.deepEqual(res, [
			{Phase: null, Cnt: 4},
			{Phase: 'Phase 1', Cnt: 2},
			{Phase: 'Phase 2', Cnt: 2},
		]);
		done();
	});

	it('13. WITH CUBE with multiple aggregations', function (done) {
		var res = alasql(
			'SELECT Phase, SUM(Val) AS TotalVal, COUNT(*) AS Cnt, AVG(Val) AS AvgVal FROM ? \
			GROUP BY Phase WITH CUBE',
			[testData]
		);
		var grandTotal = res.find(r => r.Phase === null);
		assert.equal(grandTotal.TotalVal, 90);
		assert.equal(grandTotal.Cnt, 4);
		assert.equal(grandTotal.AvgVal, 22.5);
		done();
	});

	it('14. WITH ROLLUP with WHERE clause', function (done) {
		var res = alasql(
			'SELECT Phase, Step, SUM(Val) AS Val FROM ? \
			WHERE Phase = "Phase 1" \
			GROUP BY Phase, Step WITH ROLLUP',
			[testData]
		);
		assert.deepEqual(res, [
			{Phase: null, Step: null, Val: 25},
			{Phase: 'Phase 1', Step: null, Val: 25},
			{Phase: 'Phase 1', Step: 'Step 1', Val: 5},
			{Phase: 'Phase 1', Step: 'Step 2', Val: 20},
		]);
		done();
	});

	it('15. WITH CUBE with WHERE clause', function (done) {
		var res = alasql(
			'SELECT Phase, Step, SUM(Val) AS Val FROM ? \
			WHERE Val > 10 \
			GROUP BY Phase, Step WITH CUBE',
			[testData]
		);
		var grandTotal = res.find(r => r.Phase === null && r.Step === null);
		assert.equal(grandTotal.Val, 85); // 20 + 25 + 40
		done();
	});

	it('16. WITH ROLLUP on expressions', function (done) {
		var res = alasql(
			'SELECT Phase, Step, Val % 2 AS IsOdd, COUNT(*) AS Cnt FROM ? \
			GROUP BY Phase, Step, Val % 2 WITH ROLLUP',
			[testData]
		);
		// Verify grand total
		var grandTotal = res.find(r => r.Phase === null && r.Step === null && r.IsOdd === null);
		assert.equal(grandTotal.Cnt, 4);
		done();
	});

	it('17. WITH CUBE with LIMIT', function (done) {
		var res = alasql(
			'SELECT Phase, SUM(Val) AS Val FROM ? \
			GROUP BY Phase WITH CUBE \
			LIMIT 2',
			[testData]
		);
		assert.equal(res.length, 2);
		done();
	});

	it('18. WITH ROLLUP with MIN/MAX aggregations', function (done) {
		var res = alasql(
			'SELECT Phase, MIN(Val) AS MinVal, MAX(Val) AS MaxVal FROM ? \
			GROUP BY Phase WITH ROLLUP',
			[testData]
		);
		var grandTotal = res.find(r => r.Phase === null);
		assert.equal(grandTotal.MinVal, 5);
		assert.equal(grandTotal.MaxVal, 40);
		done();
	});
});
