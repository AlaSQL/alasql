if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 340 SET PARAMS', function() {
	it.skip('1. CREATE DATABASE', function(done) {
		alasql('CREATE DATABASE test340;USE test340');
		done();
	});

	it.skip('2. SET PARAMS', function(done) {
		var res = alasql(function() {
			/*

    SET PARAMS = {
        foo:'bar',
        fromId:1,
        toId:2
    };

    SELECT VALUE $foo;

*/
		});

		console.log(res);
		assert.deepEqual(res, [1, 'bar']);

		done();
	});

	it.skip('3. Change params property', function(done) {
		var res = alasql('SELECT VALUE $0;  SET $0 = 200; SELECT VALUE $0', [100]);
		assert.deepEqual(res.sort(), [100, 1, 200]);
		done();
	});

	it.skip('99. DROP DATABASE', function(done) {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test340');
		done();
	});
});
