if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('375. Problem with UPDATE (https://github.com/agershun/alasql/issues/479)', function () {
	it('1. ', function (done) {
		alasql(
			'CREATE TABLE RpdAssignments (' +
				'Id INT PRIMARY KEY AUTOINCREMENT NOT NULL,' +
				'Name TEXT NOT NULL,' +
				'RpdId TEXT NOT NULL,' +
				'VcmtsService TEXT NOT NULL,' +
				'Status TEXT NOT NULL' +
				')'
		);

		alasql(
			"INSERT INTO RpdAssignments (Name,RpdId, VcmtsService,Status) \
            VALUES ('id1-cat1','id1','cat1','')"
		);

		alasql('UPDATE RpdAssignments SET Name="id2" WHERE Id=1');

		var res = alasql('SELECT * FROM RpdAssignments');
		assert.deepEqual(res, [
			{
				Id: 1,
				Name: 'id2',
				RpdId: 'id1',
				Status: '',
				VcmtsService: 'cat1',
			},
		]);
		done();
	});
});
