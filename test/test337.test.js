// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

//

//http://stackoverflow.com/questions/18811265/sql-creating-temporary-variables
//

describe('Test 337 SEARCH 8 queens', () => {
	test.skip('1. CREATE DATABASE', done => {
		alasql('CREATE DATABASE test337;USE test337');
		done();
	});

	test.skip('2. SEARCH RANGE', done => {
		var res = alasql(() => {
			/*
      SEARCH FROM RANGE(1,8)
    */
		});

		//console.log(res);
		expect(res).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
		done();
	});

	test.skip('3. SEARCH ^ ', done => {
		var res = alasql(() => {
			/*
      SEARCH / FROM RANGE(1,8)
    */
		});

		//console.log(res);
		expect(res).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
		done();
	});

	test.skip('4. SEARCH / ', done => {
		var res = alasql(() => {
			/*
      SEARCH / FROM RANGE(1,8)
    */
		});

		//console.log(res);
		expect(res).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
		done();
	});

	test.skip('5. SEARCH WHERE ', done => {
		var res = alasql(() => {
			/*
      SEARCH / WHERE(_ <= 2) ^ / WHERE(_ >= 7) FROM RANGE(1,8)
    */
		});
		expect(res).toEqual([7, 8, 7, 8]);
		done();
	});

	test.skip('6. SEARCH AS and RETURN ', done => {
		var res = alasql(() => {
			/*
      SEARCH / WHERE(_ <= 2) AS @a ^ / WHERE(_ >= 7) AS @b RETURNS(@a AS a,@b AS b) FROM RANGE(1,8)
    */
		});
		expect(res).toEqual([
			{a: 1, b: 7},
			{a: 1, b: 8},
			{a: 2, b: 7},
			{a: 2, b: 8},
		]);
		done();
	});

	test.skip('7. SEARCH ROW', done => {
		var res = alasql(() => {
			/*
      SEARCH / WHERE(_ <= 2) AS @a ^ / WHERE(_ >= 7) AS @b ROW(@a,@b) FROM RANGE(1,8)
    */
		});
		expect(res).toEqual([
			[1, 7],
			[1, 8],
			[2, 7],
			[2, 8],
		]);
		done();
	});

	test.skip('8. SEARCH TO', done => {
		alasql.vars.b = [];
		var res = alasql(() => {
			/*
      SEARCH / ex(1) TO @b ex(2) TO @b @b FROM RANGE(1,8)
    */
		});
		//    console.log(res);
		expect(res).toEqual([
			[1, 2],
			[1, 2],
			[1, 2],
			[1, 2],
			[1, 2],
			[1, 2],
			[1, 2],
			[1, 2],
		]);
		done();
	});

	test.skip('9. SEARCH SET variable', done => {
		alasql.vars.b = [];
		var res = alasql(() => {
			/*
      SEARCH / set(@a=9) @a FROM RANGE(1,8)
    */
		});
		//    console.log(res);
		expect(res).toEqual([9, 9, 9, 9, 9, 9, 9, 9]);
		done();
	});

	test.skip('10. SEARCH REPEAT', done => {
		alasql.vars.b = [];
		var res = alasql(`
      SEARCH repeat(/,0,0) FROM @[@[1,2],3]
	  `);
		//    console.log(res);
		expect(res).toEqual([[[1, 2], 3]]);
		done();
	});

	test.skip('11. SEARCH REPEAT', done => {
		alasql.vars.b = [];
		var res = alasql(() => {
			/*
      SEARCH repeat(/,1,1) FROM @[@[1,2],3]
    */
		});
		//    console.log(res);
		expect(res).toEqual([[1, 2], 3]);
		done();
	});

	test.skip('12. SEARCH REPEAT', done => {
		alasql.vars.b = [];
		var res = alasql(`SEARCH repeat(/,2,2) FROM @[@[1,2],3]`);
		//    console.log(res);
		expect(res).toEqual([1, 2]);
		done();
	});

	test.skip('13. SEARCH REPEAT', done => {
		alasql.vars.b = [];
		var res = alasql(`
      SEARCH repeat(/,3,3) FROM @[@[1,2],3]
	  `);
		//    console.log(res);
		expect(res).toEqual([]);
		done();
	});

	test.skip('14. SEARCH REPEAT', done => {
		alasql.vars.b = [];
		var res = alasql(() => {
			/*
      SEARCH repeat(/,0,3) FROM @[@[1,2],3]
    */
		});
		//    console.log(res);
		expect(res).toEqual([[[1, 2], 3], [1, 2], 3, 1, 2]);
		done();
	});

	test.skip('15. SEARCH REPEAT with index', done => {
		alasql.vars.b = [];
		var res = alasql(() => {
			/*
      SEARCH repeat(/,0,3,@i) @i FROM @[@[1,2],3]
    */
		});
		//    console.log(res);
		expect(res).toEqual([0, 1, 1, 2, 2]);
		done();
	});

	test.skip('16. SEARCH REPEAT with index', done => {
		alasql.vars.b = [];
		alasql.vars.a = [1, 2];
		var res = alasql(() => {
			/*
      SEARCH / ex(_ IN @a) FROM @[1,2,3]
    */
		});
		//    console.log(res);
		expect(res).toEqual([true, true, false]);
		done();
	});

	test.skip('19. SEARCH 8 queens', done => {
		alasql.srch.LOG = function (val, args, stope, params) {
			var exprs = args[0].toJS('x', '');
			var exprfn = new Function('x,alasql,params', 'return ' + exprs);
			console.log('log=', exprfn(val, alasql, params));
			return {status: 1, values: [exprfn(val, alasql, params)]};
		};
		alasql('set @h = @[];');

		var res = alasql(
			'SEARCH / * a to @h ex(1) to @h ex(2) to @h @h FROM {a:10,b:{a:20},c:{b:{a:30}}'
		);
		console.log('res1=', res);

		var res = alasql(
			'SEARCH / a to @h REPEAT(/ ex(@i) to @h @h,2,2,@i) @h FROM {a:10,b:{a:20},c:{b:{a:30}}'
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
		//    expect(res).toEqual(1);
		done();
	});

	if (false) {
		test.skip('17. SEARCH REPEAT with index', done => {
			alasql.vars.b = [];
			var res = alasql(() => {
				/*
      SEARCH repeat(/,1,2,@i) FROM @[@[1,2],3]
    */
			});
			console.log(res);

			var res = alasql(() => {
				/*
      SEARCH repeat(/ @i,1,2,@i) FROM @[@[1,2],3]
    */
			});
			console.log(res);
			expect(res).toEqual([1, 1, 2, 2]);
			done();
		});

		test.skip('90. SEARCH 8 queens', done => {
			var res = alasql(() => {
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
			//    expect(res).toEqual(1);
			done();
		});

		test.skip('99. DROP DATABASE', done => {
			alasql('DROP DATABASE test337');
			done();
		});
	}
});
