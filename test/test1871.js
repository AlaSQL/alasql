if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 1871 - n.Term is not a constructor', function () {
	it('Sending xxx random data should give valid error', function () {
		assert.throws(() => alasql('xxx'), {
			message: "Parse error on line 1:\nxxx\n---^\nExpecting 'COLONDASH', got 'EOF'",
		});
	});
});
