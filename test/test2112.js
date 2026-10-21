if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2112 - load binary file', function () {
	const test = '2112'; // insert test file number

	it('A) Loads binary file (sync)', function () {
		alasql.utils.loadBinaryFile('./test/test' + test + '.dat', false, function (data) {
			assert.equal(data, 'ï¿½');
		});
	});

	it('B) Loads binary file (async)', function (done) {
		alasql.utils.loadBinaryFile('./test/test' + test + '.dat', true, function (data) {
			assert.equal(data, 'ï¿½');
			done();
		});
	});

	it('C) Loads HTTPS binary file (async)', function (done) {
		alasql.utils.loadBinaryFile(
			'https://github.com/AlaSQL/alasql/raw/refs/heads/develop/test/test2112.dat',
			true,
			function (data) {
				assert.equal(data, 'ï¿½');
				done();
			}
		);
	});
});
