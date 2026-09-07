if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '684';

describe(`Test ${testId} - update subquery parameter binding`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	it('should bind parameters inside subquery in UPDATE WHERE clause', function () {
		let res = [];
		res.push(alasql('CREATE TABLE one ([Field1] STRING, [Field2] INT, [Field3] STRING)'));
		res.push(alasql("INSERT INTO one VALUES ('Old',10,'aaa'),('Old',10,'bbb'),('Old',20,'ccc')"));
		res.push(
			alasql(
				"UPDATE one SET [Field1] = 'New' WHERE [Field2] = (SELECT [Field2] FROM one WHERE [Field3] = ?)",
				['aaa']
			)
		);
		res.push(alasql('SELECT [Field1],[Field2],[Field3] FROM one ORDER BY [Field2],[Field3]'));

		assert.deepStrictEqual(res, [
			1,
			3,
			2,
			[
				{Field1: 'New', Field2: 10, Field3: 'aaa'},
				{Field1: 'New', Field2: 10, Field3: 'bbb'},
				{Field1: 'Old', Field2: 20, Field3: 'ccc'},
			],
		]);
	});
});
