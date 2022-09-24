if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

// Data for test
var data = [{a: 1}, {a: 2}];

describe('Test 353 Compiled Promised Statements', function() {
	it('1. CREATE DATABASE', function(done) {
		alasql('CREATE DATABASE test353;USE test353');
		done();
	});
	it('2. Compiled Sync', function(done) {
		var st = alasql.compile('SELECT * FROM ?');
		var res = st([data]);
		assert.deepEqual(res, data);
		done();
	});

	it('3. Compiled Sync with Error', function(done) {
		alasql.fn.iamwrong = function() {
			throw new Error('I am wrong!');
		};
		var st = alasql.compile('SELECT iamwrong() FROM ?');
		assert.throws(function() {
			var res = st([data]);
		}, Error);
		done();
	});
	/*
  it('4. Compiled Sync with Error Log',function(done){
    var st = alasql.compile('SELECT iamwrong() FROM ?');
    alasql.options.errorlog = true;
    var res = st([data]);
    assert(alasql.error instanceof Error);
    alasql.errorlog = false;
    done();
  });
*/
	it('5. Compiles Async', function(done) {
		alasql.fn.iamwrong = function() {
			throw new Error('I am wrong!');
		};
		var st = alasql.compile('SELECT * FROM ?');
		st([data], function(res, err) {
			assert.deepEqual(res, data);
			done();
		});
	});

	/*
  it('6. Compiles Async with Error',function(done){
    var st = alasql.compile('SELECT iamwrong() FROM ?');
    alasql.options.errorlog = true;
    st([data],function(res,err){
      assert(err instanceof Error);
      alasql.options.errorlog = false;
      done();
    });
  });
*/

	it('7. Compile Promise', function(done) {
		var st = alasql.compile('SELECT * FROM ?');
		st.promise([data]).then(function(res) {
			assert.deepEqual(res, data);
			done();
		});
	});

	it('5. Compile With Error', function(done) {
		var st = alasql.compile('SELECT iamwrong() FROM ?');
		st
			.promise([data])
			.then(function(res) {
				// Should not be here
			})
			.catch(function(err) {
				assert(err instanceof Error);
				done();
			});
	});

	it('99. DROP DATABASE', function(done) {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test353');
		done();
	});
});
