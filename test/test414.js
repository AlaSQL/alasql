if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

/*
  Test for issue #379
*/

var test = 414;

describe('Test ' + test + ' SELECT FROM VIEW', function () {
	before(function () {
		alasql('CREATE DATABASE test' + test + ';USE test' + test);
	});

	after(function () {
		alasql('DROP DATABASE test' + test);
	});

	it('3. Test', function (done) {
		var res = alasql(function () {
			/*
		create table data( id INTEGER PRIMARY KEY);
		insert into data values (1);
		insert into data values (2);

		select a.id , ifNULL((select MIN(b.id) from data as b where a.id < b.id), 0) b_id from data as a;

    */
		});

		done();
	});

	it('4. Test', function (done) {
		var res = alasql(function () {
			/*
		create view view1 as select a.id , ifNULL((select MIN(b.id) from data as b where a.id < b.id), 0) b_id from data as a;
    */
		});

		done();
	});

	it.skip('5. Test', function (done) {
		var res = alasql(function () {
			/*
		select a.id from view1;
    */
		});

		done();
	});
});
