// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('375. Problem with UPDATE (https://github.com/alasql/alasql/issues/479)', () => {
	test('1. ', done => {
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
		expect(res).toEqual([
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
