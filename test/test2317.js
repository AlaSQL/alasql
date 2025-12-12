if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var fs = require('fs');
	var path = require('path');
}

describe('Test 2317 - TypeScript type resolution via exports map', function () {
	const test = '2317'; // insert test file number

	it('A) package.json should have types in exports map', function () {
		// Read package.json
		const packageJsonPath = path.join(__dirname, '..', 'package.json');
		const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

		// Verify exports field exists
		assert.ok(packageJson.exports, 'package.json should have exports field');

		// Verify main export has types field
		assert.ok(packageJson.exports['.'], 'package.json exports should have "." entry');
		assert.ok(packageJson.exports['.'].types, 'package.json exports["."] should have types field');

		// Verify types field points to correct file
		assert.strictEqual(
			packageJson.exports['.'].types,
			'./types/alasql.d.ts',
			'types field should point to ./types/alasql.d.ts'
		);
	});

	it('B) types file should exist', function () {
		// Verify the types file actually exists
		const typesFilePath = path.join(__dirname, '..', 'types', 'alasql.d.ts');
		assert.ok(fs.existsSync(typesFilePath), 'types/alasql.d.ts should exist');
	});

	it('C) alasql import should work (runtime verification)', function () {
		// Basic runtime check that alasql still works
		var res = alasql('SELECT 1 as one');
		assert.deepEqual(res, [{one: 1}]);
	});
});
