if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 219 CREATE VIEW', function () {
	it('1. CREATE VIEW SYNTAX', function (done) {
		alasql(
			'CREATE DATABASE test219;USE test219;\
        	CREATE TABLE one (a INT, b STRING); \
        	INSERT INTO one VALUES (1,"one"),(2,"two"),(3,"three")'
		);
		alasql('CREATE VIEW myview (a) AS SELECT a FROM one');
		done();
	});
	it('2. RUN FROM VIEW', function (done) {
		var res = alasql('SELECT * FROM myview');
		//    	console.log(res);
		assert.deepEqual(res, [{a: 1}, {a: 2}, {a: 3}]);
		done();
	});
	it('3. RUN FROM JOIN VIEW', function (done) {
		var res = alasql('SELECT one.a as a1, myview.a as a2 FROM one JOIN myview ON one.a = myview.a');
		//    	console.log(res);
		assert.deepEqual(res, [
			{a1: 1, a2: 1},
			{a1: 2, a2: 2},
			{a1: 3, a2: 3},
		]);
		done();
	});

	it('4. CHANGE DATA IN VIEW', function (done) {
		alasql('INSERT INTO one VALUES (4,"four")');
		var res = alasql('SELECT * FROM myview');
		//    	console.log(res);
		assert.deepEqual(res, [{a: 1}, {a: 2}, {a: 3}, {a: 4}]);
		done();
	});

	it('5. DROP VIEW', function (done) {
		alasql('DROP VIEW myview');
		done();
	});
	it('99. Drop database', function (done) {
		alasql('DROP DATABASE test219');
		done();
	});
});
