if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 62 - ALTER TABLE', function () {
	it('Create new table', function (done) {
		alasql('create database test62');
		alasql('use test62');
		alasql('CREATE TABLE test (a INT AUTO_INCREMENT, b INT)');
		alasql('insert into test (b) values (10),(20),(30)');
		done();
	});

	it('ADD COLUMN', function (done) {
		alasql('alter table test add column name string');
		alasql('insert into test (b,name) values (40,"Kosovo"),(50,"Belgrad"),(60,"Prague")');
		var res = alasql('select * from test');
		done();
	});

	it('MODIFY COLUMN', function (done) {
		alasql('alter table test modify column name int');
		var res = alasql('select * from test');
		done();
	});

	it('DROP COLUMN', function (done) {
		alasql('alter table test drop column b');
		var res = alasql('select * from test');
		alasql('drop database test62');
		done();
	});
});
