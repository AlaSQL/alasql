if (typeof exports === 'object') {
	const assert = require('assert');
	const alasql = require('..');
}

describe.skip('Test 1889 - Ensure utils.isNode handles node and non-Node environments', function () {
	let originalProcess;

	before(function () {
		// Store the original process object
		originalProcess = global.process;
	});

	after(function () {
		// Restore the original process object after all tests
		global.process = originalProcess;
	});

	it('Positive: Detect Node environment', function () {
		// No modification needed here, running in actual Node.js environment
		const isNode = alasql.utils.isNode;
		assert.strictEqual(isNode, true, 'utils.isNode should return true in a Node.js environment');
	});

	it('Negative: Should not detect as Node environment', function () {
		// Temporarily override the global process object
		global.process = null;

		delete require.cache[require.resolve('..')];
		const reloadedAlasql = require('..');

		const isNodeAfterModification = reloadedAlasql.utils.isNode;
		assert.strictEqual(
			isNodeAfterModification,
			false,
			'utils.isNode should return false when not in nodejs environment'
		);
	});
});
