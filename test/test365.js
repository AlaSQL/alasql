if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

var name = '';
describe('Test 365 Default database function', function() {
	it('1. CREATE DATABASE', function(done) {
		var db = new alasql.Database();
		name = db.databaseid;
		//    console.log(db);
		var res = db.exec('VALUE OF SELECT 2+3');
		assert.deepEqual(res, 5);
		done();
	});

	it('99. DROP DATABASE', function(done) {
		alasql('DROP DATABASE ' + name);
		done();
	});
});
