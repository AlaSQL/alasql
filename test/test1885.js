if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 1885 - consistent error messages for missing tables', function () {
	const test = '1885'; // insert test file number

	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
		alasql('CREATE TABLE validTable (a INT, b INT, PRIMARY KEY (a,b))');
	});

	after(function () {
		alasql('drop database test' + test);
	});

	it('SELECT returns standard error message', function () {
		assert.throws(() => alasql('select * from invalidTable'), {
			message: 'Table does not exist: invalidTable',
		});
	});

	it('JOIN ON returns standard error message', function () {
		assert.throws(
			() => alasql('select * from validTable JOIN invalidTable ON validTable.a = invalidTable.b'),
			{
				message: 'Table does not exist: invalidTable',
			}
		);
	});

	it('JOIN USING returns standard error message', function () {
		assert.throws(() => alasql('select * from validTable JOIN invalidTable USING a'), {
			message: 'Table does not exist: invalidTable',
		});
	});
});
