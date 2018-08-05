if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

//

//http://stackoverflow.com/questions/18811265/sql-creating-temporary-variables
//

describe('Test 337 SEARCH 8 queens', function() {
	it.skip('1. CREATE DATABASE', function(done) {
		alasql('CREATE DATABASE test337;USE test337');
		done();
	});

	it.skip('2. SEARCH RANGE', function(done) {
		var res = alasql(function() {
			/*
      SEARCH FROM RANGE(1,8)
    */
		});

		//console.log(res);
		assert.deepEqual(res, [1, 2, 3, 4, 5, 6, 7, 8]);
		done();
	});

	it.skip('3. SEARCH ^ ', function(done) {
		var res = alasql(function() {
			/*
      SEARCH / FROM RANGE(1,8)
    */
		});

		//console.log(res);
		assert.deepEqual(res, [1, 2, 3, 4, 5, 6, 7, 8]);
		done();
	});

	it.skip('4. SEARCH / ', function(done) {
		var res = alasql(function() {
			/*
      SEARCH / FROM RANGE(1,8)
    */
		});

		//console.log(res);
		assert.deepEqual(res, [1, 2, 3, 4, 5, 6, 7, 8]);
		done();
	});

	it.skip('5. SEARCH WHERE ', function(done) {
		var res = alasql(function() {
			/*
      SEARCH / WHERE(_ <= 2) ^ / WHERE(_ >= 7) FROM RANGE(1,8)
    */
		});
		assert.deepEqual(res, [7, 8, 7, 8]);
		done();
	});

	it.skip('6. SEARCH AS and RETURN ', function(done) {
		var res = alasql(function() {
			/*
      SEARCH / WHERE(_ <= 2) AS @a ^ / WHERE(_ >= 7) AS @b RETURNS(@a AS a,@b AS b) FROM RANGE(1,8)
    */
		});
		assert.deepEqual(res, [{a: 1, b: 7}, {a: 1, b: 8}, {a: 2, b: 7}, {a: 2, b: 8}]);
		done();
	});

	it.skip('7. SEARCH ROW', function(done) {
		var res = alasql(function() {
			/*
      SEARCH / WHERE(_ <= 2) AS @a ^ / WHERE(_ >= 7) AS @b ROW(@a,@b) FROM RANGE(1,8)
    */
		});
		assert.deepEqual(res, [[1, 7], [1, 8], [2, 7], [2, 8]]);
		done();
	});

	it.skip('8. SEARCH TO', function(done) {
		alasql.vars.b = [];
		var res = alasql(function() {
			/*
      SEARCH / ex(1) TO @b ex(2) TO @b @b FROM RANGE(1,8)
    */
		});
		//    console.log(res);
		assert.deepEqual(res, [[1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2]]);
		done();
	});

	it.skip('9. SEARCH SET variable', function(done) {
		alasql.vars.b = [];
		var res = alasql(function() {
			/*
      SEARCH / set(@a=9) @a FROM RANGE(1,8)
    */
		});
		//    console.log(res);
		assert.deepEqual(res, [9, 9, 9, 9, 9, 9, 9, 9]);
		done();
	});

	it.skip('10. SEARCH REPEAT', function(done) {
		alasql.vars.b = [];
		var res = alasql(function() {
			/*
      SEARCH repeat(/,0,0) FROM @[@[1,2],3]
    */
		});
		//    console.log(res);
		assert.deepEqual(res, [[[1, 2], 3]]);
		done();
	});

	it.skip('11. SEARCH REPEAT', function(done) {
		alasql.vars.b = [];
		var res = alasql(function() {
			/*
      SEARCH repeat(/,1,1) FROM @[@[1,2],3]
    */
		});
		//    console.log(res);
		assert.deepEqual(res, [[1, 2], 3]);
		done();
	});

	it.skip('12. SEARCH REPEAT', function(done) {
		alasql.vars.b = [];
		var res = alasql(function() {
			/*
      SEARCH repeat(/,2,2) FROM @[@[1,2],3]
    */
		});
		//    console.log(res);
		assert.deepEqual(res, [1, 2]);
		done();
	});

	it.skip('13. SEARCH REPEAT', function(done) {
		alasql.vars.b = [];
		var res = alasql(function() {
			/*
      SEARCH repeat(/,3,3) FROM @[@[1,2],3]
    */
		});
		//    console.log(res);
		assert.deepEqual(res, []);
		done();
	});

	it.skip('14. SEARCH REPEAT', function(done) {
		alasql.vars.b = [];
		var res = alasql(function() {
			/*
      SEARCH repeat(/,0,3) FROM @[@[1,2],3]
    */
		});
		//    console.log(res);
		assert.deepEqual(res, [[[1, 2], 3], [1, 2], 3, 1, 2]);
		done();
	});

	it.skip('15. SEARCH REPEAT with index', function(done) {
		alasql.vars.b = [];
		var res = alasql(function() {
			/*
      SEARCH repeat(/,0,3,@i) @i FROM @[@[1,2],3]
    */
		});
		//    console.log(res);
		assert.deepEqual(res, [0, 1, 1, 2, 2]);
		done();
	});

	it.skip('16. SEARCH REPEAT with index', function(done) {
		alasql.vars.b = [];
		alasql.vars.a = [1, 2];
		var res = alasql(function() {
			/*
      SEARCH / ex(_ IN @a) FROM @[1,2,3]
    */
		});
		//    console.log(res);
		assert.deepEqual(res, [true, true, false]);
		done();
	});

	it.skip('19. SEARCH 8 queens', function(done) {
		alasql.srch.LOG = function(val, args, stope, params) {
			var exprs = args[0].toJS('x', '');
			var exprfn = new Function('x,alasql,params', 'return ' + exprs);
			console.log('log=', exprfn(val, alasql, params));
			return {status: 1, values: [exprfn(val, alasql, params)]};
		};
		alasql('set @h = @[];');

		var res = alasql(
			'SEARCH / * a to @h ex(1) to @h ex(2) to @h @h FROM {a:10,b:{a:20},c:{b:{a:30}}}'
		);
		console.log('res1=', res);

		var res = alasql(
			'SEARCH / a to @h REPEAT(/ ex(@i) to @h @h,2,2,@i) @h FROM {a:10,b:{a:20},c:{b:{a:30}}}'
		);
		console.log('res2=', res);

		var res = alasql(
			'SEARCH @[] as @h @[] as @d @[] as @g \
      repeat(^ / as @f to @h,2,2) \
     @h FROM @[1,2,3,4]'
		);
		console.log('res2=', res);

		// var res = alasql(function(){
		//   search / repeat(@i to @h @h as @e,2,2,@i) @e from @[1,2]

		//   });
		// console.log(res);
		//    assert.deepEqual(res,1);
		done();
	});

	if (false) {
		it.skip('17. SEARCH REPEAT with index', function(done) {
			alasql.vars.b = [];
			var res = alasql(function() {
				/*
      SEARCH repeat(/,1,2,@i) FROM @[@[1,2],3]
    */
			});
			console.log(res);

			var res = alasql(function() {
				/*
      SEARCH repeat(/ @i,1,2,@i) FROM @[@[1,2],3]
    */
			});
			console.log(res);
			assert.deepEqual(res, [1, 1, 2, 2]);
			done();
		});

		it.skip('90. SEARCH 8 queens', function(done) {
			var res = alasql(function() {
				/*
    
    search 
      set(@h=@[])
      repeat(
        @i to @h
        @h
        ,
        1,4,@i)
    from range(1,4)

    */
			});
			console.log(res);
			//    assert.deepEqual(res,1);
			done();
		});

		it.skip('99. DROP DATABASE', function(done) {
			alasql('DROP DATABASE test337');
			done();
		});
	}
});
