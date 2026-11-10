if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 1314 - JSON file errors', function () {
	it('1. Rejects when the JSON file does not exist', async function () {
		await assert.rejects(
			alasql(['SELECT * FROM JSON("' + __dirname + '/test1314-missing.json")']),
			function (error) {
				return error instanceof Error && error.code === 'ENOENT';
			}
		);
	});

	it('2. Passes missing file errors to the query callback', function (done) {
		alasql(
			'SELECT * FROM JSON("' + __dirname + '/test1314-missing.json")',
			[],
			function (result, error) {
				assert.strictEqual(result, null);
				assert(error instanceof Error);
				assert.strictEqual(error.code, 'ENOENT');
				done();
			}
		);
	});

	it('3. Rejects when the JSON file is invalid', async function () {
		await assert.rejects(
			alasql(['SELECT * FROM JSON("' + __dirname + '/test1314-invalid.txt")']),
			SyntaxError
		);
	});
});
