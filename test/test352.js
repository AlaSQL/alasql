if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 352 TEST EQUALITY', function() {
	it('1. CREATE DATABASE', function(done) {
		alasql('CREATE DATABASE test352;USE test352');
		done();
	});

	it('2. TEST =', function(done) {
		var res = alasql('= 1=1');
		assert.deepEqual(res, true);
		var res = alasql('= 1=NULL');
		assert.deepEqual(res, undefined);
		var res = alasql('= NULL=NULL');
		assert.deepEqual(res, undefined);
		var res = alasql('= 0=NULL');
		assert.deepEqual(res, undefined);
		done();
	});

	it('3. TEST ==', function(done) {
		var res = alasql('= 1==1');
		assert.deepEqual(res, true);
		var res = alasql('= 1==NULL');
		assert.deepEqual(res, undefined);
		var res = alasql('= NULL==NULL');
		assert.deepEqual(res, undefined);
		var res = alasql('= 0==NULL');
		assert.deepEqual(res, undefined);
		done();
	});

	it('4. TEST == deepEqual', function(done) {
		var res = alasql('= {a:1}=={a:1}');
		assert.deepEqual(res, true);
		var res = alasql('= {a:1}=={a:2}');
		assert.deepEqual(res, false);
		done();
	});

	it('3. TEST IS', function(done) {
		var res = alasql('= 1 IS NULL');
		assert.deepEqual(res, false);
		var res = alasql('= NULL IS NULL');
		assert.deepEqual(res, true);
		done();
	});

	it('99. DROP DATABASE', function(done) {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test352');
		done();
	});
});
