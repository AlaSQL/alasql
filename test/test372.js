if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 372', function() {
	it('should have a new result after insert', function() {
		var db = new alasql.Database();
		db.exec('create table someNames (name string)');
		db.exec('create table otherNames (name string)');

		assert.equal(
			db.exec('select * from otherNames join someNames on someNames.name = otherNames.name')
				.length,
			0
		);

		db.exec('insert into someNames values ("Lars"), ("Erik")');
		db.exec('insert into otherNames values ("Lars"), ("Erik")');

		assert.equal(
			db.exec('select * from otherNames join someNames on someNames.name = otherNames.name')
				.length,
			2
		);
	});
});
