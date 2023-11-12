if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 1829 - WHERE (NOT) IN Regression when using refs', function () {
	beforeEach(function () {
		alasql(`CREATE TABLE test1829 (
			id varchar(50) NOT NULL,
			text varchar(10) NOT NULL,
			PRIMARY KEY (id)
		  )`);
	});

	afterEach(function () {
		alasql('DROP TABLE test1829');
	});

	it('1. Where IN with refs', function (done) {
		const rowId1 = 'id#1';
		const rowId2 = 'id#2';

		alasql('insert into test1829(id, text) values (?, ?)', [rowId1, 'first text']);
		alasql('insert into test1829(id, text) values (?, ?)', [rowId2, 'second text']);

		const selectedByIdRows = alasql(
			`select entity.id, entity.text from test1829 as entity where entity.id IN (?,?)`,
			[rowId1, rowId2]
		);
		assert.equal(selectedByIdRows.length, 2);
		assert.equal(selectedByIdRows[0].id, rowId1);
		assert.equal(selectedByIdRows[1].id, rowId2);

		done();
	});

	it('2. Where NOT IN with refs', function (done) {
		const rowId1 = 'id#1';
		const rowId2 = 'id#2';

		alasql('insert into test1829(id, text) values (?, ?)', [rowId1, 'first text']);
		alasql('insert into test1829(id, text) values (?, ?)', [rowId2, 'second text']);

		const selectedByIdRows = alasql(
			`select entity.id, entity.text from test1829 as entity where entity.id NOT IN (?)`,
			[rowId1]
		);
		assert.equal(selectedByIdRows.length, 1);
		assert.equal(selectedByIdRows[0].id, rowId2);
		done();
	});
});
