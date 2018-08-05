if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 309 # operator and graphs', function() {
	it('0. Create database ', function(done) {
		alasql('CREATE DATABASE test309;USE test309');
		done();
	});

	it('1. SET selector', function(done) {
		alasql('CREATE VERTEX #Andrey SET age = 44');
		alasql('CREATE VERTEX #Olga SET age = 35');
		alasql('CREATE VERTEX #Maria SET age = 28');
		var res = alasql('SELECT VALUE #Andrey->age');
		assert(res == 44);
		var res = alasql('SEARCH age FROM #Olga');
		assert.deepEqual(res, [35]);
		var res = alasql('SEARCH / AS @p #Olga age');
		assert.deepEqual(res, [35]);
		var res = alasql('SEARCH VALUE / #Olga age');
		//    console.log(res);
		assert(res == 35);

		done();
	});

	it('99. Drop database ', function(done) {
		alasql('DROP DATABASE test309');
		done();
	});
});
