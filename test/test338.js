if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

//

//https://technet.microsoft.com/en-us/library/ms191523(v=sql.105).aspx
//

describe('Test 338 EXTRACT', function() {
	it.skip('1. CREATE DATABASE', function(done) {
		alasql('CREATE DATABASE test338;USE test338');
		done();
	});

	it.skip('2. SAMPLE', function(done) {
		var res = alasql(function() {
			/*

create table a (col int);
insert into a (col) values (1), (2), (3), (4), (5), (96), (97), (98), (99), (100);

create table b (col int);
insert into b (col) values (1), (98), (2), (99), (3), (100);

select * from a;
select * from b;

*/
		});
		//  console.log(res);

		done();
	});

	it.skip('2. EXCEPT', function(done) {
		var res = alasql(function() {
			/*

-- This gives error
select col from a
except
select top 3 b.col from b order by b.col desc;

    */
		});

		console.log(res);
		//    assert.deepEqual(res,1);
		done();
	});

	it.skip('3. EXCEPT', function(done) {
		var res = alasql(function() {
			/*
    
;with cte_for_b
as
(select top 3 b.col from b order by b.col desc)
select col from a
except
select col from cte_for_b;

    */
		});

		console.log(res);
		//    assert.deepEqual(res,1);
		done();
	});

	it.skip('3. DROP TABLES', function(done) {
		var res = alasql(function() {
			/*

drop table a;
drop table b;


    */
		});
		//  console.log(res);
		assert.deepEqual(res, [1, 1]);
		done();
	});

	it.skip('99. DROP DATABASE', function(done) {
		alasql('DROP DATABASE test338');
		done();
	});
});
