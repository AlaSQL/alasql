if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 223 ROLLUP() in GROUP BY', function () {
	var testData = [
		{Phase: 'Phase 1', Step: 'Step 1', Task: 'Task 1', Val: 5},
		{Phase: 'Phase 1', Step: 'Step 2', Task: 'Task 2', Val: 20},
		{Phase: 'Phase 2', Step: 'Step 1', Task: 'Task 1', Val: 25},
		{Phase: 'Phase 2', Step: 'Step 2', Task: 'Task 2', Val: 40},
	];

	it('1. ROLLUP', function (done) {
		var res = alasql('SELECT Phase, Step, SUM(Val) AS Val FROM ? \
			GROUP BY ROLLUP(Phase,Step)', [
			testData,
		]);
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

	it('2. CUBE', function (done) {
		var res = alasql('SELECT Phase, Step, SUM(Val) AS Val FROM ? \
			GROUP BY CUBE(Phase,Step)', [
			testData,
		]);
		//		console.log(res);

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

	it('3. GROUPING SETS', function (done) {
		var res = alasql(
			'SELECT Phase, Step, SUM(Val) AS Val FROM ? \
			GROUP BY GROUPING SETS(Phase,Step)',
			[testData]
		);
		//		console.log(res);

		assert.deepEqual(res, [
			{Phase: 'Phase 1', Step: null, Val: 25},
			{Phase: null, Step: 'Step 1', Val: 30},
			{Phase: null, Step: 'Step 2', Val: 60},
			{Phase: 'Phase 2', Step: null, Val: 65},
		]);
		done();
	});
});
